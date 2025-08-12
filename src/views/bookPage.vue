<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useBookStore } from '../stores/booksStore'

const route = useRoute()
const bookStore = useBookStore()

const book = ref<any>(null)

onMounted(async () => {
  const { id } = route.params

  try {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`)
    if (!response.ok) throw new Error('Книга не найдена')

    const data = await response.json()
    book.value = data
  } catch (err) {
    console.error('Ошибка загрузки книги:', err)
    book.value = null
  }
})
</script>

<template>
  <div v-if="book" class="book-details pa-6">
    <v-card max-width="800" class="mx-auto">
      <v-img
        :src="book.volumeInfo.imageLinks?.thumbnail || '/placeholder.jpg'"
        height="400"
        cover
      />
      <v-card-title class="text-h5">{{ book.volumeInfo.title }}</v-card-title>
      <v-card-subtitle>
        {{ book.volumeInfo.authors?.join(', ') || 'Автор не указан' }}
      </v-card-subtitle>

      <v-card-text>
        <p><strong>Год:</strong> {{ book.volumeInfo.publishedDate }}</p>
        <p><strong>Издатель:</strong> {{ book.volumeInfo.publisher }}</p>
        <p><strong>Рейтинг:</strong> ⭐ {{ book.volumeInfo.averageRating || 'Нет' }}</p>

        <div class="mt-4">
          <h4>Описание:</h4>
          <p v-if="book.volumeInfo.description" v-html="book.volumeInfo.description"></p>
          <p v-else>Описание отсутствует.</p>
        </div>
      </v-card-text>

      <v-card-actions>
        <v-btn
          color="primary"
          :href="book.volumeInfo.previewLink"
          target="_blank"
          variant="outlined"
        >
          Читать на Google Книгах
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>

  <div v-else class="text-center mt-10">
    <p>Загрузка книги...</p>
  </div>
</template>

<style scoped>
.book-details {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
