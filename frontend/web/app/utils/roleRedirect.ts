export function getRouteByRole(role: string) {
  const routes: Record<string, string> = {
    USER: '/dashboard',
    BARBER: '/barber',
    ADMIN: '/admin'
  }

  return routes[role.toUpperCase()] || '/dashboard'
}