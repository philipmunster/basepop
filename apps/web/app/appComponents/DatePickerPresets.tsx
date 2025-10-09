import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { type DateRange } from "react-day-picker"

const now = new Date();

// --- helpers ---
const clone = (d: Date) => new Date(d.getTime());
const startOfDay = (d: Date) => { const x = clone(d); x.setHours(0,0,0,0); return x; };
const endOfDay   = (d: Date) => { const x = clone(d); x.setHours(23,59,59,999); return x; };
const addDays    = (d: Date, n: number) => { const x = clone(d); x.setDate(x.getDate() + n); return x; };
const addMonths  = (d: Date, n: number) => { const x = clone(d); x.setMonth(x.getMonth() + n); return x; };
const addYears   = (d: Date, n: number) => { const x = clone(d); x.setFullYear(x.getFullYear() + n); return x; };

const startOfWeek = (d: Date, weekStartsOn = 1 /* Mon */) => {
  const x = startOfDay(d);
  const day = x.getDay(); // 0 Sun … 6 Sat
  const diff = (day === 0 ? 7 : day) - weekStartsOn; // 1..7 -> 0..6
  return addDays(x, -diff);
};
const endOfWeek = (d: Date, weekStartsOn = 1) => endOfDay(addDays(startOfWeek(d, weekStartsOn), 6));

const startOfMonth = (d: Date) => startOfDay(new Date(d.getFullYear(), d.getMonth(), 1));
const endOfMonth   = (d: Date) => endOfDay(new Date(d.getFullYear(), d.getMonth() + 1, 0));

const quarterIndex = (d: Date) => Math.floor(d.getMonth() / 3); // 0..3
const startOfQuarter = (d: Date) => {
  const q = quarterIndex(d);
  return startOfDay(new Date(d.getFullYear(), q * 3, 1));
};
const endOfQuarter = (d: Date) => endOfDay(new Date(d.getFullYear(), quarterIndex(d) * 3 + 3, 0));

const startOfYear = (d: Date) => startOfDay(new Date(d.getFullYear(), 0, 1));
const endOfYear   = (d: Date) => endOfDay(new Date(d.getFullYear(), 11, 31));

// convenience anchors
const today = startOfDay(now);
const yesterday = addDays(today, -1);
const yesterdayLastYear = addYears(yesterday, -1);

