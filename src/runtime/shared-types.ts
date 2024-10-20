type RGB = `rgb(${number}, ${number}, ${number})`

type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`

type HSL = `hsl(${number}, ${number}%, ${number}%)`

type HSLA = `hsla(${number}, ${number}%, ${number}%, ${number})`

type HEX = `#${string}`

type ColorValue = RGB | RGBA | HSL | HEX | HSLA

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
  50: string
  100: string
  200: string
  300: string
  400: string
  500: string
  600: string
  700: string
  800: string
  900: string
  950: string
}
