// this "page" doesn't render anything. It just fetches the users activeOrgId and redirects to /platform/[orgId]/home
// after login or sign up user are redirected to this page and then redirected to /platform/[orgId]/home
import { getUserMembershipsCached } from "@/lib/data/orgMemberships"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export default async function RedirectToActiveOrgParam() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const memberships = await getUserMembershipsCached(user.id)
  if (!memberships || memberships.length === 0) {
    redirect('/platform/onboarding')
  }
  const defaultMembershipOrgId = memberships[0]?.org_id

  redirect(`/platform/${defaultMembershipOrgId}/home`)

}