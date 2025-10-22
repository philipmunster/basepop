import { type EmailOtpType } from '@supabase/supabase-js'
import { type NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { createNewUser } from '@/lib/data/createNewUser'

// the confirmation email has a confirm link
// the link sends users to this api endpoint(/auth/confirm)
// the link has auth data in the search params
// they are then verified
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type') as EmailOtpType | null
  const next = searchParams.get('next') ?? '/welcome'

  if (token_hash && type) {
    const supabase = await createClient()

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    })
    if (error) {
      redirect(`/auth/error?reason=${error.code}`)
    }

    // get user from auth table
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      redirect(`/auth/error?reason=user_not_found`)
    }

    // get orgName from cookie
    const cookieStore = await cookies()
    const orgName = cookieStore.get('pending_org')?.value ?? 'My organisation'

    console.log(user)
    // fill the DB for the new user i.e. user row, org row, org member row, user settings row and org settings row
    await createNewUser(user.id, user.user_metadata.full_name, user.user_metadata.email, orgName)

    cookieStore.delete('pending_org')

    // redirect to the 'next' url which is coming from the confirmation link search param
    redirect(next)
  }

  // if no token and type redirect to error page
  redirect(`/auth/error/`)
}