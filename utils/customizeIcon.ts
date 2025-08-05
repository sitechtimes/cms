export const customize = (content: string) =>
  content.replace(/stroke-width="[^"]*"/g, `stroke-width="3"`) // Change stroke width to 2
