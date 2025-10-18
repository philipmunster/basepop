import { login, signup } from './actions'

export default function LoginPage() {
  return (
    <form>
      <label htmlFor="fullName">Your full name</label>
      <input id="fullName" name="fullName" type="text" required />
      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" required />
      <label htmlFor="password">Password:</label>
      <input id="password" name="password" type="password" required />
      <label htmlFor="orgName">Organisation name</label>
      <input id="orgName" name="orgName" type="text" required />
      <button formAction={login}>Log in</button>
      <button formAction={signup}>Sign up</button>
    </form>
  )
}