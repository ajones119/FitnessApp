import { useEffect, useRef, useState } from "react";
import {animate} from "motion";
import { Button } from "../ui/button";

const ToggleSVG = () => {
    const paths = useRef<any[]>([]);
    const circles = useRef<any[]>([]);

    const [on, setOn] = useState(false);

    const numberOfCircles = 3;
    const radius = 10;

    useEffect(() => {
        const length = paths.current[0].getTotalLength();
        const step = length / numberOfCircles;

        circles.current.forEach((circle, i) => {
            const {x, y} = paths.current[on ? 0 : 1].getPointAtLength(i * step);
            animate(circle, {
                cx: x,
                cy: y
            })
        })
    }, [on])

    return (
        <div>
        <Button  onClick={() => setOn(!on)}>toggle</Button>
        <svg viewBox={`0 0 100 100`} style={{filter: `url(#filter)`}}>
            <defs>
                <filter id="filter">
                    <feGaussianBlur
                        in="SourceAlpha"
                        stdDeviation={20}
                        result="blur"
                    />
                    <feColorMatrix
                        in="blur"
                        mode="matrix"
                        values="
                            1 0 0 0 0
                            0 1 0 0 0
                            0 0 1 0 0
                            0 0 0 25 -15
                        "
                        result="filter"
                    />
                </filter>
            </defs>
            <path
                ref={ref => paths.current[0] = ref} 
                d="M 0 50 L 100 50" 
                stroke="black"
                fill="none"
            />
            <path
                ref={ref => paths.current[1] = ref} 
                d="M 100 50 L 0 50" 
                stroke="black"
                fill="none"
            />

            <g>
                {
                    [...Array(numberOfCircles)].map((_, i) => {
                        return <circle
                            key={`c-${i}`}
                            r={radius}
                            ref={ref=>circles.current[i] = ref}
                            cx={on ? 50 : 0}
                            cy={50}
                        />
                    })
                }
            </g>
        </svg>
        </div>
    )
}

export default ToggleSVG;