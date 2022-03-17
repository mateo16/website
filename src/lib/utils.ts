export const formatDate = (date: string) => (new Date(date)).toDateString()

export const navigate = (url: URL, external: boolean = false) => {
  window.open(url.toString())
}
