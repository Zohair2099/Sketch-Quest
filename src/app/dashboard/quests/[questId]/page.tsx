'use client';

import { useState, useRef, useEffect } from 'react';
import { notFound } from 'next/navigation';
import { ArrowLeft, Check, Sparkles, X } from 'lucide-react';
import Link from 'next/link';

import { SketchPad } from '@/components/sketch-pad';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { analyzeSketch } from '@/ai/flows/sketch-recognition-flow';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

// Mock data, to be replaced with data fetching
const questsData = [
  {
    id: '1',
    title: 'Design Quest: Simple Circuit',
    topic: 'Science',
    level: 2,
    xpReward: 150,
    description: 'A simple circuit consists of a power source, two wires, and a light bulb. When the circuit is complete, the bulb lights up.',
    task: 'Draw a simple circuit with a battery and a lit light bulb.',
  },
];

type AnalysisResult = {
  isCorrect: boolean;
  feedback: string;
};

export default function QuestPage({ params }: { params: { questId: string } }) {
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [sketchData, setSketchData] = useState<string | null>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 700, height: 400 });
  const containerRef = useRef<HTMLDivElement>(null);

  const quest = questsData.find((q) => q.id === params.questId);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        setCanvasSize({ width: width, height: width * (4 / 7) }); // Maintain aspect ratio
      }
    };

    handleResize(); // Set initial size
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!quest) {
    notFound();
  }

  const handleAnalyzeSketch = async () => {
    if (!sketchData) {
      alert('Please draw something first!');
      return;
    }
    setIsLoading(true);
    setAnalysisResult(null);
    try {
      const result = await analyzeSketch({
        prompt: quest.task,
        sketchDataUri: sketchData,
      });
      setAnalysisResult(result);
    } catch (error) {
      console.error('Failed to analyze sketch:', error);
      setAnalysisResult({
        isCorrect: false,
        feedback: 'Sorry, I was unable to analyze your sketch. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Link href="/dashboard/quests" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Quests
      </Link>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <Badge variant="secondary" className="mb-2">{quest.topic}</Badge>
              <CardTitle className="font-headline">{quest.title}</CardTitle>
            </div>
            <div className="font-semibold text-primary text-lg flex items-center">
              <Sparkles className="w-5 h-5 mr-2" />
              <span>{quest.xpReward} XP</span>
            </div>
          </div>
          <CardDescription className="pt-2">{quest.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4" ref={containerRef}>
          <div>
            <h3 className="font-semibold">Your Mission:</h3>
            <p className="text-muted-foreground">{quest.task}</p>
          </div>
          <SketchPad width={canvasSize.width} height={canvasSize.height} onSketchChange={setSketchData} />
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-4">
          <Button onClick={handleAnalyzeSketch} disabled={isLoading || !sketchData}>
            {isLoading ? (
              'Analyzing...'
            ) : (
              <>
                <Check className="mr-2 h-4 w-4" />
                Submit Sketch
              </>
            )}
          </Button>

          {isLoading && (
            <div className="w-full space-y-2">
                <Skeleton className="h-8 w-1/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
            </div>
          )}

          {analysisResult && (
            <Alert variant={analysisResult.isCorrect ? 'default' : 'destructive'} className="w-full">
              {analysisResult.isCorrect ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
              <AlertTitle>{analysisResult.isCorrect ? 'Great Job!' : 'Needs Improvement'}</AlertTitle>
              <AlertDescription>{analysisResult.feedback}</AlertDescription>
            </Alert>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
