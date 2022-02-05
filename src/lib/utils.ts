const formatDate = (date: string) => (new Date(date)).toDateString()

export const formatPostSubtitle = (frontmatter: any) => {
  let s = ''
  if (frontmatter.author) {
    s += `${frontmatter.author}, `
  }
  s += `${formatDate(frontmatter.date)}`
  return s
}
