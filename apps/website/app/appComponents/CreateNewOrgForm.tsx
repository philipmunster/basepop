"use client"

import { newOrg } from '@/app/platform/onboarding/create-new-org/actions'
import { useForm, Controller } from 'react-hook-form'
import { createOrgSchema, createOrgType } from '@repo/zod/createOrg'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { useState } from 'react'
import { isRedirectError } from 'next/dist/client/components/redirect-error'
import { Rocket } from 'lucide-react'

const describeCompanyOptions = [
  { label: "1-5 people", value: "1-5" },
  { label: "6-20 people", value: "6-20" },
  { label: "21-100 people", value: "21-100" },
  { label: "+100 people", value: "+100" },
] as const

export default function CreateNewOrgForm({ userEmail }: { userEmail: string | null }) {
  const [error, setError] = useState<string | undefined>(undefined)

  const form = useForm<createOrgType>({
    resolver: zodResolver(createOrgSchema),
    defaultValues: {
      orgName: "",
      describeCompany: undefined
    }
  })

  async function onSubmit(data: createOrgType) {
    try {
      await newOrg(data)
    } catch(err: unknown) {
        if (isRedirectError(err)) { // in order to not display redirect error to users
          throw err
        }
        const message = err instanceof Error ? err.message : 'unexpected error'
        console.warn('Create org page', message)
        setError(message)
      }
  }

  return (
    <div className='flex justify-center'>
      <form id="form-rhf-demo" className='w-2/3 max-w-120' onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <div className="flex flex-col items-center gap-1 text-center">
            <h1 className="text-2xl font-bold">Create a new organisation</h1>
            <p className="text-muted-foreground text-sm text-balance">
              Fill in the form below to create a new organisation
            </p>
          </div>
          <FieldSet disabled={form.formState.isSubmitting} aria-busy={form.formState.isSubmitting}>
            <Controller
              name="orgName" // name of key in formData
              control={form.control} // connect the field to the form defined above
              render={({ field, fieldState }) => (
                // fieldState.invalid is true if data is invalid (used for styling and stuff)
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="orgName">
                    Organisation name&#42;
                  </FieldLabel>
                  <Input
                    {...field} // spread value, onChange ect. onto the input
                    type='text'
                    id="orgName"
                    aria-invalid={fieldState.invalid}
                    placeholder="Dunder Mifflin"
                    autoComplete="on"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} /> // if zod validation fails, display the zod error message defined in schema
                  )}
                  <FieldDescription className='text-xs'>You can always change name later</FieldDescription>
                </Field>
              )}
            />
            
            <Controller
              name="describeCompany"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  orientation="responsive"
                  data-invalid={fieldState.invalid}
                >
                  <FieldContent>
                    <FieldLabel htmlFor="describeCompany">
                      What best describes the organisation?&#42;
                    </FieldLabel>

                  </FieldContent>
                  <Select
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      id="describeCompany"
                      aria-invalid={fieldState.invalid}
                      className="min-w-[120px]"
                    >
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="item-aligned">
                      {describeCompanyOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldSet>

          <div className='flex flex-col gap-2'>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting 
              ? 'Loading...'
              : <>Create new organisation <Rocket /></>
            }
          </Button>
            {
              error && <p className='text-red-600 text-sm'>{error}</p>
            }
          </div>
          <Field>
            <FieldDescription className="px-6 text-center">
              {userEmail && (
                `Currently logged in with ${userEmail}`
              )}
            </FieldDescription>
          </Field>
        </FieldGroup>
      </form>
    </div>
  )
}
