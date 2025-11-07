'use client';

import { useRef, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Eraser, Palette, Pen } from 'lucide-react';

interface SketchPadProps {
  width: number;
  height: number;
  onSketchChange: (dataUrl: string) => void;
}

export function SketchPad({ width, height, onSketchChange }: SketchPadProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const [isErasing, setIsErasing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;
    
    // Set a white background
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    const getCoords = (event: MouseEvent | TouchEvent) => {
        const rect = canvas.getBoundingClientRect();
        if (event instanceof MouseEvent) {
            return { x: event.clientX - rect.left, y: event.clientY - rect.top };
        }
        if (event.touches && event.touches[0]) {
            return { x: event.touches[0].clientX - rect.left, y: event.touches[0].clientY - rect.top };
        }
        return {x: 0, y: 0};
    };

    const startDrawing = (event: MouseEvent | TouchEvent) => {
      event.preventDefault();
      const { x, y } = getCoords(event);
      context.beginPath();
      context.moveTo(x, y);
      setIsDrawing(true);
    };

    const draw = (event: MouseEvent | TouchEvent) => {
      event.preventDefault();
      if (!isDrawing) return;
      const { x, y } = getCoords(event);
      context.lineWidth = isErasing ? 20 : 5;
      context.lineCap = 'round';
      context.strokeStyle = isErasing ? 'white' : color;
      context.lineTo(x, y);
      context.stroke();
    };

    const stopDrawing = () => {
      if (isDrawing) {
        context.closePath();
        setIsDrawing(false);
        onSketchChange(canvas.toDataURL('image/png'));
      }
    };

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseleave', stopDrawing);
    
    canvas.addEventListener('touchstart', startDrawing);
    canvas.addEventListener('touchmove', draw);
    canvas.addEventListener('touchend', stopDrawing);

    return () => {
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('mouseup', stopDrawing);
      canvas.removeEventListener('mouseleave', stopDrawing);

      canvas.removeEventListener('touchstart', startDrawing);
      canvas.removeEventListener('touchmove', draw);
      canvas.removeEventListener('touchend', stopDrawing);
    };
  }, [isDrawing, color, isErasing, onSketchChange, height, width]);
  
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    onSketchChange(canvas.toDataURL('image/png'));
  };

  return (
    <div className="space-y-2">
       <div className="flex items-center gap-2">
            <Button variant={!isErasing ? "secondary" : "outline"} size="icon" onClick={() => setIsErasing(false)} title="Pen">
                <Pen />
            </Button>
            <Button variant={isErasing ? "secondary" : "outline"} size="icon" onClick={() => setIsErasing(true)} title="Eraser">
                <Eraser />
            </Button>
            <div className="relative">
                <Button variant="outline" size="icon" title="Color" onClick={() => document.getElementById('color-picker')?.click()}>
                    <Palette />
                </Button>
                <input
                    id="color-picker"
                    type="color"
                    value={color}
                    onChange={(e) => {setColor(e.target.value); setIsErasing(false)}}
                    className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                />
            </div>
            <Button variant="outline" onClick={clearCanvas}>Clear</Button>
        </div>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="border rounded-md bg-white cursor-crosshair"
      />
    </div>
  );
}
