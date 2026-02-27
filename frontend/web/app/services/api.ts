// services/api.ts
import { ofetch } from 'ofetch'
import { useAuthStore } from '../stores/auth.store'
import { navigateTo } from '#app'

export const api = ofetch.create({
  baseURL: 'http://localhost:3333',

  onRequest({ options }) {
    const auth = useAuthStore()

    if (auth.token) {
      options.headers = new Headers(options.headers)
      options.headers.set('Authorization', `Bearer ${auth.token}`)
    }
  },

  onResponseError({ response }) {
    if (response.status === 401) {
      const auth = useAuthStore()
      auth.logout()

      navigateTo('/login') // ✅ SEM return
    }
  }
})