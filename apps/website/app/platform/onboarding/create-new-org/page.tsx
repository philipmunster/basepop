import CreateNewOrgForm from '@/app/appComponents/CreateNewOrgForm'
import { requireUser } from '@/lib/supabase/auth/requireUser'

export default async function Page() {
  const user = await requireUser()

  return <CreateNewOrgForm userEmail={user?.email ?? null} />
}