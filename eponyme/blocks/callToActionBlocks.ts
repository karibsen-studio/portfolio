import { defineBlock, field } from '@karibsen/eponyme/config'

export const callToActionBlock = defineBlock({
  name: 'callToAction',
  label: 'Bloc d’action',
  description: 'Le lien d’action affiché à la fin de la page.',
  fields: {
    title: field.string({
      label: 'Titre',
      required: true,
      maxLength: 120,
      defaultValue: 'Vous avez une idée, un besoin ou un site à faire évoluer ?'
    }),
    description: field.textarea({
      label: 'Description',
      maxLength: 240,
      defaultValue: 'Un premier échange suffit pour y voir clair : on cadre le besoin, on vous dit ce qui est réaliste, et vous repartez avec des pistes concrètes.'
    }),
    label: field.string({
      label: 'Libellé du bouton',
      required: true,
      maxLength: 50,
      defaultValue: 'Démarrer un projet'
    }),
    to: field.url({
      label: 'Lien du bouton',
      defaultValue: {
        href: '/demarrer-un-projet',
        type: 'internal',
        openInNewTab: false
      }
    })
  }
})