// --- presets ---
const presetOptions = [
  {
    label: 'Yesterday',
    dateRange: {
      from: startOfDay(yesterday),
      to: endOfDay(yesterday),
    },
  },
  {
    label: 'Week',
    subs: [
      {
        subLabel: 'This week to yesterday',
        subDateRange: {
          from: startOfWeek(now),
          to: endOfDay(yesterday),
        },
      },
      {
        subLabel: 'Last week',
        subDateRange: {
          from: startOfWeek(addDays(now, -7)),
          to: endOfWeek(addDays(now, -7)),
        },
      },
      {
        subLabel: '2 weeks ago',
        subDateRange: {
          from: startOfWeek(addDays(now, -14)),
          to: endOfWeek(addDays(now, -14)),
        },
      },
      {
        subLabel: 'This week last year',
        subDateRange: {
          from: startOfWeek(addYears(now, -1)),
          to: endOfWeek(addYears(now, -1)),
        },
      },
      {
        subLabel: 'This week to yesterday last year',
        subDateRange: {
          from: startOfWeek(yesterdayLastYear),
          to: endOfDay(yesterdayLastYear),
        },
      },
    ],
  },
  {
    label: 'Month',
    subs: [
      {
        subLabel: 'This month to yesterday',
        subDateRange: {
          from: startOfMonth(now),
          to: endOfDay(yesterday),
        },
      },
      {
        subLabel: 'Last month',
        subDateRange: {
          from: startOfMonth(addMonths(now, -1)),
          to: endOfMonth(addMonths(now, -1)),
        },
      },
      {
        subLabel: '2 months ago',
        subDateRange: {
          from: startOfMonth(addMonths(now, -2)),
          to: endOfMonth(addMonths(now, -2)),
        },
      },
      {
        subLabel: 'This month last year',
        subDateRange: {
          from: startOfMonth(addYears(now, -1)),
          to: endOfMonth(addYears(now, -1)),
        },
      },
      {
        subLabel: 'This month to yesterday last year',
        subDateRange: {
          from: startOfMonth(addYears(now, -1)),
          to: endOfDay(addYears(yesterday, -1)),
        },
      },
    ],
  },
  {
    label: 'Quarter',
    subs: [
      {
        subLabel: 'This quarter to yesterday',
        subDateRange: {
          from: startOfQuarter(now),
          to: endOfDay(yesterday),
        },
      },
      {
        subLabel: 'Last quarter',
        subDateRange: {
          from: startOfQuarter(addMonths(now, -3)),
          to: endOfQuarter(addMonths(now, -3)),
        },
      },
      {
        subLabel: '2 quarters ago',
        subDateRange: {
          from: startOfQuarter(addMonths(now, -6)),
          to: endOfQuarter(addMonths(now, -6)),
        },
      },
      {
        subLabel: 'This quarter last year',
        subDateRange: {
          from: startOfQuarter(addYears(now, -1)),
          to: endOfQuarter(addYears(now, -1)),
        },
      },
      {
        subLabel: 'This quarter to yesterday last year',
        subDateRange: {
          from: startOfQuarter(addYears(now, -1)),
          to: endOfDay(addYears(yesterday, -1)),
        },
      },
    ],
  },
  {
    label: 'Year',
    subs: [
      {
        subLabel: 'This year to yesterday',
        subDateRange: {
          from: startOfYear(now),
          to: endOfDay(yesterday),
        },
      },
      {
        subLabel: 'Last year',
        subDateRange: {
          from: startOfYear(addYears(now, -1)),
          to: endOfYear(addYears(now, -1)),
        },
      },
      {
        subLabel: '2 years ago',
        subDateRange: {
          from: startOfYear(addYears(now, -2)),
          to: endOfYear(addYears(now, -2)),
        },
      },
      {
        subLabel: 'Last year to yesterday',
        subDateRange: {
          from: startOfYear(addYears(now, -1)),
          to: endOfDay(addYears(yesterday, -1)),
        },
      },
    ],
  },
];

export default function DatePickerPresets({ activePreset, setActivePreset, setDateRange }: {
  activePreset: string
  setActivePreset: React.Dispatch<React.SetStateAction<string>>;
  setDateRange: React.Dispatch<React.SetStateAction<DateRange | undefined>>
}) {
  return (
    <div className="p-2 flex flex-col gap-1 w-full bg-accent">
      <DropdownMenu>
        <DropdownMenuTrigger className='flex items-center gap-2' asChild>
          <Button variant='outline' className="text-xs w-full flex justify-between">
            {activePreset}
            <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {presetOptions.map((option) => {
            if (option.dateRange) {
              return (
                <DropdownMenuCheckboxItem key={option.label} className="text-xs" checked={activePreset === option.label} onCheckedChange={() => {
                  setActivePreset(option.label) 
                  setDateRange(option.dateRange)
                }}
                >
                  {option.label}
                </DropdownMenuCheckboxItem>
              )
            } else {
              return (
                <DropdownMenuGroup key={option.label}>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger className="text-xs">
                      {option.label}
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        {option?.subs?.map((subOption) => {
                          return (
                            <DropdownMenuCheckboxItem key={subOption.subLabel} className="text-xs" checked={activePreset === subOption.subLabel} onCheckedChange={() => {
                              setActivePreset(subOption.subLabel) 
                              setDateRange(subOption.subDateRange)
                            }}
                            >
                              {subOption.subLabel}
                            </DropdownMenuCheckboxItem>
                          )
                        })}
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                </DropdownMenuGroup>
              )
            }
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}