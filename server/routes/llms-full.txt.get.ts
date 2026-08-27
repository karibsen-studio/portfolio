export default defineEventHandler(async (event) => {
  const [projects, articles] = await Promise.all([
    getLlmsProjects(event),
    getLlmsArticles(event)
  ])

  const lines: string[] = [
    `# ${LLMS_SITE_NAME}`,
    '',
    `> ${LLMS_SUMMARY}`,
    '',
    ...LLMS_NOTES.map(note => `- ${note}`),
    '',
    `Generated on ${new Date().toISOString().slice(0, 10)}. Every URL of the site is listed below; pages managed as content also carry their full text.`
  ]

  for (const section of getLlmsStaticSections()) {
    lines.push('', `## ${section.title}`)
    for (const link of section.links) {
      lines.push('', `### ${link.title}`, '', `URL: ${llmsUrl(link.path)}`)
      const markdown = llmsMarkdownUrl(link.path)
      if (markdown) lines.push(`Markdown: ${markdown}`)
      lines.push('', link.description)
    }
  }

  if (projects.length) {
    lines.push('', '## Case studies')
    for (const project of projects) {
      const tags = Array.isArray(project.data.tags) ? project.data.tags.join(', ') : ''
      const locales = Array.isArray(project.data.locales) ? project.data.locales.join(', ') : ''
      const published = formatLlmsDate(project.data.publishedOn ?? project.publishedAt)
      const body = htmlToMarkdown(project.data.text)

      const path = `/realisations/${project.slug}`
      const markdown = llmsMarkdownUrl(path)

      lines.push('', `### ${project.title}`, '', `URL: ${llmsUrl(path)}`)
      if (markdown) lines.push(`Markdown: ${markdown}`)
      if (tags) lines.push(`Tags: ${tags}`)
      if (locales) lines.push(`Locations: ${locales}`)
      if (published) lines.push(`Published: ${published}`)
      if (project.data.description) lines.push('', String(project.data.description))
      if (body) lines.push('', body)
    }
  }

  if (articles.length) {
    lines.push('', '## Blog articles')
    for (const article of articles) {
      const tags = Array.isArray(article.data.tags) ? article.data.tags.join(', ') : ''
      const published = formatLlmsDate(article.data.publishedOn ?? article.publishedAt)
      const body = htmlToMarkdown(article.data.body)

      const path = `/blog/${article.slug}`
      const markdown = llmsMarkdownUrl(path)

      lines.push('', `### ${article.title}`, '', `URL: ${llmsUrl(path)}`)
      if (markdown) lines.push(`Markdown: ${markdown}`)
      if (published) lines.push(`Published: ${published}`)
      if (tags) lines.push(`Tags: ${tags}`)
      if (article.data.readingTime) lines.push(`Reading time: ${article.data.readingTime} min`)
      if (article.data.excerpt) lines.push('', String(article.data.excerpt))
      if (body) lines.push('', body)
    }
  }

  lines.push('')

  return sendLlmsText(event, lines.join('\n'))
})
