type RGB = `rgb(${string})`

type RGBA = `rgba(${string})`

type HSL = `hsl(${string})`

type HSLA = `hsla(${string})`

type HEX = `#${string}`

type HWB = `hwb(${string})`

type ColorValue = RGB | RGBA | HSL | HEX | HSLA | HWB

export interface ColorVariant {
  b: ColorValue
  f: ColorValue
}

// Tipo recursivo para representar a estrutura aninhada
export type NestedColorVariant<T> = {
  [key: string]: T | NestedColorVariant<T>
}

// Tipo para o objeto exemplo, usando o tipo genérico
export type Theme = NestedColorVariant<ColorVariant | ColorValue>

export type ExplicitTheme = ColorVariant | ColorValue

export type Themes = {
  [key: string]: Theme
}

export interface TailwindColor {
  DEFAULT: string
  foreground: string
}

export interface SeparedPath {
  theme: string
  relativePath: string
}
