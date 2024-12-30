import { Link } from "@tanstack/react-router"
import { BulkWorkoutWeightliftingSessionSingle, useWorkoutWeightliftingSessionPrefetch, WorkoutWeightliftingExercises } from "../../../service/WorkoutWeightlifting"
import { format, parseISO } from "date-fns"
import { Card, CardContent, CardFooter, CardHeader } from "../../ui/card"
import { ArrowRightCircle } from "lucide-react"

type Props = {
    session: BulkWorkoutWeightliftingSessionSingle
}

const WorkoutSessionRow = ({session}: Props) => {

    const parsedDate = parseISO(session.created_at);
    const formattedDate = format(parsedDate, 'MM/dd/yyyy hh:mm');
    const prefetch = useWorkoutWeightliftingSessionPrefetch(session.id);    


    const volume = session.exercises.reduce((acc: number, exercise: WorkoutWeightliftingExercises) => {
        if (exercise.completed) {
            acc += exercise.reps * exercise.weight;
            acc += exercise.leftReps * exercise.leftWeight
        }

        return acc
    }, 0)

    return (
        <Card className="w-11/12 m-auto relative">
            <CardHeader>
                <h5 className="w-10/12">{session?.name || `${formattedDate} Workout`}</h5>
            </CardHeader>
            <CardContent>
                <p>Exercises: {session.exercises.length}</p>
            </CardContent>
            <CardFooter>
                <div className="flex gap-1">
                    <p className="text-xs text-secondary">{formattedDate} - {session?.finished_at ? format(parseISO(session.finished_at), 'MM/dd/yyy hh:mmy') : "Ongoing"}</p>
                    <p className="text-xs text-secondary">Volume: {volume}</p>
                </div>
            </CardFooter>
        <Link to={session?.finished_at ? `/lifting/${session.id}/details` : `/lifting/${session.id}`} className="absolute top-2 right-2" onMouseEnter={prefetch}>
            <ArrowRightCircle />
        </Link>
        </Card>
    )
}

export default WorkoutSessionRow;