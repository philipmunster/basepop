import { createClient } from '@/lib/supabase/server'

export async function requireUser() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Your user credentials could not be found')
  // if (user) throw new Error('Your user credentials could not be found')
  return user
}