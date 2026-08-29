<script setup lang="ts">
import type { ArticleItem } from '~/types/content'
import Article from '~/components/ui/article/Article.vue'
import CornerHandles from '~/components/ui/CornerHandles.vue'

const props = withDefaults(defineProps<{
  articles?: ArticleItem[]
}>(), {
  articles: () => []
})

const gridColumns = computed(() => {
  const count = props.articles.length

  if (count >= 3) return 'md:grid-cols-2 lg:grid-cols-3'
  if (count === 2) return 'md:grid-cols-2'

  return 'mx-auto w-full max-w-150'
})
</script>

<template>
  <div class="relative">
    <ul
      class="grid gap-px border border-border-100 bg-border-100"
      :class="gridColumns"
    >
      <li
        v-for="article in articles"
        :key="article.slug"
        class="bg-white"
      >
        <Article v-bind="article" />
      </li>
    </ul>

    <CornerHandles />
  </div>
</template>
