type RGB = `rgb(${number}, ${number}, ${number})`

type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`

type HSL = `hsl(${number}, ${number}%, ${number}%)`

type HSLA = `hsla(${number}, ${number}%, ${number}%, ${number})`

type HEX = `#${string}`

type ColorValue = RGB | RGBA | HSL | HEX | HSLA

export interface ColorVariant {
  bg: ColorValue
  fg: ColorValue
}

// Tipo recursivo para representar a estrutura aninhada
export type NestedColorVariant<T> = {
  [key: string]: T | NestedColorVariant<T>
}

// Tipo para o objeto exemplo, usando o tipo genérico
export type Theme = NestedColorVariant<ColorVariant | ColorValue>

export type Themes = {
  [key: string]: Theme
}
