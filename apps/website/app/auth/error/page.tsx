'use client'

import { useSearchParams } from "next/navigation"

const errorExplained: Record<string, string> = {
  weak_password: 'Your password is not strong enough. Please try again',
  email_address_invalid: 'Your email address is not valid. Please use a vaild email.',
  otp_expired: 'This link has expired. Please request a new confirmation link.'
}

export default function ErrorPage() {
  const searchParams = useSearchParams()
  const reason = searchParams.get('reason') as string || undefined

  // use the error.code === "weak_password" to render UI errors or "email_address_invalid"

  if (reason) {
    const explanation = errorExplained[reason] || undefined
    return (
      <p>You couldn't create a user for the following reason: {explanation ? explanation : reason}</p>
    )
  } else {
    return <p>Sorry, something unexpected went wrong. Please try again or contact support</p>
  }

}