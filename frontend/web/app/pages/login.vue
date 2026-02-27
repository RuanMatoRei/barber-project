<!-- pages/login.vue -->
<script setup lang="ts">
import { ref } from 'vue'
import { z } from 'zod'
import { useAuthStore } from '@/stores/auth.store'
import { getRouteByRole } from '@/utils/roleRedirect'

const auth = useAuthStore()

const loading = ref(false)
const errorMessage = ref('')

const schema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Mínimo 6 caracteres')
})

const form = ref({
  email: '',
  password: ''
})

async function handleLogin() {
  errorMessage.value = ''

  const result = schema.safeParse(form.value)

  if (!result.success) {
    errorMessage.value = result.error.issues.map(issue => issue.message).join(', ')
    return
  }

  try {
    loading.value = true

    await auth.login(form.value.email, form.value.password)
    

    if (!auth.user) return

    const route = getRouteByRole(auth.user.role as any)

    await navigateTo(route)

  } catch (err: any) {
    errorMessage.value = 'Credenciais inválidas'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <v-card width="400" class="pa-6">
      <v-card-title>Login</v-card-title>

      <v-text-field
        v-model="form.email"
        label="Email"
        type="email"
      />

      <v-text-field
        v-model="form.password"
        label="Senha"
        type="password"
      />

      <v-alert
        v-if="errorMessage"
        type="error"
        class="mb-4"
      >
        {{ errorMessage }}
      </v-alert>

      <v-btn
        block
        color="primary"
        :loading="loading"
        @click="handleLogin"
      >
        Entrar
      </v-btn>
    </v-card>
  </v-container>
</template>