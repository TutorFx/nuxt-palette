import { update, mapKeys, get } from 'lodash'
import { flatten } from 'flat'
import { isString, isObject } from '@intlify/shared'
import type { ConsolaInstance } from 'consola'
import type { ExplicitTheme, TailwindColor, Themes } from '../types'

import { convertColor } from './colors'
import { toKebabCase } from './utils'

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

  const separedPath = paths.map((path) => {
    const [theme, relativePath] = path
      .replace('.', '@')
      .split('@')

    return {
      theme,
      relativePath,
    }
  })

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

export function generateRootStyles<T extends object>(themes: T | null, paths: string[] | null) {
  const separedPath = paths.map((path) => {
    const [theme, relativePath] = path
      .replace('.', '@')
      .split('@')

    return {
      theme,
      relativePath,
    }
  })
  return paths?.map(p => [`--${toKebabCase(p)}`, get(themes, p).join(' ')]) ?? null
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

  const separedPath = paths.map((path) => {
    return path
      .replace('.', '@')
      .split('@')[1]
  })

  return [...new Set(separedPath)].reduce((acc: { [key: string]: TailwindColor }, curr) =>
    (acc[toKebabCase(curr)] = {
      DEFAULT: `hsl(var(--${toKebabCase(curr)}-b))`,
      foreground: `hsl(var(--${toKebabCase(curr)}-f))`,
      50: '',
      100: '',
      200: '',
      300: '',
      400: '',
      500: '',
      600: '',
      700: '',
      800: '',
      950: '',
      900: '',
    }, acc),
  {})
}
