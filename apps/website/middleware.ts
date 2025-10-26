import { type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/auth/middleware'

export async function middleware(request: NextRequest) {
  return updateSession(request)
}

// remember to also update /lib/supabase/auth/middleware.ts list
export const config = {
  matcher: [
    '/platform/:path*',
    '/auth/login'
  ],
}