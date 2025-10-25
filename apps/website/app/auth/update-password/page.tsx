"use client"

import { useForm, Controller } from 'react-hook-form'
import { passwordSchema, passwordType } from '@repo/zod/password'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { ValidationError } from '@/lib/errors/classes'


export default function UpdatePasswordPage() {
  const [error, setError] = useState<string | undefined>(undefined)
  const [submitted, setSubmitted] = useState<boolean>(false)

  const form = useForm<passwordType>({
    resolver: zodResolver(passwordSchema),
    criteriaMode: "all",
    defaultValues: {
      password: "",
      confirmPassword: ""
    }
  })
  
  async function onSubmit(data: passwordType) {
    const supabase = createClient()
    setError(undefined)
    setSubmitted(false)
    try {
      // await updatePassword(data)
      const parsed = passwordSchema.safeParse(data)
      if (!parsed.success) {
        throw new ValidationError('Password is invalid', parsed.error.format())
      }
      const parsedPassword = parsed.data.password

      const { error } = await supabase.auth.updateUser({ password: parsedPassword })
      if (error) throw error
      setSubmitted(true)
    } catch(err: unknown) {
      const message = err instanceof Error ? err.message : 'unexpected error'
      console.warn('Update password page', message)
      setError(message)
    }
  }
  
  const success = submitted && !error


  if (!success) {
    return (
      <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <div className="flex flex-col items-center gap-1 text-center">
            <h1 className="text-2xl font-bold">Choose your new password</h1>
            <p className="text-muted-foreground text-sm">
              Type in your new password to update it
            </p>
          </div>
          <FieldSet disabled={form.formState.isSubmitting} aria-busy={form.formState.isSubmitting}>            
            <Controller
              name="password" // name of key in formData
              control={form.control} // connect the field to the form defined above
              render={({ field, fieldState }) => (
                // fieldState.invalid is true if data is invalid (used for styling and stuff)
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="password">
                    Password&#42;
                  </FieldLabel>
                  <Input
                    {...field} // spread value, onChange ect. onto the input
                    type='password'
                    id="password"
                    aria-invalid={fieldState.invalid}
                    placeholder=""
                    autoComplete="off"
                  />
                  {fieldState.error && 
                    <div>
                      {fieldState.error.types && 
                        Object.values(fieldState.error.types).map((message, index) => {
                          if (typeof message === 'object') {
                            const messageListElement = message.map( (messageItem, indexItem) => {
                              return <li key={indexItem} className='text-sm text-red-600 ml-3'>{messageItem}</li>
                            })
                            return messageListElement
                          } else {
                            return <li key={index} className='text-sm text-red-600 ml-3'>{String(message)}</li>
                          }
                        })
                      }
                    </div>
                  }
                </Field>
              )}
            />
            <Controller
              name="confirmPassword" // name of key in formData
              control={form.control} // connect the field to the form defined above
              render={({ field, fieldState }) => (
                // fieldState.invalid is true if data is invalid (used for styling and stuff)
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="confirmPassword">
                    Confirm password&#42;
                  </FieldLabel>
                  <Input
                    {...field} // spread value, onChange ect. onto the input
                    type='password'
                    id="confirmPassword"
                    aria-invalid={fieldState.invalid}
                    placeholder=""
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} /> // if zod validation fails, display the zod error message defined in schema
                  )}
                </Field>
              )}
            />
          </FieldSet>
  
          <div className='flex flex-col gap-2'>
            <Field>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting 
                  ? 'Loading...'
                  : 'Reset password'
                }
              </Button>
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
        <h1 className="text-2xl font-bold">Password successfully updated!</h1>
        <p className="text-muted-foreground text-sm text-balance">
          You can now continue using Basepop, and the next time you have to login you can use your new password.
        </p>
        <Link href='/welcome'>
          <Button className='mt-8'>
            Go to Basepop<ArrowRight />
          </Button>
        </Link>
      </div>
    )
  }
}