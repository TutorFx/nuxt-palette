import type { Themes } from './runtime/shared-types'

export * from './runtime/shared-types'

// Module options TypeScript interface definition
export interface ModuleOptions {
  themes?: Themes
  defaultTheme?: string
  shades?: number[]
}
