import { createPinia } from 'pinia'
import { createApp } from 'vue'

import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import App from './App.vue'
import router from './router'

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#eae0e0ff',
          secondary: '#13ae68ff',
        },
      },
    },
  },
})
const app = createApp(App)

app.use(createPinia()).use(router).use(vuetify)

app.mount('#app')
