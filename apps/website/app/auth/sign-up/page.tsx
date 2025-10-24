"use client"

import { signup } from './actions'
import { useForm, Controller } from 'react-hook-form'
import { signUpSchema, signUpType } from '@repo/zod/signUp'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"

export default function LoginPage() {
  const form = useForm<signUpType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      orgName: "",
      email: "",
      password: "",
    }
  })

  function onSubmit(data: signUpType) {
    console.log(data)
  }

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Bug Report</CardTitle>
        <CardDescription>
          Help us improve by reporting bugs you encounter.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="firstName" // name of key in formData
              control={form.control} // connect the field to the form defined above
              render={({ field, fieldState }) => (
                // fieldState.invalid is true if data is invalid (used for styling and stuff)
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="first-name">
                    First name
                  </FieldLabel>
                  <Input
                    {...field} // spread value, onChange ect. onto the input
                    id="first-name"
                    aria-invalid={fieldState.invalid}
                    placeholder="Login button not working on mobile"
                    autoComplete="off"
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
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="last-name">
                    Last name
                  </FieldLabel>
                  <Input
                    {...field} // spread value, onChange ect. onto the input
                    id="last-name"
                    aria-invalid={fieldState.invalid}
                    placeholder="Login button not working on mobile"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} /> // if zod validation fails, display the zod error message defined in schema
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit" form="form-rhf-demo">
            Submit
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}

// export default function LoginPage() {
//   return (
//     <form className='flex flex-col gap-2'>

//       <label htmlFor="fullName">Your full name</label>
//       <input className='border w-50' id="fullName" name="fullName" type="text" required />

//       <label htmlFor="email">Email:</label>
//       <input className='border w-50' id="email" name="email" type="email" required />

//       <label htmlFor="password">Password:</label>
//       <input className='border w-50' id="password" name="password" type="password" required />

//       <label htmlFor="orgName">Organisation name</label>
//       <input className='border w-50' id="orgName" name="orgName" type="text" required />
// {/*       
//       <label htmlFor="phone">Phone number</label>
//       <input className='border w-50' id="phone" name="phone" type="tel" required />
      
//       <label htmlFor="howFindUs">How did you hear of us?</label>
//       <input className='border w-50' id="howFindUs" name="howFindUs" type="text" required />
      
//       <label htmlFor="orgName">How many employees are you?</label>
//       <input className='border w-50' id="orgName" name="orgName" type="number" required /> */}

//       <button formAction={signup}>Sign up</button>
//     </form>
//   )
// }