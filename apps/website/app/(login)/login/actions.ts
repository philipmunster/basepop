'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { createClient } from '@/lib/supabase/server'
import { createUserSchema } from '@repo/zod/createUser'

export async function login(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/auth/error')
  }
  // clear any cached version of /welcome so the next user gets a fresh render with updated session state (e.g., logged-in user info).
  revalidatePath('/welcome/', 'layout')
  redirect('/welcome/')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    options: {
      data: {
        full_name: formData.get('fullName') as string,
      }
    }
  }

  // signs up a user, that then gets a confirmation email, clicks confirm and lands on /auth/confirm route
  const { error } = await supabase.auth.signUp(data)
  if (error) { // use the error.code === "weak_password" to render UI errors or "email_address_invalid"
    redirect(`/auth/error?reason=${error.code}`)
  }

  // if no errors in signup then set the orgName in cookies
  const orgName = formData.get('orgName') as string || 'My Organisation'
  const cookieStore = await cookies()
  cookieStore.set('pending_orgName', orgName, { maxAge: 60 * 60 * 2})  

  // clear any cached version of /welcome so the next user gets a fresh render with updated session state (e.g., logged-in user info).
  revalidatePath('/welcome/', 'layout')
  redirect('/auth/check-email/')
}