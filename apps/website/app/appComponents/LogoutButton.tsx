// components/LogoutButton.tsx
'use client'

import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'

function LogoutMenuItem() {
  const router = useRouter()
  const [pending, start] = useTransition()

  return (
    <DropdownMenuItem
      onClick={() =>
        start(async () => {
          await fetch('/auth/signout', { method: 'POST' })
          router.replace('/login') // the route already redirects, this keeps the UI snappy
        })
      }
      disabled={pending}
    >
      <LogOut />
      {pending ? 'Signing out…' : 'Log out'}
    </DropdownMenuItem>
  )
}

function LogoutButton({ ...props }: { props?: Readonly<React.ReactNode>}) {
  const router = useRouter()
  const [pending, start] = useTransition()

  return (
    <Button
      className='hover:cursor-pointer'
      onClick={() =>
        start(async () => {
          await fetch('/auth/signout', { method: 'POST' })
          router.replace('/login') // the route already redirects, this keeps the UI snappy
        })
      }
      disabled={pending}
      {...props}
    >
      <LogOut />
      {pending ? 'Signing out…' : 'Log out'}
    </Button>
  )
}



export { LogoutMenuItem, LogoutButton }