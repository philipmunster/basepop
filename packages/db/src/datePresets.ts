export const datePresetsArray = [
  'Yesterday',
  'Last 7 days',
  'Last 30 days',
  'Last 60 days',
  'Last 90 days',
  'Last 365 days',
  'This week to yesterday',
  'Last week',
  '2 weeks ago',
  'This week last year',
  'This week to yesterday last year',
  'This month to yesterday',
  'Last month',
  '2 months ago',
  'This month last year',
  'This month to yesterday last year',
  'This quarter to yesterday',
  'Last quarter',
  '2 quarters ago',
  'This quarter last year',
  'This quarter to yesterday last year',
  'This year to yesterday',
  'Last year',
  '2 years ago',
  'Last year to yesterday'
] as const

export type DatePresetLabel = (typeof datePresetsArray)[number]