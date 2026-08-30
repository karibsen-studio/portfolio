import { collection, defineEponymeConfig, field, form, today } from '@karibsen/eponyme/config'
import { callToActionBlock } from './eponyme/blocks/callToActionBlocks'

export default defineEponymeConfig({
  homepage: {
    hero: field.section({
      label: 'Hero',
      description: 'Le bloc d’ouverture de la page d’accueil.',
      fields: {
        title: field.string({
          label: 'Titre',
          required: true,
          maxLength: 120,
          defaultValue: 'Des sites web sur mesure conçus pour valoriser votre image et attirer vos futurs clients'
        }),
        description: field.textarea({
          label: 'Description',
          maxLength: 240,
          defaultValue: 'Chez Karibsen, nous créons des sites web uniques et performants qui renforcent votre image, attirent vos clients et font grandir votre activité.'
        }),
        ctaLabel: field.string({
          label: 'Libellé du bouton',
          description: 'Laisser vide pour masquer le bouton.',
          maxLength: 40,
          defaultValue: 'Démarrer un projet'
        }),
        ctaTo: field.url({
          label: 'Lien du bouton',
          defaultValue: {
            href: '/demarrer-un-projet',
            type: 'internal',
            openInNewTab: false
          }
        }),
        workedWith: field.boolean({
          label: 'Afficher les logos clients',
          defaultValue: true
        })
      }
    }),

    faq: field.section({
      label: 'FAQ',
      description: 'Les questions fréquentes affichées en bas de la page d’accueil.',
      fields: {
        title: field.string({
          label: 'Titre',
          maxLength: 120,
          defaultValue: 'Des questions ? On est là pour y répondre'
        }),
        description: field.textarea({
          label: 'Description',
          maxLength: 300,
          defaultValue: 'Bien plus qu’un simple site web, nous créons des expériences digitales pensées pour affirmer votre présence, séduire vos clients et accompagner votre croissance.'
        }),
        items: field.array({
          label: 'Questions',
          addLabel: 'Ajouter une question',
          itemLabel: 'Question $i',
          of: {
            question: field.string({
              label: 'Question',
              required: true,
              maxLength: 120
            }),
            answer: field.textarea({
              label: 'Réponse',
              required: true
            })
          },
          defaultValue: [
            {
              question: 'Combien coûte un site internet ?',
              answer: 'Le prix dépend de votre projet, du nombre de pages et des fonctionnalités souhaitées. Chaque projet fait l’objet d’un devis personnalisé afin de proposer une solution adaptée à vos besoins et à votre budget.'
            },
            {
              question: 'Combien de temps faut-il pour créer un site ?',
              answer: 'La durée varie selon la complexité du projet. Un site vitrine peut généralement être réalisé en quelques semaines, tandis qu’un projet plus complet peut demander davantage de temps.'
            },
            {
              question: 'Est-ce que le site m’appartient une fois terminé ?',
              answer: 'Oui. Une fois le projet terminé et réglé, votre site vous appartient. Vous restez également propriétaire de votre nom de domaine, de vos contenus et de vos données.'
            },
            {
              question: 'Puis-je modifier le contenu de mon site moi-même ?',
              answer: 'Oui. Nous pouvons mettre en place une interface simple qui vous permet de modifier vos textes, images et autres contenus sans avoir besoin de connaissances techniques.'
            },
            {
              question: 'Est-ce que vous vous occupez du référencement Google ?',
              answer: 'Oui. Chaque site est conçu avec de bonnes bases techniques pour le référencement naturel : performances, structure des pages, métadonnées et optimisation pour les moteurs de recherche.'
            },
            {
              question: 'Travaillez-vous uniquement en Île-de-France ?',
              answer: 'Non. Nous pouvons travailler entièrement à distance avec des entreprises partout en France, tout en étant disponibles localement en Île-de-France pour les projets qui nécessitent des échanges sur place.'
            },
            {
              question: 'Proposez-vous la maintenance et l’hébergement ?',
              answer: 'Oui. Nous pouvons prendre en charge l’hébergement, les mises à jour, la maintenance technique et le suivi de votre site après sa mise en ligne.'
            },
            {
              question: 'Comment se déroule un projet avec Karibsen ?',
              answer: 'Nous commençons par échanger sur votre activité, vos objectifs et vos besoins. Nous définissons ensuite la structure et le design du site avant de passer au développement, aux ajustements et à la mise en ligne.'
            }
          ]
        })
      }
    })
  },

  recrutement: {
    title: field.string({
      label: 'Titre',
      required: true,
      maxLength: 120,
      defaultValue: 'Rejoignez Karibsen.'
    }),
    description: field.textarea({
      label: 'Introduction',
      required: true,
      maxLength: 300,
      defaultValue: 'Nous sommes toujours curieux de rencontrer des personnes passionnées par le design, le développement web et les expériences numériques bien pensées.'
    }),
    cta: field.section({
      label: 'Appel à l’action',
      fields: {
        title: field.string({
          label: 'Titre',
          required: true,
          maxLength: 120,
          defaultValue: 'Vous souhaitez travailler avec Karibsen ?'
        }),
        description: field.textarea({
          label: 'Description',
          maxLength: 240,
          defaultValue: 'Envoyez-nous quelques mots sur votre parcours, vos envies et les projets dont vous êtes fier.'
        }),
        label: field.string({
          label: 'Libellé du bouton',
          required: true,
          maxLength: 50,
          defaultValue: 'Envoyer une candidature'
        }),
        to: field.url({
          label: 'Lien du bouton',
          protocols: ['mailto'],
          defaultValue: {
            href: 'mailto:contact@karibsen.fr?subject=Candidature%20spontan%C3%A9e',
            type: 'external',
            openInNewTab: false
          }
        })
      }
    }),
    seo: field.seo()
  },

  realisations: collection({
    label: 'Réalisations',
    description: 'Les projets présentés sur le site.',
    addLabel: '+ Nouvelle réalisation',
    titleField: 'name',
    slugField: 'slug',
    fields: {
      name: field.string({
        label: 'Nom du projet',
        required: true,
        maxLength: 60
      }),
      slug: field.slug({
        label: 'Slug',
        required: true
      }),
      tags: field.tags({
        label: 'Tags',
        suggestions: ['Site vitrine', 'Refonte', 'Application web', 'SaaS', 'E-commerce'],
        allowCustom: true,
        maxItems: 3
      }),
      locales: field.tags({
        label: 'Lieux d’intervention',
        description: 'Villes ou départements (ex: Seine-et-Marne, Bordeaux...)',
        suggestions: ['Seine-et-Marne', 'Paris', 'Bordeaux', 'Guadeloupe'],
        allowCustom: true,
        maxItems: 3
      }),
      description: field.string({
        label: 'Description',
        maxLength: 80
      }),
      text: field.richText({
        label: 'Descriptif'
      }),
      image: field.string({
        label: 'Visuel',
        description: 'Chemin local ou URL de l’image.',
        required: true
      })
    }
  }),

  articles: collection({
    label: 'Articles',
    description: 'Le blog de Karibsen.',
    addLabel: '+ Nouvel article',
    titleField: 'title',
    slugField: 'slug',
    fields: {
      title: field.string({
        label: 'Titre',
        required: true,
        maxLength: 120
      }),
      slug: field.slug({
        label: 'Slug',
        required: true
      }),
      excerpt: field.textarea({
        label: 'Accroche',
        description: 'Résumé affiché dans la liste des articles et dans les partages.',
        maxLength: 220
      }),
      tags: field.tags({
        label: 'Catégories',
        description: 'Servent de filtres sur la page blog.',
        suggestions: ['Création de site', 'Refonte', 'Application web', 'SEO', 'CMS', 'Performance', 'Nuxt', 'Design'],
        allowCustom: true,
        maxItems: 3
      }),
      cover: field.string({
        label: 'Image de couverture',
        description: 'Chemin local ou URL de l’image.'
      }),
      publishedOn: field.date({
        label: 'Date de publication',
        defaultValue: today()
      }),
      readingTime: field.number({
        label: 'Temps de lecture',
        description: 'En minutes.',
        min: 1,
        max: 60,
        defaultValue: 1
      }),
      body: field.richText({
        label: 'Contenu',
        required: true,
        placeholder: 'Écrivez votre article…'
      }),
      seo: field.seo(),
      cta: callToActionBlock()
    }
  }),

  jobs: collection({
    label: 'Offres d’emploi',
    description: 'Les postes, stages et alternances affichés sur la page recrutement.',
    addLabel: '+ Nouvelle offre',
    titleField: 'title',
    slugField: 'slug',
    fields: {
      title: field.string({
        label: 'Intitulé du poste',
        required: true,
        maxLength: 80
      }),
      reference: field.custom('reference', {
        label: 'Référence',
        description: 'Identifiant public de l’offre, généré automatiquement. Il sert d’adresse à la page : /recrutement/ks4821.',
        defaultValue: 'KS0000',
        required: true
      }),
      slug: field.slug({
        label: 'Slug',
        description: 'Identifiant interne. Reprenez la référence en minuscules, par exemple ks4821.',
        required: true
      }),
      contract: field.select({
        label: 'Type de contrat',
        required: true,
        options: [
          { label: 'Stage', value: 'stage' },
          { label: 'Alternance', value: 'alternance' },
          { label: 'CDI', value: 'cdi' },
          { label: 'CDD', value: 'cdd' },
          { label: 'Freelance', value: 'freelance' }
        ]
      }),
      duration: field.string({
        label: 'Durée',
        description: 'Par exemple « 2 mois maximum ». Laisser vide pour un poste sans durée.',
        maxLength: 40
      }),
      location: field.string({
        label: 'Lieu',
        maxLength: 60,
        defaultValue: 'À distance'
      }),
      remote: field.boolean({
        label: 'Télétravail possible',
        defaultValue: true
      }),
      excerpt: field.textarea({
        label: 'Accroche',
        description: 'Résumé affiché dans la liste des offres.',
        required: true,
        maxLength: 220
      }),
      skills: field.tags({
        label: 'Compétences',
        suggestions: ['Figma', 'UI', 'UX', 'Design system', 'Maquettes', 'Nuxt', 'Vue', 'TypeScript', 'SEO'],
        allowCustom: true,
        maxItems: 6
      }),
      body: field.richText({
        label: 'Description du poste',
        required: true,
        placeholder: 'Missions, profil recherché, déroulement…'
      }),
      applyTo: field.url({
        label: 'Lien de candidature',
        protocols: ['mailto'],
        defaultValue: {
          href: 'mailto:contact@karibsen.fr?subject=Candidature',
          type: 'external',
          openInNewTab: false
        }
      }),
      publishedOn: field.date({
        label: 'Date de publication',
        defaultValue: today()
      }),
      open: field.boolean({
        label: 'Offre ouverte',
        description: 'Décocher pour la garder en ligne en indiquant qu’elle est pourvue.',
        defaultValue: true
      })
    }
  }),

  reviews: collection({
    label: 'Avis clients',
    description: 'Les témoignages affichés sur la page d’accueil.',
    addLabel: '+ Nouvel avis',
    titleField: 'name',
    slugField: 'slug',
    fields: {
      name: field.string({
        label: 'Nom',
        required: true,
        maxLength: 60
      }),
      slug: field.slug({
        label: 'Slug',
        required: true
      }),
      position: field.string({
        label: 'Fonction',
        description: 'Par exemple « Fondatrice · Entreprise locale ».',
        maxLength: 80
      }),
      avatar: field.string({
        label: 'Photo',
        description: 'Chemin local ou URL de l’image.'
      }),
      content: field.textarea({
        label: 'Témoignage',
        required: true,
        maxLength: 400
      })
    }
  }),
  contact: form({
    label: 'Formulaire de contact',
    description: 'Formulaire de contact pour demander un site',
    submission: { mode: 'managed' },
    fields: {
      name: field.string({
        label: 'Votre nom',
        required: true
      }),
      email: field.email({
        label: 'Votre e-mail',
        required: true
      }),
      company: field.string({
        label: 'Entreprise'
      }),
      projectType: field.select({
        label: 'Type de projet',
        required: true,
        options: [
          { label: 'Site vitrine', value: 'website' },
          { label: 'Refonte de site web', value: 'redesign' },
          { label: 'Application web sur mesure', value: 'webapp' },
          { label: 'Site web pour restaurant', value: 'restaurant' },
          { label: 'Autre projet', value: 'other' }
        ]
      }),
      budget: field.select({
        label: 'Budget envisagé',
        options: [
          { label: 'Moins de 1 000 €', value: 'under_1k' },
          { label: 'Entre 1 000 € et 3 000 €', value: '1k_to_3k' },
          { label: 'Entre 3 000 € et 5 000 €', value: '3k_to_5k' },
          { label: 'Entre 5 000 € et 10 000 €', value: '5k_to_10k' },
          { label: 'Plus de 10 000 €', value: 'over_10k' },
          { label: 'À définir ensemble', value: 'tbd' }
        ]
      }),
      timing: field.select({
        label: 'Quand souhaitez-vous commencer ?',
        options: [
          { label: 'Dès que possible', value: 'asap' },
          { label: 'Dans les 1 à 2 mois', value: '1_to_2_months' },
          { label: 'Dans les 3 à 6 mois', value: '3_to_6_months' },
          { label: 'Plus tard dans l’année', value: 'later' },
          { label: 'Je n’ai pas encore de date', value: 'tbd' }
        ]
      }),
      message: field.textarea({
        label: 'Parlez-nous de votre projet',
        required: true
      })
    }
  })
})
