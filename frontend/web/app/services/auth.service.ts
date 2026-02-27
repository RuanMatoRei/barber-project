// services/auth.service.ts

import { api } from '../services/api'

interface LoginPayload {
  email: string
  password: string
}

export interface LoginResponse {
  token: string
  user: {
    id: string
    name: string
    role: string
  }
}

export async function loginRequest(
  payload: LoginPayload
) {
  return api<LoginResponse>('/sessions', {
    method: 'POST',
    body: payload
  })
}