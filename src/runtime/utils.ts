export function toKebabCase(str: string) {
  return (str
    && str
      .match(/[A-Z]{2,}(?=[A-Z][a-z]|\b)|[A-Z]?[a-z]+\d*|[A-Z]|\d+/g)
      ?.map(x => x.toLowerCase())
      .join('-')) ?? ''
}
export const isObject = (input: unknown): input is Record<string, unknown> => {
  return typeof input === 'object' && input !== null && !Array.isArray(input)
}
