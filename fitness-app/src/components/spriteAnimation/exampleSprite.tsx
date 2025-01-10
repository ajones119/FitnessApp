
import { useEffect, useRef, useState } from "react";
import SPRITE_SHEET from "../../assets/shadow_dog.png"
import { Input } from "../ui/input";
const numFrames = 7;
const fps = 20;

const frameWidth = 575;
const frameHeight = 525;
const scale = 0.2;

const ExampleSprite = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const animationId = useRef(0);
    const [a, setA] = useState(3);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
    
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
    
        const image = new Image();
        image.src = SPRITE_SHEET;
    
        let frameIndex = 0;
        let lastFrameTime = performance.now();
        const frameDuration = 1000 / fps;
        const scaledWidth = frameWidth * scale;
        const scaledHeight = frameHeight * scale;
        canvas.width = scaledWidth;
        canvas.height = scaledHeight;

        // Apply scaling
        ctx.scale(scale, scale);
        const animate = (timestamp: number) => {
            const elapsed = timestamp - lastFrameTime;
        
            if (elapsed >= frameDuration) {
                lastFrameTime = timestamp;
                frameIndex = (frameIndex + 1) % numFrames;
        
                   // Clear the canvas and draw the current frame
                ctx.clearRect(0, 0, scaledWidth, scaledHeight);
                ctx.save(); // Save the current state of the canvas

                // Apply scaling
                ctx.scale(scale, scale)
                ctx.drawImage(
                image,
                frameIndex * frameWidth, // Source X
                a * frameHeight,                      // Source Y
                frameWidth,             // Source Width
                frameHeight,            // Source Height
                0,                      // Destination X
                0,                      // Destination Y
                frameWidth,             // Destination Width
                frameHeight             // Destination Height
                );
                ctx.restore();
            }
    
            animationId.current = requestAnimationFrame(animate);
        };

    
        image.onload = () => {
        canvas.width = frameWidth * scale;
        canvas.height = frameHeight * scale;
        animate(performance.now());
        };
    
        return () => cancelAnimationFrame(animationId?.current); // Cleanup animation
    }, [frameWidth, frameHeight, numFrames, fps, a]);
    
    return <div>
        <Input value={a} type="number" onChange={(e) => setA(Number(e.target.value))} />
        <canvas ref={canvasRef} /></div>;
    };


export default ExampleSprite;