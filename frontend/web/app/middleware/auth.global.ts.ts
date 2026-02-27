// middleware/auth.global.ts
export default defineNuxtRouteMiddleware((to) => {
  const auth = useAuthStore()

  // Se rota não existir ainda (proteção SSR)
  if (!to || !to.path) return

  const publicRoutes = ['/login']

  const isPublic = publicRoutes.includes(to.path)

  // Se não está autenticado e tenta acessar rota privada
  if (!auth.isAuthenticated && !isPublic) {
    return navigateTo('/login')
  
  }  

  // Se está autenticado e tenta acessar login
  if (auth.isAuthenticated && to.path === '/login') {
    return navigateTo('/dashboard')
  }
})