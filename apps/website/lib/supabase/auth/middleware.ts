import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { getUserMembershipsCached } from '@/lib/data/orgMemberships'

// Add (or adjust) protected route prefixes here.
// remember to also update middleware.ts list in root
const PROTECTED_PREFIXES = ['/platform']

function isProtectedPath(pathname: string) {
  return PROTECTED_PREFIXES.some(p => pathname === p || pathname.startsWith(p + '/'))
}

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // MUST keep this call directly after client creation
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const pathname = request.nextUrl.pathname
  const protectedRoute = isProtectedPath(pathname)

  // If user is logged in and hitting /login, send them to a default app page.
  if (user && pathname === '/auth/login') {
    const url = request.nextUrl.clone()
    url.pathname = '/platform'
    const redirect = NextResponse.redirect(url)
    // preserve cookies from supabaseResponse
    supabaseResponse.cookies.getAll().forEach(c =>
      redirect.cookies.set(c)
    )
    return redirect
  }

  // If route is protected and no user: redirect to login (include redirect param)
  if (protectedRoute && !user) {
    const url = request.nextUrl.clone()
    url.pathname = '/auth/login'
    url.searchParams.set('redirect', pathname + request.nextUrl.search)
    const redirect = NextResponse.redirect(url)
    supabaseResponse.cookies.getAll().forEach(c =>
      redirect.cookies.set(c)
    )
    return redirect
  }

  //If route is protected, user is logged in and the route is not the onboarding route, but no memberships: redirect to onboarding
  // if (protectedRoute && user && !pathname.startsWith('/platform/onboarding')) {
  //   try {
  //     const memberships = await getUserMembershipsCached(user.id)
  //     if (!memberships || memberships.length === 0) {
  //       const url = request.nextUrl.clone()
  //       url.pathname = '/platform/onboarding'
  //       const redirect = NextResponse.redirect(url)
  //       supabaseResponse.cookies.getAll().forEach(c => redirect.cookies.set(c))
  //       return redirect
  //     }
  //   } catch (error) {
  //     // Handle DB errors gracefully (e.g., redirect to login or error page)
  //     console.error('Membership check failed in middleware:', error)
  //     const url = request.nextUrl.clone()
  //     url.pathname = '/auth/error'
  //     const redirect = NextResponse.redirect(url)
  //     supabaseResponse.cookies.getAll().forEach(c => redirect.cookies.set(c))
  //     return redirect
  //   }
  // }

  // Non-protected or authenticated protected route: proceed
  return supabaseResponse
}