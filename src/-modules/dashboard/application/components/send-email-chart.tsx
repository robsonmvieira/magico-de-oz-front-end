import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

export const description = "A multiple bar chart"

const chartData = [
  { month: "Janeiro", enviados: 186, respondidos: 80 },
  { month: "Fevereiro", enviados: 305, respondidos: 200 },
  { month: "Março", enviados: 237, respondidos: 120 },
  { month: "Abril", enviados: 73, respondidos: 190 },
  { month: "Maio", enviados: 209, respondidos: 130 },
  { month: "Junho", enviados: 214, respondidos: 140 },
]

const chartConfig = {
  enviados: {
    label: "Enviados",
    color: "var(--chart-1)",
  },
  respondidos: {
    label: "Respondidos",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export function SendEmailChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Email Enviados e Respondidos</CardTitle>
        <CardDescription>Janeiro - Junho 2025</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="enviados" fill="var(--color-enviados)" radius={4} />
            <Bar dataKey="respondidos" fill="var(--color-respondidos)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Email enviados: 1000 <TrendingUp className="h-4 w-4" />
        </div>
        <div className="flex gap-2 text-muted-foreground leading-none">
          Email respondidos: 100 <TrendingUp className="h-4 w-4" />
        </div>
      </CardFooter>
    </Card>
  )
}
