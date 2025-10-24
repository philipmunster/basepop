import * as z from 'zod'

const personalEmailDomains = [
  "gmail.com",
  "yahoo.com",
  "outlook.com",
  "hotmail.com",
  "icloud.com",
  "live.com",
  "aol.com",
  "protonmail.com",
  "pm.me",
]

export const signUpSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  orgName: z.string().min(1, "Organization name is required"),
  email: 
    z.string()
    .email("Invalid email")
    .refine((val) => {
      const domain = val.split("@")[1]?.toLowerCase()
      return domain && !personalEmailDomains.includes(domain)
    }, "Please use your work email (not a personal address)"),
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

export type signUpType = z.infer<typeof signUpSchema>