import { Button } from '@/components/ui/button'

export default function HomePage() {
  return (
      <div className="flex flex-col gap-2">
        <h1>Im the frontpage</h1>
        <div className='flex gap-2 m-5'>
          <a href="/auth/login"><Button>Login</Button></a>
          <a href="/auth/sign-up"><Button>Sign-up</Button></a>
          <a href="/auth/forgot-password"><Button>Forgot password</Button></a>
          <a href="/auth/update-password"><Button>Update password</Button></a>
          <a href="/auth/sign-up-success"><Button>Sign up success</Button></a>
        </div>
      </div>
  );
}
