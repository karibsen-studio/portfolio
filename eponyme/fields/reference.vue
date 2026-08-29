<script setup lang="ts">
import { REFERENCE_DIGITS, REFERENCE_PREFIX, generateReference, type ReferenceFieldOptions } from './reference'

const props = defineProps<{
  id: string
  modelValue?: string
  label: string
  description?: string
  required?: boolean
  errors?: string[]
  disabled?: boolean
  options: Readonly<ReferenceFieldOptions & { description?: string }>
}>()

const emit = defineEmits<{ 'update:modelValue': [string] }>()

const prefix = computed(() => props.options.prefix ?? REFERENCE_PREFIX)
const digits = computed(() => props.options.digits ?? REFERENCE_DIGITS)

function regenerate() {
  emit('update:modelValue', generateReference(prefix.value, digits.value))
}

/** Une offre sans référence en reçoit une dès l'ouverture du formulaire. */
onMounted(() => {
  if (!props.modelValue) regenerate()
})
</script>

<template>
  <UFormField
    :label="label"
    :description="description"
    :required="required"
    :error="errors?.[0]"
  >
    <div class="flex items-center gap-2">
      <UInput
        :id="id"
        :model-value="modelValue"
        :disabled="disabled"
        :placeholder="`${prefix}${'0'.repeat(digits)}`"
        class="font-mono"
        @update:model-value="emit('update:modelValue', String($event).toUpperCase())"
      />

      <UButton
        color="neutral"
        variant="subtle"
        icon="lucide:dices"
        :disabled="disabled"
        label="Générer"
        @click="regenerate"
      />
    </div>
  </UFormField>
</template>
