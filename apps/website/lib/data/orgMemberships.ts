import { unstable_cache } from 'next/cache'
import { DataFetchError } from '@/lib/errors/classes';
import { createClient } from '@/lib/supabase/server';
import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '@repo/db'

type UserMembershipRow = Database['public']['Views']['user_memberships']['Row']

export async function getUserMemberships(userId: string, supabase: SupabaseClient): Promise<UserMembershipRow[]> {
  try {
    const { error, data } = await supabase.from('user_memberships').select("*").eq('user_id', userId)

    if (error) {
      console.log(error)
      throw error
    }

    return data

  } catch (e) { // if an actual connection error with the DB ocurred
    throw new DataFetchError('Error fetching org memeberships data', {
      cause: e,
      meta: {
        userId
      }
    })
  }
}

export async function getUserMembershipsCached(userId: string): Promise<UserMembershipRow[]> {
  const supabase = await createClient()
  const keyparts = [
    'getUserMemberships',
    userId,
  ]

  const cachedFn = unstable_cache(
    async () => getUserMemberships(userId, supabase),
    keyparts,
    {
      tags: ['getUserMemberships', `getUserMemberships:userId:${userId}`],
    }
  )

  const isDev = process.env.NODE_ENV === 'development'

  if (isDev) {
    return getUserMemberships(userId, supabase)
  } else {
    return cachedFn()
  }
}
