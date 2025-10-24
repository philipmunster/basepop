import * as z from 'zod'

export const signUpSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  orgName: z.string(),
  email: z.string().email(),
  password: z.string().min(12, 'password must be at least 12 characters'),
})

export type signUpType = z.infer<typeof signUpSchema>