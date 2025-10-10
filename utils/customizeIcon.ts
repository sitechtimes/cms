export const customize = (content: string) =>
  content.replace(/stroke-width="[^"]*"/g, `stroke-width="3"`)
