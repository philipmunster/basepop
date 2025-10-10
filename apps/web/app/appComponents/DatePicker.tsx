"use client"

import { useState } from "react"
import { ChevronDown, CalendarDays } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { type DateRange } from "react-day-picker"
import DatePickerPresets from '@/app/appComponents/DatePickerPresets'
import { usePathname, useRouter, useSearchParams } from "next/navigation"

const now = new Date()

export default function DatePicker() {
  const [open, setOpen] = useState(false)
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(now.getFullYear(), now.getMonth(), 1),
    to: new Date(now),
  })
  const [activePreset, setActivePreset] = useState('This month to date')
  const [appliedDateRange, setAppliedDateRange] = useState<DateRange | undefined>(dateRange)

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  function pad(n: number) { return n < 10 ? `0${n}` : String(n) }
  function formatYMD(d: Date) {
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
  }

  function updateSearchParams(dateRange: DateRange) {
    const params = new URLSearchParams(searchParams)
    if (dateRange.from && dateRange.to) {
      params.set('dateFrom', formatYMD(dateRange.from))
      params.set('dateTo', formatYMD(dateRange.to))
      router.push(`${pathname}?${params.toString()}`, {scroll: false})
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-68 font-normal flex justify-start"
          >
            <CalendarDays />
            {appliedDateRange 
              ? `${appliedDateRange?.from?.toLocaleDateString('en-GB', {day: '2-digit', month: 'short', year: 'numeric',})} - ${appliedDateRange?.to?.toLocaleDateString('en-GB', {day: '2-digit', month: 'short', year: 'numeric',})}` 
              : "Select date"}
            <ChevronDown className="ml-auto"/>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0 mt-4 flex flex-col" align="end">
          <DatePickerPresets setDateRange={setDateRange} activePreset={activePreset} setActivePreset={setActivePreset}/>
          <Calendar
            mode="range"
            selected={dateRange}
            onSelect={(dateRange) => {
              setDateRange(dateRange)
              setActivePreset(`${dateRange?.from?.toLocaleDateString('en-GB', {day: '2-digit', month: 'short', year: 'numeric',})} - ${dateRange?.to?.toLocaleDateString('en-GB', {day: '2-digit', month: 'short', year: 'numeric',})}`)
            }}
            captionLayout='dropdown'
            showOutsideDays={false}
            endMonth={new Date()}
            disabled={{after: new Date()}}
            excludeDisabled
            className="w-full"
          />
          <Button className="m-2" onClick={() => {
            if (dateRange) {
              setAppliedDateRange(dateRange)
              setOpen(false)
              updateSearchParams(dateRange)
            }
          }}>
            Apply
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  )
}