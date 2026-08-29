import { defineEponymeField } from '@karibsen/eponyme/config'

export interface ReferenceFieldOptions {
  /** Préfixe affiché devant le numéro. */
  prefix?: string
  /** Nombre de chiffres du numéro. */
  digits?: number
}

export const REFERENCE_PREFIX = 'KS'
export const REFERENCE_DIGITS = 4

/** Tire une référence du type KS4821, utilisée comme identifiant public d’une offre. */
export function generateReference(prefix = REFERENCE_PREFIX, digits = REFERENCE_DIGITS): string {
  const number = Math.floor(Math.random() * 10 ** digits)

  return `${prefix}${String(number).padStart(digits, '0')}`
}

export function referencePattern(prefix = REFERENCE_PREFIX, digits = REFERENCE_DIGITS): RegExp {
  return new RegExp(`^${prefix}\\d{${digits}}$`)
}

export default defineEponymeField<string, ReferenceFieldOptions>({
  defaultValue: '',
  normalize: value => typeof value === 'string' ? value.trim().toUpperCase() : '',
  validate: (value, options) => {
    const prefix = options.prefix ?? REFERENCE_PREFIX
    const digits = options.digits ?? REFERENCE_DIGITS

    if (typeof value !== 'string' || !value)
      return options.required ? 'Générez une référence pour cette offre.' : true

    return referencePattern(prefix, digits).test(value)
      || `La référence doit ressembler à ${prefix}${'0'.repeat(digits)}.`
  }
})
