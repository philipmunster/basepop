"use client"

import { signup } from '@/app/auth/sign-up/actions'
import { useForm, Controller } from 'react-hook-form'
import { signUpSchema, signUpType } from '@repo/zod/signUp'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useState } from 'react'
import Link from 'next/link'
import { isRedirectError } from 'next/dist/client/components/redirect-error'


export default function SignUpPage() {
  const [error, setError] = useState<string | undefined>(undefined)

  const form = useForm<signUpType>({
    resolver: zodResolver(signUpSchema),
    criteriaMode: "all",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      orgName: "",
    }
  })

  async function onSubmit(data: signUpType) {
    try {
      await signup(data)
    } catch(err: unknown) {
        if (isRedirectError(err)) { // in order to not display redirect error to users
          throw err
        }
        const message = err instanceof Error ? err.message : 'unexpected error'
        console.warn('Sign-up page', message)
        setError(message)
      }
  }

  return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <div className="flex flex-col items-center gap-1 text-center">
              <h1 className="text-2xl font-bold">Create your account</h1>
              <p className="text-muted-foreground text-sm text-balance">
                Fill in the form below to create your account
              </p>
            </div>
            
            <FieldSet disabled={form.formState.isSubmitting} aria-busy={form.formState.isSubmitting}>
              <div className='flex gap-2'>
                <Controller
                  name="firstName" // name of key in formData
                  control={form.control} // connect the field to the form defined above
                  render={({ field, fieldState }) => (
                    // fieldState.invalid is true if data is invalid (used for styling and stuff)
                    <Field data-invalid={fieldState.invalid} className='w-2/5'>
                      <FieldLabel htmlFor="first-name">
                        First name&#42;
                      </FieldLabel>
                      <Input
                        {...field} // spread value, onChange ect. onto the input
                        id="first-name"
                        aria-invalid={fieldState.invalid}
                        placeholder="Michael"
                        autoComplete="on"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} /> // if zod validation fails, display the zod error message defined in schema
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="lastName" // name of key in formData
                  control={form.control} // connect the field to the form defined above
                  render={({ field, fieldState }) => (
                    // fieldState.invalid is true if data is invalid (used for styling and stuff)
                    <Field data-invalid={fieldState.invalid} className='w-3/5'>
                      <FieldLabel htmlFor="last-name">
                        Last name&#42;
                      </FieldLabel>
                      <Input
                        {...field} // spread value, onChange ect. onto the input
                        id="last-name"
                        aria-invalid={fieldState.invalid}
                        placeholder="Scott"
                        autoComplete="on"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} /> // if zod validation fails, display the zod error message defined in schema
                      )}
                    </Field>
                  )}
                />
              </div>
              <Controller
                name="orgName" // name of key in formData
                control={form.control} // connect the field to the form defined above
                render={({ field, fieldState }) => (
                  // fieldState.invalid is true if data is invalid (used for styling and stuff)
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="org-name">
                      Organisation name&#42;
                    </FieldLabel>
                    <Input
                      {...field} // spread value, onChange ect. onto the input
                      id="org-name"
                      aria-invalid={fieldState.invalid}
                      placeholder="Dunder Mifflin"
                      autoComplete="on"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} /> // if zod validation fails, display the zod error message defined in schema
                    )}
                    <FieldDescription className='text-xs'>This can always be changed later</FieldDescription>
                  </Field>
                )}
              />
              <Controller
                name="email" // name of key in formData
                control={form.control} // connect the field to the form defined above
                render={({ field, fieldState }) => (
                  // fieldState.invalid is true if data is invalid (used for styling and stuff)
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="email">
                      Email&#42;
                    </FieldLabel>
                    <Input
                      {...field} // spread value, onChange ect. onto the input
                      type='email'
                      id="email"
                      aria-invalid={fieldState.invalid}
                      placeholder="mscott@dundermifflin.com"
                      autoComplete="on"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} /> // if zod validation fails, display the zod error message defined in schema
                    )}
                  </Field>
                )}
              />
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
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting 
                  ? 'Loading...'
                  : 'Create account'
                }
              </Button>
              {
                error && <p className='text-red-600 text-sm'>{error}</p>
              }
            </div>
            {/* <FieldSeparator>Or continue with</FieldSeparator> */}
            <Field>
              {/* <Button variant="outline" type="button">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                    fill="currentColor"
                  />
                </svg>
                Sign up with GitHub
              </Button> */}
              <FieldDescription className="px-6 text-center">
                Already have an account? <Link href="/auth/login">Login</Link>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
  )
}