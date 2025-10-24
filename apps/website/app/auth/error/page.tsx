import ErrorCard from "@/app/appComponents/ErrorCard"

const errorExplained: Record<string, string> = {
  weak_password: 'Your password is not strong enough. Please try again',
  email_address_invalid: 'Your email address is not valid. Please use a vaild email',
  otp_expired: 'This link has expired. Please request a new confirmation link'
}

export default async function ErrorPage({ searchParams }: { searchParams: Promise<{ reason: string }>}) {
  const params = await searchParams
  const reason = errorExplained[params.reason] || 'An unexpected error ocurred'

  return (
    <ErrorCard>
      {reason}
    </ErrorCard>
  )

  // if (reason) {
  //   const explanation = errorExplained[reason] || undefined
  //   return (
  //     <p>You couldn't create a user for the following reason: {explanation ? explanation : reason}</p>
  //   )
  // } else {
  //   return <p>Sorry, something unexpected went wrong. Please try again or contact support</p>
  // }

}