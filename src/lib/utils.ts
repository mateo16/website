export const formatDate = (date: string) => (new Date(date)).toDateString()

export const navigate = (url: URL, external: boolean = false) => {
  window.open(url.toString())
}

export function wait(milliseconds: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

export function pickRandomElement(array: []) {
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
