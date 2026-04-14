"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, XAxis, YAxis } from "recharts"

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
import { useUserStore } from "@/store/store"
import { useQuery } from "@tanstack/react-query"

export const description = "A mixed bar chart"



const chartConfig = {
  visitors: {
    label: "Leads",
    color: "var(--color-chrome)",
  },
  Opened: {
    label: "Opened",
    color: "var(--chart-1)",
  },
  Done: {
    label: "Done",
    color: "var(--chart-2)",
  },
  "Not replied": {
    label: "Not replied",
    color: "var(--chart-3)",
  },
  Spam: {
    label: "Spam",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig


export function Bare() {
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
      { status: "Done", leads: getStatus("Done"), fill: "var(--chart-1)" },
      { status: "Opened", leads: getStatus("In Progress"), fill: "var(--chart-2)" },
      { status: "Not replied", leads: getStatus("not Replied"), fill: "var(--chart-3)" },
      { status: "Spam", leads: getStatus("Spam"), fill: "var(--chart-4)" },
    ]

  return (
    <Card className="border-gray-100 shadow  ">
      <CardHeader className=" !p-0 !px-4 !pb-3.5 border-b border-b-gray-100">
        <CardTitle>Total Leads</CardTitle>
      </CardHeader>
      <CardContent className="">
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 0,
            }}
          >
            <YAxis
              dataKey="status"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <XAxis dataKey="leads" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="leads" fill="" layout="vertical" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      
    </Card>
  )
}



