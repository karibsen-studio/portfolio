<script setup lang="ts">
import PageSection from '~/components/section/PageSection.vue'
import ContentCard from '~/components/ui/ContentCard.vue'

const title = 'Karibsen: Mentions légales et données personnelles'
const description = 'Mentions légales du site Karibsen : éditeur, hébergeur, propriété intellectuelle et données personnelles.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description
})

const sections = [
  {
    title: 'Éditeur du site',
    paragraphs: [
      'Le site karibsen.fr est édité par Karibsen, studio de création de sites et d’applications web.',
      'Directeur de la publication : Corentin Nelhomme.',
      'Adresse du siège social : 33 avenue du Maréchal Foch, 77500 Chelles.',
      'SIREN : 932 803 125.',
      'SIRET du siège : 932 803 125 00016.',
      'Contact : contact@karibsen.fr'
    ]
  },
  {
    title: 'Hébergement',
    paragraphs: [
      'Le site est hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis.',
      'Site de l’hébergeur : vercel.com'
    ]
  },
  {
    title: 'Propriété intellectuelle',
    paragraphs: [
      'L’ensemble des contenus présents sur ce site, notamment les textes, images, illustrations, logos, éléments graphiques et le code, est la propriété de Karibsen ou de ses partenaires et est protégé par le droit d’auteur.',
      'Toute reproduction, représentation, modification ou exploitation, totale ou partielle, sans autorisation écrite préalable est interdite.',
      'Les réalisations présentées restent la propriété de leurs commanditaires respectifs et sont affichées à titre de référence.'
    ]
  },
  {
    title: 'Données personnelles',
    paragraphs: [
      'Les informations transmises via les formulaires de contact sont utilisées uniquement pour répondre à votre demande et assurer le suivi de la relation commerciale. Elles ne sont ni vendues, ni cédées à des tiers.',
      'Conformément au Règlement général sur la protection des données (RGPD) et à la loi Informatique et Libertés, vous disposez d’un droit d’accès, de rectification, d’effacement, de limitation et d’opposition sur vos données.',
      'Pour exercer ces droits, écrivez à contact@karibsen.fr. Vous pouvez également introduire une réclamation auprès de la CNIL.'
    ]
  },
  {
    title: 'Cookies et mesure d’audience',
    paragraphs: [
      'Ce site ne dépose aucun cookie publicitaire ni traceur tiers à des fins de profilage.',
      'Seules des mesures d’audience anonymes peuvent être collectées afin de comprendre la fréquentation du site. Elles ne permettent pas de vous identifier.'
    ]
  },
  {
    title: 'Responsabilité',
    paragraphs: [
      'Karibsen s’efforce de maintenir les informations publiées à jour et exactes, sans pouvoir en garantir l’exhaustivité.',
      'Les liens vers des sites externes sont proposés à titre informatif : leur contenu n’engage pas la responsabilité de Karibsen.'
    ]
  },
  {
    title: 'Droit applicable',
    paragraphs: [
      'Les présentes mentions légales sont soumises au droit français. En cas de litige, et à défaut d’accord amiable, les tribunaux français sont seuls compétents.'
    ]
  }
]
</script>

<template>
  <PageSection
    title="Mentions légales"
    size="h2"
  >
    <div class="flex flex-col gap-6">
      <ContentCard
        v-for="section in sections"
        :key="section.title"
        :title="section.title"
      >
        <p
          v-for="paragraph in section.paragraphs"
          :key="paragraph"
          class="leading-relaxed text-foreground-300"
        >
          {{ paragraph }}
        </p>
      </ContentCard>
    </div>
  </PageSection>
</template>
