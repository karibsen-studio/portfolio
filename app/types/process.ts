export type ProcessAnimation = 'call' | 'skeleton' | 'website' | 'online'

export interface ProcessStep {
  title: string
  description: string
  /** Illustration animée. Sans elle, l'étape affiche son numéro. */
  animation?: ProcessAnimation
}
