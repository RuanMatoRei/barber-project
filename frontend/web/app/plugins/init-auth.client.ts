// plugins/init-auth.client.ts
import { useAuthStore } from '../stores/auth.store'

export default defineNuxtPlugin(() => {
    const auth = useAuthStore()
    auth.loadFromStorage()
})

