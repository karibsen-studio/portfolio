<script setup lang="ts">
import BaseSection from '~/components/section/BaseSection.vue'
import CornerHandles from '~/components/ui/CornerHandles.vue'
import Heading from '~/components/ui/Heading.vue'
import PressButton from '~/components/ui/PressButton.vue'
import SectionTitle from '~/components/section/SectionTitle.vue'
import Tag from '~/components/ui/tags/Tag.vue'

const title = 'Karibsen: Démarrer un projet de site ou d\'application'
const description = 'Parlez-nous de votre site vitrine, de votre refonte ou de votre application web. Décrivez votre projet et recevez une réponse personnalisée sous 24 heures.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description
})

const headingId = useId()
const formId = useId()

const fields = {
  name: `${formId}-name`,
  email: `${formId}-email`,
  company: `${formId}-company`,
  projectType: `${formId}-project-type`,
  budget: `${formId}-budget`,
  timing: `${formId}-timing`,
  message: `${formId}-message`
}

const projectTypes = [
  { label: 'Site vitrine', value: 'website' },
  { label: 'Refonte de site web', value: 'redesign' },
  { label: 'Application web sur mesure', value: 'webapp' },
  { label: 'Site web pour restaurant', value: 'restaurant' },
  { label: 'Autre projet', value: 'other' }
]

const budgets = [
  { label: 'Moins de 1 000 €', value: 'under_1k' },
  { label: 'Entre 1 000 € et 3 000 €', value: '1k_to_3k' },
  { label: 'Entre 3 000 € et 5 000 €', value: '3k_to_5k' },
  { label: 'Entre 5 000 € et 10 000 €', value: '5k_to_10k' },
  { label: 'Plus de 10 000 €', value: 'over_10k' },
  { label: 'À définir ensemble', value: 'tbd' }
]

const timings = [
  { label: 'Dès que possible', value: 'asap' },
  { label: 'Dans les 1 à 2 mois', value: '1_to_2_months' },
  { label: 'Dans les 3 à 6 mois', value: '3_to_6_months' },
  { label: 'Plus tard dans l’année', value: 'later' },
  { label: 'Je n’ai pas encore de date', value: 'tbd' }
]

const { values: form, pending, submitted, submit, honeypot } = useEponymeForm('contact')
</script>

