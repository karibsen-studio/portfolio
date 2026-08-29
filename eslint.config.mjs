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
  }),
  {
    // Le nom du fichier doit correspondre au nom du champ personnalisé Eponyme.
    files: ['eponyme/fields/*.vue'],
    rules: {
      'vue/multi-word-component-names': 'off'
    }
  }
)
