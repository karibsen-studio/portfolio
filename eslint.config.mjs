// @ts-check
import { karibsen } from '@karibsen/eslint-config'

import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  karibsen({
    typescript: false,
    stylistic: false,
    ignores: [
      '**/prisma/migrations',
      '**/public',
      '**/.data'
    ]
  })
)
