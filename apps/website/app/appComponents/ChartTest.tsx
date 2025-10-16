"use client"

import { 
  ChartContainer, 
  type ChartConfig, 
  ChartTooltip, 
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

// const chartConfig = { // one of each column
//   desktop: {
//     label: "Desktop",
//     color: "var(--chart-1)"
//   },
//   mobile: {
//     label: "Mobile",
//     color: "var(--chart-2)"
//   }
// } satisfies ChartConfig

const chartConfig = { // one of each column except for x-axis
  revenue: {
    label: "Revenue",
    color: "var(--chart-2)"
  },
  aov: {
    label: "AOV",
    color: "var(--chart-3)"
  }
} satisfies ChartConfig

export default function ChartTest({ chartData }) {
  return (
    <ChartContainer config={chartConfig} className='min-h-[200px] w-full'>
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis 
          dataKey="date"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          // tickFormatter={(value) => value.slice(0,3)}
        />
        <ChartTooltip content={<ChartTooltipContent indicator="dot"/>} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey='revenue' fill='var(--color-revenue)' radius={4} />
        <Bar dataKey='aov' fill='var(--color-aov)' radius={4} />
        {/* <Bar dataKey='mobile' fill='var(--color-mobile)' radius={4} /> */}
      </BarChart>
    </ChartContainer>
  )
}