'use server'

import { ValidationError } from '@/lib/errors/classes'
import { createClient } from '@/lib/supabase/server'
import { emailSchema, type emailType } from '@repo/zod/email'

export async function forgotPassword(data: emailType) {

  const parsed = emailSchema.safeParse(data)
  if (!parsed.success) {
    throw new ValidationError('Your email is not correct', parsed.error.format())
  }

  const parsedData = parsed.data
  const cleanedEmail = parsedData.email.trim().toLocaleLowerCase()

  const supabase = await createClient()

  const { error } = await supabase.auth.resetPasswordForEmail(cleanedEmail, {
    redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/update-password`, // the email link redirects to the update password page
  })

  if (error) {
    throw error
  }

}