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
import { datePresetsArray } from '@repo/db'

type DatePresetLabel = (typeof datePresetsArray)[number]

type datePresetObj = {
  label: DatePresetLabel
  dateRange: {
    from: Date
    to: Date
  }
}

type datePresetObjSub = {
  label: string
  subs: datePresetObj[]
}

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

export const lastNDays = (n: number) => ({
  from: startOfDay(addDays(yesterday, -(n - 1))),
  to: endOfDay(yesterday),
});

// convenience anchors
const today = startOfDay(now);
const yesterday = addDays(today, -1);
const yesterdayLastYear = addYears(yesterday, -1);

// --- presets ---
export const presetOptions: (datePresetObj | datePresetObjSub)[] = [
  {
    label: 'Yesterday',
    dateRange: lastNDays(1),
  },
  {
    label: 'Last 7 days',
    dateRange: lastNDays(7),
  },
  {
    label: 'Last 30 days',
    dateRange: lastNDays(30),
  },
  {
    label: 'Last 60 days',
    dateRange: lastNDays(60),
  },
  {
    label: 'Last 90 days',
    dateRange: lastNDays(90),
  },
  {
    label: 'Last 365 days',
    dateRange: lastNDays(365),
  },
  {
    label: 'Week',
    subs: [
      {
        label: 'This week to yesterday',
        dateRange: {
          from: startOfWeek(now),
          to: endOfDay(yesterday),
        },
      },
      {
        label: 'Last week',
        dateRange: {
          from: startOfWeek(addDays(now, -7)),
          to: endOfWeek(addDays(now, -7)),
        },
      },
      {
        label: '2 weeks ago',
        dateRange: {
          from: startOfWeek(addDays(now, -14)),
          to: endOfWeek(addDays(now, -14)),
        },
      },
      {
        label: 'This week last year',
        dateRange: {
          from: startOfWeek(addYears(now, -1)),
          to: endOfWeek(addYears(now, -1)),
        },
      },
      {
        label: 'This week to yesterday last year',
        dateRange: {
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
        label: 'This month to yesterday',
        dateRange: {
          from: startOfMonth(now),
          to: endOfDay(yesterday),
        },
      },
      {
        label: 'Last month',
        dateRange: {
          from: startOfMonth(addMonths(now, -1)),
          to: endOfMonth(addMonths(now, -1)),
        },
      },
      {
        label: '2 months ago',
        dateRange: {
          from: startOfMonth(addMonths(now, -2)),
          to: endOfMonth(addMonths(now, -2)),
        },
      },
      {
        label: 'This month last year',
        dateRange: {
          from: startOfMonth(addYears(now, -1)),
          to: endOfMonth(addYears(now, -1)),
        },
      },
      {
        label: 'This month to yesterday last year',
        dateRange: {
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
        label: 'This quarter to yesterday',
        dateRange: {
          from: startOfQuarter(now),
          to: endOfDay(yesterday),
        },
      },
      {
        label: 'Last quarter',
        dateRange: {
          from: startOfQuarter(addMonths(now, -3)),
          to: endOfQuarter(addMonths(now, -3)),
        },
      },
      {
        label: '2 quarters ago',
        dateRange: {
          from: startOfQuarter(addMonths(now, -6)),
          to: endOfQuarter(addMonths(now, -6)),
        },
      },
      {
        label: 'This quarter last year',
        dateRange: {
          from: startOfQuarter(addYears(now, -1)),
          to: endOfQuarter(addYears(now, -1)),
        },
      },
      {
        label: 'This quarter to yesterday last year',
        dateRange: {
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
        label: 'This year to yesterday',
        dateRange: {
          from: startOfYear(now),
          to: endOfDay(yesterday),
        },
      },
      {
        label: 'Last year',
        dateRange: {
          from: startOfYear(addYears(now, -1)),
          to: endOfYear(addYears(now, -1)),
        },
      },
      {
        label: '2 years ago',
        dateRange: {
          from: startOfYear(addYears(now, -2)),
          to: endOfYear(addYears(now, -2)),
        },
      },
      {
        label: 'Last year to yesterday',
        dateRange: {
          from: startOfYear(addYears(now, -1)),
          to: endOfDay(addYears(yesterday, -1)),
        },
      },
    ],
  },
];

export function DatePickerPresets({ activePreset, setActivePreset, setDateRange }: {
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
            if ("dateRange" in option) {
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
                            <DropdownMenuCheckboxItem key={subOption.label} className="text-xs" checked={activePreset === subOption.label} onCheckedChange={() => {
                              setActivePreset(subOption.label) 
                              setDateRange(subOption.dateRange)
                            }}
                            >
                              {subOption.label}
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