import { createHash, timingSafeEqual } from 'node:crypto'

function matches(provided: string, expected: string) {
  const a = createHash('sha256').update(provided).digest()
  const b = createHash('sha256').update(expected).digest()
  return timingSafeEqual(a, b)
}

export default defineEventHandler(async (event) => {
  const secret = process.env.EPONYME_CRON_SECRET

  if (!secret) {
    throw createError({
      statusCode: 503,
      statusMessage: 'EPONYME_CRON_SECRET is not configured'
    })
  }

  const header = getHeader(event, 'authorization') ?? ''
  const provided = header.startsWith('Bearer ') ? header.slice(7) : ''

  if (!matches(provided, secret)) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  setResponseHeader(event, 'Cache-Control', 'no-store')

  return await runEponymeSchedule()
})
