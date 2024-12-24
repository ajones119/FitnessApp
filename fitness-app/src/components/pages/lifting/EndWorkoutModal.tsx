import { useMutateWorkoutWeightliftingSession } from "../../../service/WorkoutWeightlifting";
import { Button } from "../../ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader } from "../../ui/dialog";

type Props = {
    isOpen: boolean;
    handleClose: () => void;
    id: string
}

const EndWorkoutModal = ({isOpen, handleClose, id}: Props) => {
  const {mutate, isPending} = useMutateWorkoutWeightliftingSession(() => {

  });

    return (
        <Dialog open={isOpen} >
            <DialogContent>
                <DialogHeader>
                    End Workout?
                </DialogHeader>
                <DialogFooter>
                    <div className="flex gap-2 justify-center">
                        <Button variant="destructive" onClick={handleClose}>Close</Button>
                        <Button onClick={() => {
                            mutate({id, finished_at: new Date().toISOString()});
                        }} isLoading={isPending}>End Workout</Button>
                    </div>
                </DialogFooter>

            </DialogContent>

        </Dialog>
    );
}

export default EndWorkoutModal;