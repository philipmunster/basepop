import { Button } from "@/components/ui/button"
import { requireUser } from "@/lib/supabase/auth/requireUser"
import { Plus, Building2 } from 'lucide-react'
import Link from 'next/link'
import { LogoutButton } from "@/app/appComponents/LogoutButton"

export default async function OnboardingPage() {
  const user = await requireUser()
  const name: string | undefined = user?.user_metadata?.full_name?.trim().split(" ")[0]

  return (
    <div className="h-full flex flex-col justify-center items-center gap-4 text-center">
      <h1 className="text-5xl font-bold mb-6">Hi {name ? name : ''}, welcome to Basepop</h1>

      <p className="text-lg font-normal text-neutral-600">
        You are currently not a member of any organisation. Please choose what you want to do next:
      </p>

      <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
        <Button asChild><Link href='/platform/onboarding/create-new-org'>Create a new organisation <Plus /></Link></Button>
        <Button variant='outline' asChild><Link href='/platform/onboarding/request-join-org'>Join an existing organisation <Building2 /></Link></Button>
      </div>

      <LogoutButton className="mt-6 cursor-pointer text-neutral-600" variant={'ghost'}/>
    </div>
  )
}