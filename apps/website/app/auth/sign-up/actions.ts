'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { createClient } from '@/lib/supabase/server'
import { signUpSchema, signUpType } from '@repo/zod/signUp'
import { ValidationError } from '@/lib/errors/classes'

export async function signup(data: signUpType) {
  const supabase = await createClient()

  const parsed = signUpSchema.safeParse(data)
  if (!parsed.success) {
    throw new ValidationError('Invalid data filters', parsed.error.format())
  }

  const parsedData = parsed.data
  const cleanedEmail = parsedData.email.trim().toLocaleLowerCase()

  const authData = {
    email: cleanedEmail as string,
    password: parsedData.password as string,
    options: {
      data: {
        full_name: parsedData.firstName + ' ' + parsedData.lastName as string,
      }
    }
  }
  
  // signs up a user, that then gets a confirmation email, clicks confirm and lands on /auth/confirm route
  const { error } = await supabase.auth.signUp(authData)

  if (error) {
    throw error
  }

  // if no errors in signup then set the orgName in cookies
  const cookieStore = await cookies()
  cookieStore.set('pending_orgName', parsedData.orgName, { maxAge: 60 * 60 * 2})  

  // clear any cached version of /home so the next user gets a fresh render with updated session state (e.g., logged-in user info).
  revalidatePath('/home/', 'layout')
  redirect('/auth/sign-up-success/')
}