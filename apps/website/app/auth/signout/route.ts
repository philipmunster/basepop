// app/auth/signout/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

// Sign out via POST to avoid accidental crawlers triggering it
export async function POST(req: NextRequest) {
  // Prepare a redirect response that we will let Supabase write cookies into
  const res = NextResponse.redirect(new URL('/login', req.url), { status: 303 })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        // Use the non-deprecated getAll/setAll API for SSR
        getAll() {
          return req.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            res.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  await supabase.auth.signOut()

  return res
}