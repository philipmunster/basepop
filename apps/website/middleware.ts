import { type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  return updateSession(request)
}

// remeber to also update /lib/supabase/middleware.ts list
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/settings/:path*',
    '/changelog/:path*', 
    '/dashboard/:path*', 
    '/news/:path*', 
    '/settings/:path*', 
    '/welcome/:path*',
    '/login',
  ],
}