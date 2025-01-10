import { useMemo, useState } from "react";
import { useWorkoutExerciseData } from "../../../service/WorkoutWeightlifting";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "../../ui/chart";
import {  format, parseISO } from "date-fns";
import { Switch } from "../../ui/switch";

type Props = {
    id: string
    initialType?: "volume" | "orm"
};

const VolumeOrmChart = ({id, initialType = "orm"}: Props) => {
    const {data, isLoading, isRefetching} = useWorkoutExerciseData(id);
    const [chartType, setChartType] = useState<"volume" | "orm">(initialType)

    const [oneRepMaxData, volumeData] = useMemo(() => {
        if (!data) {
            return [[], []];
        }
        const {lastOneHundredDaysOneRepMaxes = [], lastOneHundredDaysVolumes = []} = data;
        const oneRepMaxData = lastOneHundredDaysOneRepMaxes.map(orm => ({date: orm.workout_date, data: orm?.highestORM }));
        const volumeData = lastOneHundredDaysVolumes.map(volume => ({date: volume.workout_date, data: volume?.highestVolume }))


        return [oneRepMaxData, volumeData]
    }, [isLoading, isRefetching, id]);

    const chartData = chartType === "orm" ? oneRepMaxData : volumeData

    const chartConfig = {
        data  : {
          label: chartType === "volume" ? "Volume" : "ORM",
          color: chartType === "volume" ? "var(--chart-1)" : "var(--chart-2)",
        },
      } satisfies ChartConfig

    return <div>
        <div className="w-full flex items-center justify-center gap-2 mb-2">
          <p className="text-xs pt-1">ORM</p>
            <div>
              <Switch checked={chartType === "volume"} onCheckedChange={() => setChartType(chartType === "orm" ? "volume" : "orm")} />
            </div>
          <p className="text-xs pt-1">Volume</p>
        </div>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: -20,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={true}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => format(parseISO(value), "MM/dd/yyyy")}
            />
            <YAxis
              tickLine={true}
              axisLine={false}
              tickMargin={8}
              tickCount={3}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Area
              dataKey="data"
              type="natural"
              fill={chartType === "volume" ? "var(--chart-1)" : "var(--chart-2)"}
              fillOpacity={0.4}
              stroke={chartType === "volume" ? "var(--chart-1)" : "var(--chart-2)"}
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
    </div>
}

export default VolumeOrmChart