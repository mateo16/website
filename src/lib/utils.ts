export const formatDate = (date: string) => (new Date(date)).toDateString()

export const navigate = (url: string, external: boolean = false) => {
  window.open(url.toString(), external ? '_blank' : undefined)
}

export function wait(milliseconds: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

export const randomNumber = (min: number, max: number) => Math.random() * (max - min) + min

export const randomInt = (min: number, max: number) => Math.trunc(randomNumber(min, max))

export function randomElement(array: []) {
  if (!Array.isArray(array)) {
    return null;
  }
  return array[Math.trunc(Math.random() * array.length)];
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function getCssVariable(name: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(name);
}

export function setCssVariable(name: string, value: string) {
  document.documentElement.style.setProperty(name, value);
}

export function isValidEmailAddress(email: string) {
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return regex.test(email)
}

export function rotateArray(arr: (any)[], reverse: boolean = false): void {
  if (arr.length > 0) {
    if (reverse) {
      arr.unshift(arr.pop())
    } else {
      arr.push(arr.shift())
    }
  }
}

export const rotateForward = (v: number, max: number) => v === max - 1 ? 0 : v + 1

export function preloadImage(url: string) {
    const img = new Image()
    img.src = url
}

export const scrollToTop = () => { window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
