export function getElement(id: string) {
  const element = window.document.getElementById(id)
  if (!element) {
    throw new Error(`Element with id "${id}" not found`)
  }
  return element
}