<template>
  <div class="flex flex-col gap-16 pb-24 pt-36 sm:pb-32 sm:pt-44 lg:gap-24">
    <BaseSection
      :aria-labelledby="headingId"
      class="flex flex-col items-center gap-7"
    >
      <SectionTitle
        :id="headingId"
        heading="h1"
        size="h2"
      >
        <template #title>
          Parlons de ce que vous voulez construire.
        </template>
        <template #description>
          <p class="max-w-2xl text-lg leading-relaxed text-foreground-300 sm:text-xl md:text-center">
            Quelques informations suffisent pour comprendre votre besoin et préparer un premier échange vraiment utile.
          </p>
        </template>
      </SectionTitle>

      <div class="flex flex-wrap justify-center gap-4">
        <Tag label="Réponse sous 24 h" />
        <Tag label="Échange gratuit" />
        <Tag label="Devis transparent" />
      </div>
    </BaseSection>

    <BaseSection class="grid items-start gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(20rem,.8fr)]">
      <div
        v-if="submitted"
        class="relative flex flex-col gap-6 border border-border-100 bg-white p-6 sm:p-8 lg:p-10 text-center items-center justify-center"
      >
        <CornerHandles />
        <Heading
          as="h2"
          class="text-2xl sm:text-3xl"
        >
          Merci pour votre message !
        </Heading>
        <p class="text-foreground-300">
          Nous reviendrons vers vous sous 24 heures avec des premières pistes concrètes.
        </p>
      </div>
      <form
        v-else
        class="relative grid gap-6 border border-border-100 bg-white p-6 sm:grid-cols-2 sm:p-8 lg:p-10"
        @submit.prevent="submit"
      >
        <CornerHandles />

        <div class="flex flex-col gap-2">
          <label
            :for="fields.name"
            class="font-sans font-semibold text-black"
          >
            Votre nom
          </label>
          <UInput
            :id="fields.name"
            v-model="form.name"
            type="text"
            name="name"
            autocomplete="name"
            required
            size="xl"
            class="w-full"
          />
        </div>

        <div class="flex flex-col gap-2">
          <label
            :for="fields.email"
            class="font-sans font-semibold text-black"
          >
            Votre e-mail
          </label>
          <UInput
            :id="fields.email"
            v-model="form.email"
            type="email"
            name="email"
            autocomplete="email"
            required
            size="xl"
            class="w-full"
          />
        </div>

        <div class="flex flex-col gap-2 sm:col-span-2">
          <label
            :for="fields.company"
            class="font-sans font-semibold text-black"
          >
            Entreprise <span class="font-normal text-black/45">(facultatif)</span>
          </label>
          <UInput
            :id="fields.company"
            v-model="form.company"
            type="text"
            name="company"
            autocomplete="organization"
            size="xl"
            class="w-full"
          />
        </div>

        <div class="flex flex-col gap-2">
          <label
            :for="fields.projectType"
            class="font-sans font-semibold text-black"
          >
            Type de projet
          </label>
          <USelect
            :id="fields.projectType"
            v-model="form.projectType"
            :items="projectTypes"
            name="projectType"
            required
            placeholder="Sélectionnez une option"
            size="xl"
            class="w-full"
          />
        </div>

        <div class="flex flex-col gap-2">
          <label
            :for="fields.budget"
            class="font-sans font-semibold text-black"
          >
            Budget envisagé <span class="font-normal text-black/45">(facultatif)</span>
          </label>
          <USelect
            :id="fields.budget"
            v-model="form.budget"
            :items="budgets"
            name="budget"
            placeholder="Je ne sais pas encore"
            size="xl"
            class="w-full"
          />
        </div>

        <div class="flex flex-col gap-2 sm:col-span-2">
          <label
            :for="fields.timing"
            class="font-sans font-semibold text-black"
          >
            Quand souhaitez-vous commencer ? <span class="font-normal text-black/45">(facultatif)</span>
          </label>
          <USelect
            :id="fields.timing"
            v-model="form.timing"
            :items="timings"
            name="timing"
            placeholder="Je ne sais pas encore"
            size="xl"
            class="w-full"
          />
        </div>

        <div class="flex flex-col gap-2 sm:col-span-2">
          <label
            :for="fields.message"
            class="font-sans font-semibold text-black"
          >
            Parlez-nous de votre projet
          </label>
          <UTextarea
            :id="fields.message"
            v-model="form.message"
            name="message"
            :rows="7"
            required
            placeholder="Votre activité, votre besoin, ce qui existe déjà et ce que vous aimeriez améliorer…"
            size="xl"
            class="w-full"
          />
        </div>

        <div class="flex flex-col items-start gap-3 sm:col-span-2">
          <input
            v-if="honeypot"
            :name="honeypot"
            tabindex="-1"
            autocomplete="off"
            hidden
          >
          <PressButton
            type="submit"
            label="Envoyer"
            color="neutral"
            :loading="pending"
          />
        </div>
      </form>

      <aside class="relative flex flex-col gap-8 border border-border-100 bg-white p-7 text-black sm:p-9">
        <CornerHandles />

        <div class="flex flex-col gap-3">
          <Heading
            as="h2"
            class="font-sans! text-3xl font-semibold text-black! sm:text-4xl"
          >
            Ce qui se passe ensuite
          </Heading>
          <p class="leading-relaxed text-foreground-300">
            Nous lisons personnellement chaque demande et vous répondons avec des premières pistes concrètes.
          </p>
        </div>

        <ol class="flex flex-col gap-6">
          <li class="flex gap-4">
            <span
              class="font-heading text-2xl tracking-heading text-black/35"
              aria-hidden="true"
            >01</span>
            <div>
              <h3 class="font-sans font-semibold text-black">
                Premier retour
              </h3>
              <p class="mt-1 text-sm leading-relaxed text-foreground-300">
                Une réponse sous 24 heures pour confirmer que le projet correspond à notre savoir-faire.
              </p>
            </div>
          </li>
          <li class="flex gap-4">
            <span
              class="font-heading text-2xl tracking-heading text-black/35"
              aria-hidden="true"
            >02</span>
            <div>
              <h3 class="font-sans font-semibold text-black">
                Appel découverte
              </h3>
              <p class="mt-1 text-sm leading-relaxed text-foreground-300">
                Un échange gratuit pour préciser vos objectifs, le périmètre et les priorités.
              </p>
            </div>
          </li>
          <li class="flex gap-4">
            <span
              class="font-heading text-2xl tracking-heading text-black/35"
              aria-hidden="true"
            >03</span>
            <div>
              <h3 class="font-sans font-semibold text-black">
                Proposition claire
              </h3>
              <p class="mt-1 text-sm leading-relaxed text-foreground-300">
                Un devis qui détaille les livrables, le calendrier et le budget avant de commencer.
              </p>
            </div>
          </li>
        </ol>

        <div class="border-t border-black/15 pt-6">
          <p class="text-sm text-foreground-300">
            Vous préférez écrire directement ?
          </p>
          <NuxtLink
            to="mailto:contact@karibsen.fr"
            class="mt-1 inline-flex font-sans font-semibold text-black underline decoration-1 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
          >
            contact@karibsen.fr
          </NuxtLink>
        </div>
      </aside>
    </BaseSection>
  </div>
</template>
