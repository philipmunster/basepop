// this "page" doesn't render anything. It just fetches the users activeOrgId and redirects to /platform/[orgId]/home
// after login or sign up user are redirected to this page and then redirected to /platform/[orgId]/home
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export default async function RedirectToActiveOrgParam() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')
  
  // if there user is not a member of any org then send the user to the /platform/onboarding page

}