import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { Button } from "@/components/ui/button"
import { ArrowUpRightIcon, BugIcon } from "lucide-react"
import Link from 'next/link'
import { LogoutButton } from '@/app/appComponents/LogoutButton'

export default function ErrorCard({ children }: 
  { children: Readonly<React.ReactNode>}) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon" className="bg-destructive/10 text-destructive">
            <BugIcon />
          </EmptyMedia>
          <EmptyTitle>Oooops... An unexpected error ocurred</EmptyTitle>
          <EmptyDescription>
            <p>An error with the following message ocurred: <span className="font-semibold">{children}.</span></p>
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <div className="flex gap-2">
            <LogoutButton />
            <Button variant="outline"><Link href='/welcome'>Go to front page</Link></Button>
          </div>
        </EmptyContent>
        <EmptyDescription>
          <p className="max-w-90">If the error persists, please contact support.</p>
        </EmptyDescription>
        <Button
          variant="link"
          asChild
          className="text-muted-foreground"
          size="sm"
        >
          <Link href="#">
            Contact support <ArrowUpRightIcon />
          </Link>
        </Button>
      </Empty>
    )
}