import { createRouter, createWebHistory } from 'vue-router'
import BookPage from '../views/bookPage.vue'
import { useBookStore } from '../stores/booksStore'
import BooksMainPage from '../views/booksMainPage.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/book/:id',
      name: 'BookDetails',
      component: BookPage,
      props: true,
    },
    {
      path: '/',
      name: 'bookscatalog',
      component: BooksMainPage,
    },
  ],
})

export default router
