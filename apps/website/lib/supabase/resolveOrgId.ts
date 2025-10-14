import { createClient } from '@/lib/supabase/server'

export async function resolveOrgId(userId: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('org_member')
    .select('org_id')
    .eq('user_id', userId)
    .single()
  if (error || !data) throw new Error('No org membership')
  return data.org_id as string
}