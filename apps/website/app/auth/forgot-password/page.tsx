"use client"

import { forgotPassword } from '@/app/auth/forgot-password/actions'
import { useForm, Controller } from 'react-hook-form'
import { emailSchema, emailType } from '@repo/zod/email'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useState } from 'react'


export default function ForgotPasswordPage() {
  const [error, setError] = useState<string | undefined>(undefined)
  const [submitted, setSubmitted] = useState<boolean>(false)

  
  const form = useForm<emailType>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    }
  })
  
  async function onSubmit(data: emailType) {
    setError(undefined)
    setSubmitted(false)
    try {
      await forgotPassword(data)
      setSubmitted(true)
    } catch(err: unknown) {
      const message = err instanceof Error ? err.message : 'unexpected error'
      console.warn('Password page', message)
      setError(message)
    }
  }
  
  const success = submitted && !error


  if (!success) {
    return (
      <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <div className="flex flex-col items-center gap-1 text-center">
            <h1 className="text-2xl font-bold">Reset your password</h1>
            <p className="text-muted-foreground text-sm">
              Type in your email and we&apos;ll send you a link to reset your password
            </p>
          </div>
          <Controller
            name="email" // name of key in formData
            control={form.control} // connect the field to the form defined above
            render={({ field, fieldState }) => (
              // fieldState.invalid is true if data is invalid (used for styling and stuff)
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="email">
                  Email
                </FieldLabel>
                <Input
                  {...field} // spread value, onChange ect. onto the input
                  type='email'
                  id="email"
                  aria-invalid={fieldState.invalid}
                  placeholder="example@company.com"
                  autoComplete="on"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} /> // if zod validation fails, display the zod error message defined in schema
                )}
              </Field>
            )}
          />
  
          <div className='flex flex-col gap-2'>
            <Field>
              <Button type="submit">Reset password</Button>
            </Field>
            {
              error && <p className='text-red-600 text-sm text-center'>{error}</p>
            }
          </div>
        </FieldGroup>
      </form>
    )
  } else {
    return (
      <div className="flex flex-col items-center gap-1 text-center">
        <h1 className="text-2xl font-bold">An email has been sent</h1>
        <p className="text-muted-foreground text-sm">
          If you registered using your email and password, you will receive a password reset email now.
        </p>
      </div>
    )
  }
}