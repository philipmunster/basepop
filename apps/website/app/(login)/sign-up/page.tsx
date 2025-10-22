import { signup } from '../actions'

export default function LoginPage() {
  return (
    <form className='flex flex-col gap-2'>

      <label htmlFor="fullName">Your full name</label>
      <input className='border w-50' id="fullName" name="fullName" type="text" required />

      <label htmlFor="email">Email:</label>
      <input className='border w-50' id="email" name="email" type="email" required />

      <label htmlFor="password">Password:</label>
      <input className='border w-50' id="password" name="password" type="password" required />

      <label htmlFor="orgName">Organisation name</label>
      <input className='border w-50' id="orgName" name="orgName" type="text" required />
{/*       
      <label htmlFor="phone">Phone number</label>
      <input className='border w-50' id="phone" name="phone" type="tel" required />
      
      <label htmlFor="howFindUs">How did you hear of us?</label>
      <input className='border w-50' id="howFindUs" name="howFindUs" type="text" required />
      
      <label htmlFor="orgName">How many employees are you?</label>
      <input className='border w-50' id="orgName" name="orgName" type="number" required /> */}

      <button formAction={signup}>Sign up</button>
    </form>
  )
}