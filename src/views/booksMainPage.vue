<template>
  <v-container class="py-8 px-6">
    <div class="text-center mb-6">
      <h1 class="text-h4 font-weight-bold">📚 Библиотека книг</h1>
      <p class="text-grey">Выберите жанр, чтобы начать чтение</p>
    </div>

    <nav class="genre-nav d-flex flex-wrap justify-center gap-4 mb-8">
      <v-btn size="large" color="indigo-darken-3" variant="tonal" @click="loadBooks('fiction')">
        Художественная
      </v-btn>
      <v-btn
        size="large"
        color="deep-purple-accent-4"
        variant="tonal"
        @click="loadBooks('fantasy')"
      >
        Фантастика
      </v-btn>
      <v-btn size="large" color="blue-grey-darken-2" variant="tonal" @click="loadBooks('mystery')">
        Мистика
      </v-btn>
    </nav>

    <div v-if="loading" class="text-center my-10">
      <v-progress-circular indeterminate size="50" width="4" color="primary" />
      <p class="mt-4 text-subtitle-1">Загружаем книги...</p>
    </div>

    <div v-else-if="error" class="text-center my-10">
      <v-alert type="error" title="Ошибка загрузки" :text="error" />
    </div>

    <div v-else class="books-grid">
      <v-card v-for="book in books" :key="book.id" class="book-card" target="_blank">
        <router-link :to="`/book/${book.id}`">
          <v-img
            :src="book.preview"
            :alt="`Обложка книги: ${book.title}`"
            height="220"
            cover
            gradient="to bottom, rgba(0,0,0,0.05), rgba(0,0,0,0.4)"
          />

          <div class="book-content">
            <v-card-title class="book-title">
              {{ book.title.length > 25 ? `${book.title.slice(0, 25)}...` : book.title }}
            </v-card-title>

            <v-card-subtitle class="book-authors">
              {{ book.authors.join(', ') }}
            </v-card-subtitle>

            <v-card-text class="book-details py-2">
              <div class="d-flex align-center mb-1">
                <v-icon color="amber-darken-3" size="16">mdi-star</v-icon>
              </div>
              <div class="text-caption text-grey">{{ book.publishedDate }}</div>
            </v-card-text>

            <v-card-actions class="pt-0">
              <v-btn variant="text" color="primary" size="small">Подробнее</v-btn>
            </v-card-actions>
          </div>
        </router-link>
      </v-card>
    </div>

    <div v-if="!loading && !error && books.length === 0" class="text-center my-10">
      <p class="text-grey">Книги по этому жанру не найдены.</p>
    </div>
  </v-container>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useBookStore } from '../stores/booksStore'

const bookStore = useBookStore()
const { books, loading, error } = storeToRefs(bookStore)
const { fetchBooks } = bookStore

const loadBooks = (genre: string) => {
  fetchBooks(genre)
}
</script>

<style scoped lang="scss">
.genre-nav {
  margin-bottom: 2rem;
}
.books-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  justify-items: center;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
}

.book-card {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 300px;
  height: 420px;
  overflow: hidden;
  border-radius: 12px !important;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(66, 101, 176, 0.18) !important; // Синеватая тень
    border: 1px solid rgba(66, 101, 176, 0.3);
  }
}

:deep(.v-img) {
  height: 220px !important;
  flex-shrink: 0;
}

.book-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding: 12px;
  background-color: #fff;
}

.book-title {
  font-size: 1.05rem;
  font-weight: 600;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 4px;
  color: #1a1a1a;
}

.book-authors {
  font-size: 0.85rem;
  line-height: 1.4;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #444;
  margin-top: 0;
  margin-bottom: 8px;
  flex-shrink: 0;
}

.book-details {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 8px;

  .text-caption {
    font-size: 0.75rem;
  }
}

:deep(.v-card-actions) {
  justify-content: flex-end;
  padding-top: 0;
  padding-bottom: 8px;
}

@media (max-width: 960px) {
  .books-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
  .book-card {
    max-width: 260px;
    height: 400px;
  }
}

@media (max-width: 600px) {
  .book-card {
    max-width: 100%;
  }
}
</style>
