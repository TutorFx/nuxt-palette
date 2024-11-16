import convert from 'color-convert'
import colorString from 'color-string'

export function convertColor(color: string): number[] {
  const parsed = colorString.get(color)

  if (!parsed) throw new Error('Failed to detect color format at ' + color)

  switch (parsed.model) {
    case 'rgb':
      return convert.rgb.hsl([parsed.value[0], parsed.value[1], parsed.value[2]])
    case 'hsl':
      return [parsed.value[0], parsed.value[1], parsed.value[2]]
    case 'hwb':
      return convert.hwb.hsl([parsed.value[0], parsed.value[1], parsed.value[2]])
  }
}
