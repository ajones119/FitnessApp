import React, { useEffect, useState } from "react";
import { intervalToDuration } from "date-fns";

interface TimerProps {
    startDate: Date;
    endDate?: Date;
}

const Timer: React.FC<TimerProps> = ({ startDate, endDate }) => {
    const [timeElapsed, setTimeElapsed] = useState({ hours: 0, minutes: 0 });

    useEffect(() => {
    const updateTimer = () => {
        const now = new Date();
        const duration = intervalToDuration({
            start: startDate,
            end: endDate || now,
        });
        setTimeElapsed({
            hours: duration.hours || 0,
            minutes: duration.minutes || 0,
        });
    };

    // Update the timer immediately and every minute
    updateTimer();
    const timerInterval = setInterval(updateTimer, 60000);

    return () => clearInterval(timerInterval); // Cleanup on unmount
    }, [startDate, endDate]);

    return (
    <div>
        <p>
        {timeElapsed.hours} hr {" "}
        {timeElapsed.minutes} min
        </p>
    </div>
    );
};

export default Timer;
