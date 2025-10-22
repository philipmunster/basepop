import { login } from '../actions'

export default function LoginPage() {
  return (
    <form className='flex flex-col gap-2'>
      <label htmlFor="email">Email:</label>
      <input className='border w-50' id="email" name="email" type="email" required />
      <label htmlFor="password">Password:</label>
      <input className='border w-50' id="password" name="password" type="password" required />

      <button formAction={login}>Log in</button>
    </form>
  )
}