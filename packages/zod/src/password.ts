import * as z from 'zod'

export const passwordSchema = z.object({
  password: 
    z.string()
    .min(8, "Must be at least 8 characters long")
    .regex(/[a-z]/, "Must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[0-9]/, "Must contain at least one digit")
    .regex(/[^A-Za-z0-9]/, "Must contain at least one special character"),
  confirmPassword: z.string(),
}).refine( (data) => data.password === data.confirmPassword, {
  message: "Passwords must match", // error message shown to the user
  path: ["confirmPassword"] // the field where the error will be shown
})

export type passwordType = z.infer<typeof passwordSchema>