import * as z from 'zod'

export const emailSchema = z.object({
  email: z.string().email()
})

export type emailType = z.infer<typeof emailSchema>