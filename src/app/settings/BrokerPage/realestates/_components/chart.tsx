"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useQuery } from "@tanstack/react-query"
import { useUserStore } from "@/store/store"

export const description = "A donut chart with text"


const chartConfig = {
  visitors: {
    label: "Leads",
  },
  chrome: {
    label: "Opened",
    color: "var(--chart-1)",
  },
  safari: {
    label: "Done",
    color: "var(--chart-2)",
  },
  firefox: {
    label: "Not replied",
    color: "var(--chart-3)",
  },
  edge: {
    label: "Spam",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig

export function ChartPieDonutText() {
  const user = useUserStore((state) => state?.user);
  const {data:masseges} = useQuery({
    queryKey:["MassegesKey"],
    queryFn: async () => { 
      const res =  await fetch(`/api/Leads/Masseges?idUser=${user?.id}`)
      const json = await res.json()
      console.log("tsa",json)
      return json?.data
    },
    refetchOnWindowFocus:false,
  })

  const getStatus =  (stat:string) => masseges?.filter((e:{status:string}) => e?.status === stat)?.length

  const chartData = [
    { browser: "Opened", visitors: getStatus("Opened"), fill: "var(--color-chrome)" },
    { browser: "Done", visitors: getStatus("Done"), fill: "var(--color-firefox)" },
    { browser: "Not replied", visitors: getStatus("Not replied"), fill: "var(--color-safari)" },
    { browser: "Spam", visitors: getStatus("Spam"), fill: "var(--color-edge)" },
  ]
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0)
  }, [])
  
  

  return (
    <Card className="flex flex-col border-gray-100 shadow">
      <CardHeader className="items-center pb-0">
        <CardTitle>Total Leads</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Visitors
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}
