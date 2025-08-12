import { defineStore } from 'pinia'

interface VolumeInfo {
  title?: string
  authors?: string[]
  publisher?: string
  publishedDate?: string
  description?: string
  imageLinks?: {
    smallThumbnail?: string
    thumbnail?: string
  }
  averageRating?: number
  pageCount?: number
  categories?: string[]
  [key: string]: unknown
}

interface VolumeItem {
  id: string
  selfLink: string
  volumeInfo: VolumeInfo
  [key: string]: unknown
}

interface GoogleBooksResponse {
  items?: VolumeItem[]
  totalItems: number
  kind: string
  [key: string]: unknown
}

export interface Book {
  id: string
  selfLink: string
  title: string
  authors: string[]
  preview: string
  publishedDate: string
}

type FetchError = Error | { message: string }

export const useBookStore = defineStore('Books', {
  state: () => ({
    books: [] as Book[],
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async fetchBooks(genre: string): Promise<void> {
      this.loading = true
      this.error = null
      this.books = []

      try {
        const url = `https://www.googleapis.com/books/v1/volumes?q=subject:${encodeURIComponent(
          genre,
        )}&maxResults=20&orderBy=relevance`

        const response = await fetch(url)

        if (!response.ok) {
          throw new Error(`Ошибка HTTP: ${response.status}`)
        }

        const data: GoogleBooksResponse = await response.json()

        if (!data.items || !Array.isArray(data.items)) {
          this.books = []
          return
        }

        this.books = data.items
          .filter((item): item is VolumeItem => Boolean(item.volumeInfo))
          .map((item): Book => {
            const info = item.volumeInfo
            return {
              id: item.id,
              selfLink: item.selfLink,
              title: info.title ?? 'Без названия',
              authors: info.authors ?? ['Автор не указан'],
              preview: info.imageLinks?.thumbnail ?? '/placeholder.jpg',
              publishedDate: info.publishedDate ?? '—',
            }
          })
      } catch (err: unknown) {
        if (err instanceof Error) {
          this.error = err.message
        } else if (typeof err === 'object' && err !== null && 'message' in err) {
          this.error = (err as { message: string }).message
        } else {
          this.error = 'Неизвестная ошибка'
        }
      } finally {
        this.loading = false
      }
    },
  },
})
