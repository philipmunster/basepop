import { createClient } from '@/lib/supabase/server'
import { AuthError } from '@/lib/errors/classes'
import { cache } from 'react'

export const requireUser = cache( async () => {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new AuthError('Your user credentials could not be found')
  return user
})