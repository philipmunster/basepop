import * as z from 'zod'

export const createOrgSchema = z.object({
  orgName: z.string().min(1, "Please select a name for your organisation"),
  describeCompany: z.enum(['1-5', '6-20', '21-100', '+100'])
})

export type createOrgType = z.infer<typeof createOrgSchema>