"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

type Currency = "DKK" | "EUR" | "USD"

export default function CurrencySelector({ initialCurrency = "DKK" }: { initialCurrency?: Currency }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const setCurrency = (currency: Currency) => {
    const params = new URLSearchParams(searchParams)
    params.set("currency", currency)
    // Replace so back button isn’t spammy; keep scroll position
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const activeCurrency = searchParams.get('currency') || initialCurrency

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          {activeCurrency}
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuRadioGroup
          value={activeCurrency}
          onValueChange={(value) => setCurrency(value as Currency)}
        >
          <DropdownMenuRadioItem value="DKK">DKK</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="EUR">EUR</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="USD">USD</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
