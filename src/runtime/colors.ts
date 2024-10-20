import convert from 'color-convert'

const HEX_REGEX = /^#(?:[0-9A-F]{3}){1,2}$/i
const RGB_REGEX = /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*[\d.]+\s*)?\)/g
const HSLA_REGEX = /hsla?\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*(?:,\s*[\d.]+\s*)?\)/g
const HSL_REGEX = /hsl?\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*\)/g

export function convertColor(color: string): number[] {
  if (HEX_REGEX.test(color))
    return convert.hex.hsl(color)

  if (RGB_REGEX.test(color)) {
    const [red, green, blue] = JSON.parse(color.replace(RGB_REGEX, '[$1, $2, $3]'))
    return convert.rgb.hsl(red, green, blue)
  }

  if (HSL_REGEX.test(color))
    return JSON.parse(color.replace(HSL_REGEX, '[$1, $2, $3]'))

  if (HSLA_REGEX.test(color))
    return JSON.parse(color.replace(HSLA_REGEX, '[$1, $2, $3]'))

  throw new Error('Invalid color provided')
}
