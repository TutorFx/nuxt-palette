import get from 'lodash/get.js'
import update from 'lodash/update.js'
import { isString, isObject, isArray } from '@intlify/shared'
import type { ConsolaInstance } from 'consola'
import type { ExplicitTheme, SeparedPath, TailwindColor, Themes } from '../types'

import { PathSet } from './path-classes'
import { convertColor } from './colors'
import { toKebabCase } from './utils'

export function getSeparatedPaths(paths: string[]): SeparedPath[] {
  return paths.map((path) => {
    const [theme, relativePath] = path
      .replace('.', '@')
      .split('@')

    return {
      theme,
      relativePath,
    }
  })
}

export function extractPalettePaths(flatThemes: unknown): PathSet | null {
  if (!isObject(flatThemes)) return null

  const palettePaths = Object.keys(flatThemes).reduce<string[]>((acc, key) => {
    if (!isString(key)) return acc

    if (key.endsWith('.b') || key.endsWith('.f')) {
      acc.push(key.slice(0, -2)) // Optimized: Directly slice instead of split/join
    }
    else if (isString(flatThemes[key])) {
      acc.push(key)
    }
    return acc
  }, [])

  return new PathSet([...new Set(palettePaths)])
}

export function validatePaths(logger: ConsolaInstance, p: PathSet | null) {
  if (p == null) return null

  p.generalPathsSet.map((path) => {
    p.themeNameSet.map((theme) => {
      const fullPath = `${theme}.${path}`
      const isMissing = !p.paths.includes(fullPath)

      if (isMissing) {
        logger.warn(`Missing color definition at: "${fullPath}".`)
        return false
      }
    })
  })
}

export const formatExplicitTheme = (item: ExplicitTheme) => {
  if (isObject(item))
    return Object.assign(item, {
      f: convertColor(item.f),
      b: convertColor(item.b),
    })

  if (isString(item)) {
    const b = convertColor(item)
    const f = [b[0], b[1], b[3] > 50 ? 0 : 100]
    return {
      b,
      f,
    }
  }
}

export function generateRootStyles<T extends object>(themes: T | null, p: PathSet | null, defaultTheme: string): string | null {
  if (p == null) return null

  const themeNameSet = [...new Set(p.separedPath.map(p => p.theme))]

  return themeNameSet.map((theme) => {
    const data = p.separedPath
      .filter(s => s.theme == theme)
      .map((s) => {
        const color = get(themes, theme + '.' + s.relativePath)
        const displayPath = toKebabCase(s.relativePath)

        if (!color) return null

        if (isArray(color))
          return `--${displayPath}: ${color.join(' ')};`

        if (isObject(color)) {
          return Object.keys(color)
            .map((key) => {
              const c = color[key]
              if (isArray(c))
                return `--${displayPath}-${key}: ${c.join(' ')};`
              if (isObject(c))
                return null
            })
            .filter(s => s != null)
            .join('\n')
        }
      })
      .filter(s => s != null)
      .join('\n')

    return {
      data,
      theme,
    }
  })
    .map(v => v.theme === defaultTheme
      ? `:root{\n${v.data}\n}`
      : `:root[data-theme="${v.theme}"] {\n${v.data}\n}`,
    )
    .join('\n')
}

export function processPalette(
  themes: Themes,
  p: PathSet | null,
  formatter: (item: ExplicitTheme) => unknown = formatExplicitTheme,
) {
  const staticThemes = structuredClone(themes)

  if (p == null) return null

  for (const path of p.paths) {
    update(staticThemes, path, formatter)
  }

  return staticThemes
}

export function generateTailwindTheme(themes: Themes, p: PathSet | null, shades: number[]) {
  if (p == null) return null

  return [...new Set(p.separedPath)].reduce((acc: { [key: string]: TailwindColor }, curr) =>
    (acc[toKebabCase(curr.relativePath)] = {
      DEFAULT: `hsl(var(--${toKebabCase(curr.relativePath)}-b))`,
      foreground: `hsl(var(--${toKebabCase(curr.relativePath)}-f))`,
      ...generateTailwindShades(`hsl(var(--${toKebabCase(curr.relativePath)}-b))`, shades),
    }, acc),
  {})
}

export function generateTailwindShades(color: string, shades: number[]) {
  const sumShades = shades
    .reduce(function (accumulator, value) {
      return accumulator + value
    }, 0)
  const median = sumShades / shades.length
  return Object.fromEntries(
    shades.map(key =>
      [key, `oklch(from ${color} calc(l + ${((key - median) * -0.0005).toFixed(3)}) c h / 1)`],
    ),
  )
}
