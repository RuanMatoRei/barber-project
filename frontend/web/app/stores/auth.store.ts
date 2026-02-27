// stores/auth.store.ts
import { defineStore } from 'pinia'

interface User {
  id: string
  email: string
  role: 'USER' | 'BARBER' | 'ADMIN'
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    token: null as string | null
  }),

  getters: {
    isAuthenticated: (state) => !!state.token
  },

  actions: {
    async login(email: string, password: string) {
      const config = useRuntimeConfig()

      const response: any = await $fetch(`${config.public.apiBase}/auth/login`, {
        method: 'POST',
        body: { email, password }
      })

      this.token = response.token
      this.user = response.user

      localStorage.setItem('token', response.token)
    },

    loadFromStorage() {
      if (!process.client) return

      const token = localStorage.getItem('token')
      const user = localStorage.getItem('user')

      if (token) this.token = token
      if (user) this.user = JSON.parse(user)
    },

    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('token')
    }
  }
})