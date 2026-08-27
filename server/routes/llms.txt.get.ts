/**
 * The Markdown twin, appended to the notes of an `llms.txt` entry. The link itself keeps
 * pointing at the canonical page — that is the URL worth citing — while the `.md` sits
 * next to it for an agent that would rather read the source than the rendered document.
 */
function markdownSuffix(path: string): string {
  const url = llmsMarkdownUrl(path)
  return url ? ` Markdown: ${url}` : ''
}

export default defineEventHandler(async (event) => {
  const [projects, articles] = await Promise.all([
    getLlmsProjects(event),
    getLlmsArticles(event)
  ])

  const lines: string[] = [
    `# ${LLMS_SITE_NAME}`,
    '',
    `> ${LLMS_SUMMARY}`,
    ''
  ]

  for (const note of LLMS_NOTES) lines.push(`- ${note}`)

  for (const section of getLlmsStaticSections()) {
    lines.push('', `## ${section.title}`, '')
    for (const link of section.links) {
      lines.push(`- [${link.title}](${llmsUrl(link.path)}): ${link.description}${markdownSuffix(link.path)}`)
    }
  }

  if (projects.length) {
    lines.push('', '## Case studies', '')
    for (const project of projects) {
      const path = `/realisations/${project.slug}`
      const description = toSummary(project.data.description) || toSummary(project.data.text)
      lines.push(`- [${project.title}](${llmsUrl(path)})${description ? `: ${description}` : ''}${markdownSuffix(path)}`)
    }
  }

  if (articles.length) {
    lines.push('', '## Blog articles', '')
    for (const article of articles) {
      const path = `/blog/${article.slug}`
      const description = toSummary(article.data.excerpt) || toSummary(article.data.body)
      lines.push(`- [${article.title}](${llmsUrl(path)})${description ? `: ${description}` : ''}${markdownSuffix(path)}`)
    }
  }

  lines.push(
    '',
    '## Optional',
    '',
    `- [Full text of every page](${llmsUrl('/llms-full.txt')}): the same URLs with their content inlined.`,
    `- [XML sitemap](${llmsUrl('/sitemap.xml')}): machine-readable list of the indexable URLs.`,
    ''
  )

  return sendLlmsText(event, lines.join('\n'))
})
