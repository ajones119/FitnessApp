import {WorkoutWeightliftingSession } from "../../../service/WorkoutWeightlifting"
import { Label, LabelList, Pie, PieChart } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../../ui/chart"
import { useMemo } from "react"
import { useExcercises } from "../../../service/WeightExcercises"
import { MuscleGroup, useMuscleGroups } from "../../../service/MuscleGroups"

type Props = {
    session: WorkoutWeightliftingSession
}

const SessionGroupsPieChart = ({session}: Props) => {
    const {data: groups, isLoading: isGroupsLoading} = useMuscleGroups();
    const {data: exerciseCache, isLoading} = useExcercises();
    const [config, data, totalExercises] = useMemo(() => {
        console.log(groups)
        if (!groups || !exerciseCache) {
            return [{}, [], 0]
        }
        const {map} = exerciseCache;
        const config = groups.reduce((acc: {[key: string]: MuscleGroup & {label: string}}, current: MuscleGroup) => {

            if (!acc[current.id]) {
                acc = {...acc, [current.id]: {...current, label: current.name}}
            }

            return acc;
        }, {})

        let totalSets = 0;
        const rawData = Object.values(session.exercises).map(exerciseList => {
            const completedList = exerciseList.filter(e => !!e?.completed)
            totalSets += completedList.length;
            return ({
                muscleGroup: map[completedList[0]?.exercise]?.group?.id,
                sets: completedList.length,
                fill: map[completedList[0]?.exercise]?.group?.chartColor
            })})

        const normalizedData = rawData.reduce((acc: any, current: any) => {
            // Find an existing entry with the same muscleGroup
            const existingEntry = acc.find((item: any) => item.muscleGroup === current.muscleGroup);

            if (existingEntry) {
              // If an entry exists, add the sets to it
                existingEntry.sets += current.sets;
            } else {
              // If no entry exists, add a new one
                acc.push({ ...current });
            }

            return acc;
        }, []);
        return [config, normalizedData, totalSets]

    }, [session?.id, isGroupsLoading, isLoading])

    return (
        <div className="w-10/12 m-auto relative">
            <ChartContainer
                config={config}
                className="mx-auto aspect-square max-h-[250px]"
                >
            <PieChart>
                <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent />}
                />
                <Pie
                data={data}
                dataKey="sets"
                nameKey="muscleGroup"
                innerRadius={50}
                strokeWidth={5}
                >
                    <LabelList
                        dataKey="muscleGroup"
                        className="fill-background"
                        stroke="none"
                        fontSize={12}
                        formatter={(value: keyof typeof config) => config[value].label}

                    />
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
                            {totalExercises}
                            </tspan>
                            <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                            >
                            Sets
                            </tspan>
                        </text>
                        )
                    }
                    }}
                />
                </Pie>
            </PieChart>
            </ChartContainer>
        </div>
    )
}

export default SessionGroupsPieChart;