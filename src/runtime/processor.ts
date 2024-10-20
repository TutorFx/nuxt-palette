import { update, mapKeys, get } from 'lodash'
import { flatten } from 'flat'
import { isString, isObject, isArray } from '@intlify/shared'
import type { ConsolaInstance } from 'consola'
import type { ExplicitTheme, SeparedPath, TailwindColor, Themes } from '../types'

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
export function palettePathProcessor(themes: Themes) {
  const flat = flatten(themes)

  if (!isObject(flat)) return null

  return [...new Set(
    Object.keys(
      mapKeys(flat, (value, key) => {
        if (!isString(key)) return null

        if (key.endsWith('.b') || key.endsWith('.f')) {
          const k = key.split('.')
          k.pop()
          return k.join('.')
        }

        if (isString(value)) {
          return key
        }

        return null
      }),
    )
      .filter(key => key != null),
  )]
}

export function validatePaths(logger: ConsolaInstance, paths: string[] | null) {
  if (!Array.isArray(paths)) return null

  const separedPath = getSeparatedPaths(paths)

  const themeNameSet = [...new Set(separedPath.map(p => p.theme))]
  const generalPathsSet = [...new Set(separedPath.map(p => p.relativePath))]

  generalPathsSet.map((path) => {
    themeNameSet.map((theme) => {
      const fullPath = `${theme}.${path}`
      const isMissing = !paths.includes(fullPath)

      if (isMissing) {
        logger.warn(`Missing color definition at: "${fullPath}".`)
        return false
      }
    })
  })
}

export const explicitThemeFormatter = (item: ExplicitTheme) => {
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

export function generateRootStyles<T extends object>(themes: T, paths: string[]) {
  const separedPath = getSeparatedPaths(paths)

  const themeNameSet = [...new Set(separedPath.map(p => p.theme))]

  return themeNameSet.map((theme) => {
    const data = separedPath
      .filter(s => s.theme == theme)
      .map((s) => {
        const color = get(themes, theme + '.' + s.relativePath)
        const displayPath = toKebabCase(s.relativePath)

        if (!color) return null

        if (isArray(color))
          return `--${displayPath}: ${color.join(' ')}`

        if (isObject(color)) {
          return Object.keys(color)
            .map((key) => {
              const c = color[key]
              if (isArray(c))
                return `--${displayPath}-${key}: ${c.join(' ')}`
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
    .map(v => `:root[data-theme="${v.theme}"] {\n${v.data}\n}`)
    .join('\n')
}

export function paletteProcessor(themes: Themes, paths: string[] | null, formatter: (item: ExplicitTheme) => unknown = explicitThemeFormatter) {
  const staticThemes = structuredClone(themes)

  if (!Array.isArray(paths)) return null

  for (const i in paths) {
    update(staticThemes, paths[i], formatter)
  }

  return staticThemes
}

export function tailwindThemeGenerator(themes: Themes, paths: string[] | null) {
  if (!Array.isArray(paths)) return null

  const separedPath = getSeparatedPaths(paths)

  return [...new Set(separedPath)].reduce((acc: { [key: string]: TailwindColor }, curr) =>
    (acc[toKebabCase(curr.relativePath)] = {
      DEFAULT: `hsl(var(--${toKebabCase(curr.relativePath)}-b))`,
      foreground: `hsl(var(--${toKebabCase(curr.relativePath)}-f))`,
      50: '',
      100: '',
      200: '',
      300: '',
      400: '',
      500: `hsl(var(--${toKebabCase(curr.relativePath)}-b))`,
      600: '',
      700: '',
      800: '',
      950: '',
      900: '',
    }, acc),
  {})
}
