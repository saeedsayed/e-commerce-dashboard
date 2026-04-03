"use client";

import Menu from "@/components/ui/Menu";
import { ISales } from "@/types";
import axiosInstance from "@/utils/axiosInstance";
import { Chart, useChart } from "@chakra-ui/charts";
import { AbsoluteCenter, Box, HStack, Spinner, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  CartesianGrid,
  Label,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type TDuration = "yearly" | "monthly" | "daily";

const getInitialChartData = (duration: TDuration) => {
  if (duration === "yearly") {
    return [
      { revenue: 0, orders: 0, date: "2020" },
      { revenue: 0, orders: 0, date: "2021" },
      { revenue: 0, orders: 0, date: "2022" },
      { revenue: 0, orders: 0, date: "2023" },
      { revenue: 0, orders: 0, date: "2024" },
      { revenue: 0, orders: 0, date: "2025" },
      { revenue: 0, orders: 0, date: "2026" },
      { revenue: 0, orders: 0, date: "2027" },
      { revenue: 0, orders: 0, date: "2028" },
      { revenue: 0, orders: 0, date: "2029" },
      { revenue: 0, orders: 0, date: "2030" },
    ];
  }
  if (duration === "daily") {
    return Array.from(new Array(30)).map((_, i) => ({
      revenue: 0,
      orders: 0,
      date: `Day ${i + 1}`,
    }));
  }
  return [
    { revenue: 0, orders: 0, date: "January" },
    { revenue: 0, orders: 0, date: "February" },
    { revenue: 0, orders: 0, date: "March" },
    { revenue: 0, orders: 0, date: "May" },
    { revenue: 0, orders: 0, date: "June" },
    { revenue: 0, orders: 0, date: "August" },
    { revenue: 0, orders: 0, date: "October" },
    { revenue: 0, orders: 0, date: "November" },
  ];
};

const SalesChart = () => {
  const [duration, setDuration] = useState<TDuration>("daily");
  const [chartData, setChartData] = useState(getInitialChartData("daily"));
  const chart = useChart({
    data: chartData,
    series: [
      { name: "orders", color: "teal.solid", yAxisId: "left" },
      { name: "revenue", color: "purple.solid", yAxisId: "right" },
    ],
  });
  const { isLoading, isError, isRefetching } = useQuery({
    queryKey: ["sales", duration],
    queryFn: async () => {
      const { data } = await axiosInstance<{
        duration: "yearly" | "monthly" | "daily";
        data: ISales[];
      }>(`/analyses/sales?duration=${duration}`);
      const formattedData = chartData.map((e, i) => {
        let obj = e;
        data.data.forEach((d) => {
          if (
            duration === "daily" &&
            i === d.date.day - 1 &&
            new Date().getMonth() === d.date.month - 1
          )
            obj = {
              orders: d.totalOrders,
              revenue: d.totalRevenue,
              date: e.date,
            };
          if (duration === "monthly" && i === d.date.month - 1)
            obj = {
              orders: d.totalOrders,
              revenue: d.totalRevenue,
              date: e.date,
            };
          if (duration === "yearly") {
            const year = parseInt(e.date);
            if (year === d.date.year)
              obj = {
                orders: d.totalOrders,
                revenue: d.totalRevenue,
                date: e.date,
              };
          }
        });
        return obj;
      });
      setChartData(formattedData);
      return data;
    },
  });

  if (isError) return <Text>Something want wrong</Text>;
  return (
    <Box>
      <HStack gap={4}>
        <Menu
          buttonText={duration}
          items={[
            { label: "Yearly", value: "yearly" },
            { label: "Monthly", value: "monthly" },
            { label: "Daily", value: "daily" },
          ]}
          onSelect={(e) => {
            const newDuration = e.value as TDuration;
            setDuration(newDuration);
            setChartData(getInitialChartData(newDuration));
          }}
        />
        {(isLoading || isRefetching) && <Spinner />}
      </HStack>
      <Chart.Root maxH="sm" chart={chart}>
        <LineChart data={chart.data} title="sales" responsive>
          <CartesianGrid stroke={chart.color("border")} />
          <XAxis
            axisLine={false}
            dataKey={chart.key("date")}
            tickFormatter={(value) => value}
            stroke={chart.color("border")}
          >
            <Label value="Date" position="bottom" />
          </XAxis>
          <YAxis
            axisLine={false}
            tickLine={false}
            tickMargin={10}
            yAxisId="left"
            dataKey={chart.key("orders")}
            stroke={chart.color("border")}
          >
            <Label value="orders" position="left" angle={-90} offset={-10} />
          </YAxis>
          <YAxis
            axisLine={false}
            tickLine={false}
            tickMargin={10}
            yAxisId="right"
            orientation="right"
            dataKey={chart.key("revenue")}
            stroke={chart.color("border")}
          >
            <Label value="revenue" position="right" angle={90} offset={-10} />
          </YAxis>
          <Tooltip
            animationDuration={100}
            cursor={{ stroke: chart.color("border") }}
            content={<Chart.Tooltip />}
          />
          <Legend
            verticalAlign="top"
            align="right"
            wrapperStyle={{
              marginBlockStart: -20,
              marginInlineEnd: 20,
              width: "fit-content",
            }}
            content={<Chart.Legend />}
          />
          {chart.series.map((item) => (
            <Line
              type={"bump"}
              yAxisId={item.yAxisId}
              key={item.name}
              isAnimationActive={true}
              dataKey={chart.key(item.name)}
              fill={chart.color(item.color)}
              stroke={chart.color(item.color)}
              strokeWidth={5}
            />
          ))}
        </LineChart>
      </Chart.Root>
    </Box>
  );
};

export default SalesChart;
