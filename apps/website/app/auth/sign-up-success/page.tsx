import Link from 'next/link'

export default function Page() {
  return (
    <div className="flex flex-col items-center gap-1 text-center">
      <h1 className="text-2xl font-bold">Thank you for signing up!</h1>
      <p className="text-muted-foreground text-sm text-balance">
        Check your email for a confirmation link to continue. Remember to check your spam folder.
      </p>
      <p className="mt-4 text-muted-foreground text-xs">
        If the email belongs to an already existing user no confirmation email will be sent. 
        You should <Link className='underline font-semibold' href='/auth/login'>login</Link> instead or <Link className='underline font-semibold' href='/auth/forgot-password'>reset your password</Link> if you forgot it.
      </p>
    </div>
  )
}
