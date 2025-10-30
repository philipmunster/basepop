'use server'

import { ValidationError } from '@/lib/errors/classes'
import { requireUser } from '@/lib/supabase/auth/requireUser'
import { createOrgSchema, type createOrgType } from '@repo/zod/createOrg'
import { createNewOrg } from '@/lib/data/createNewOrg'

export async function newOrg(data: createOrgType) {
  const user = await requireUser()
  const cleanedEmail = user.email?.trim().toLocaleLowerCase()

  const parsed = createOrgSchema.safeParse(data)
  if (!parsed.success) {
    throw new ValidationError('Invalid data filters', parsed.error.format())
  }

  await createNewOrg(user.id, cleanedEmail, parsed.data.orgName, parsed.data.describeCompany)
}