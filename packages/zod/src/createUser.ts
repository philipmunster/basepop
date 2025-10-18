import * as z from 'zod'

export const createUserSchema = z.object({
  fullName: z.string(),
  email: z.string().email(),
  password: z.string(),
  orgName: z.string()
})