const formatDate = (date: string) => (new Date(date)).toDateString()

export const formatPostSubtitle = (frontmatter: any) => {
  let s = ''
  if (frontmatter.author) {
    s += `${frontmatter.author}, `
  }
  if (frontmatter.date) {
    s += `${formatDate(frontmatter.date)}`
  }
  return s
}
