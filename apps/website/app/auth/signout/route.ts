// app/auth/signout/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
// Sign out via POST to avoid accidental crawlers triggering it
export async function POST(req: NextRequest) {

  const supabase = await createClient()

  await supabase.auth.signOut()

  redirect('/auth/login')
}