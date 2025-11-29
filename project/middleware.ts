import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Este middleware se ejecuta en cada request
// Puede ser usado para autenticación, logging, etc.
export function middleware(request: NextRequest) {
  // Ejemplo: Agregar headers personalizados
  const response = NextResponse.next()
  
  return response
}

// Configurar en qué rutas se ejecuta el middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}

