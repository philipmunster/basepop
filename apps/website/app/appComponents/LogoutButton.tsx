// components/LogoutButton.tsx
'use client'

import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { LogOut } from 'lucide-react'

export default function LogoutButton() {
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