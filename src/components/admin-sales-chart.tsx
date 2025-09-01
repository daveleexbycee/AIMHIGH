
"use client"

import { useMemo, useState } from "react"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Order } from "@/hooks/use-orders"
import { format, startOfWeek, startOfMonth, startOfQuarter, startOfYear, eachDayOfInterval, eachWeekOfInterval, eachMonthOfInterval, eachQuarterOfInterval } from 'date-fns'

interface AdminSalesChartProps {
  orders: Order[];
}

export function AdminSalesChart({ orders }: AdminSalesChartProps) {
  const [timeframe, setTimeframe] = useState<"daily" | "weekly" | "monthly">("monthly");

  const chartData = useMemo(() => {
    const now = new Date();
    let interval;
    let dataMap = new Map<string, number>();
    let dateFormat: string;
    let periodFunction: (date: Date | number) => Date;
    let intervalFunction: (interval: {start: Date, end: Date}) => Date[];

    switch (timeframe) {
      case "daily":
        interval = { start: startOfWeek(now), end: now };
        dateFormat = 'EEE'; // Mon, Tue
        periodFunction = (d) => d;
        intervalFunction = eachDayOfInterval;
        break;
      case "weekly":
        interval = { start: startOfQuarter(now), end: now };
        dateFormat = 'MMM d'; // Jan 1, Jan 8
        periodFunction = startOfWeek;
        intervalFunction = (i) => eachWeekOfInterval(i, { weekStartsOn: 1 });
        break;
      case "monthly":
      default:
        interval = { start: startOfYear(now), end: now };
        dateFormat = 'MMM'; // Jan, Feb
        periodFunction = startOfMonth;
        intervalFunction = eachMonthOfInterval;
        break;
    }

    const allPeriods = intervalFunction(interval);
    allPeriods.forEach(period => {
      dataMap.set(format(period, dateFormat), 0);
    });

    orders.forEach(order => {
      const orderDate = new Date(order.date.seconds * 1000);
      if (orderDate >= interval.start && orderDate <= interval.end) {
        const periodKey = format(periodFunction(orderDate), dateFormat);
        const currentTotal = dataMap.get(periodKey) || 0;
        dataMap.set(periodKey, currentTotal + order.total);
      }
    });

    return Array.from(dataMap.entries()).map(([name, total]) => ({ name, total }));
  }, [orders, timeframe]);
  
  const chartConfig = {
      total: {
        label: "Revenue",
        color: "hsl(var(--primary))",
      },
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales Overview</CardTitle>
        <CardDescription>
          Total revenue from fulfilled orders over time.
        </CardDescription>
        <Tabs value={timeframe} onValueChange={(value) => setTimeframe(value as any)} className="pt-4">
            <TabsList>
                <TabsTrigger value="daily">Daily</TabsTrigger>
                <TabsTrigger value="weekly">Weekly</TabsTrigger>
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
            </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent className="pl-2">
        <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height={350}>
            <BarChart data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                dataKey="name"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                />
                <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `₦${value / 1000}k`}
                />
                <ChartTooltip
                    content={<ChartTooltipContent
                        formatter={(value) => `₦${Number(value).toLocaleString()}`}
                        indicator="dot"
                    />}
                />
                <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
            </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
