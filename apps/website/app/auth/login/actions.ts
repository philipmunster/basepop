'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { loginSchema, loginType } from '@repo/zod/login'
import { ValidationError } from '@/lib/errors/classes'

export async function login(data: loginType) {

  const supabase = await createClient()

  const parsed = loginSchema.safeParse(data)
  if (!parsed.success) {
    throw new ValidationError('Your email or password is not correct', parsed.error.format())
  }

  const parsedData = parsed.data
  const cleanedEmail = parsedData.email.trim().toLocaleLowerCase()

  const authData = {
    email: cleanedEmail,
    password: parsedData.password,
  }

  const { error } = await supabase.auth.signInWithPassword(authData)

  if (error) {
    throw error
  }
  // clear any cached version of /home so the next user gets a fresh render with updated session state (e.g., logged-in user info).
  revalidatePath('/home/', 'layout')
  redirect('/home/')
}