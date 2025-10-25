import { createClient } from '@/lib/supabase/server'
import { OrgResolutionError } from '@/lib/errors/classes'

export async function resolveOrgId(userId: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('org_member')
    .select('org_id')
    .eq('user_id', userId)
    .single()
  if (error || !data) throw new OrgResolutionError('You are not a part of any organisation.')
  return data.org_id as string
}