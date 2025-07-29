export const customize = (
  content: string,
  name: string,
  prefix: string,
  provider: string
) => {
  return content.replace(/stroke-width="[^"]*"/g, `stroke-width="3"`) // Change stroke width to 2
}
