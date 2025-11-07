'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { recommendNextLessons } from '@/ai/ai-lesson-recommendations';
import { useUser } from '@/firebase';
import { Lightbulb } from 'lucide-react';
import { Skeleton } from './ui/skeleton';

// Hardcoded sample data for demonstration
const availableLessonsSample = `
- Quest ID: 1, Title: The Wonders of the Cosmos, Topic: Science, Difficulty: 2
- Quest ID: 2, Title: Introduction to JavaScript, Topic: Coding, Difficulty: 1
- Quest ID: 3, Title: The Art of the Renaissance, Topic: Art, Difficulty: 3
- Quest ID: 4, Title: Algebra Basics, Topic: Math, Difficulty: 1
- Quest ID: 5, Title: World War II History, Topic: History, Difficulty: 4
`;

const learningHistorySample = `
Completed Quests:
- Quest ID: 2, Title: Introduction to JavaScript, Score: 95%
- Quest ID: 4, Title: Algebra Basics, Score: 88%

Areas of Difficulty:
- In "Algebra Basics", the student struggled with questions involving quadratic equations.
`;


export function AiRecommendations() {
  const { user } = useUser();
  const [recommendations, setRecommendations] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getRecommendations() {
      if (user) {
        setIsLoading(true);
        try {
          const result = await recommendNextLessons({
            studentId: user.uid,
            learningHistory: learningHistorySample,
            availableLessons: availableLessonsSample,
          });
          setRecommendations(result.recommendedLessons);
        } catch (error) {
          console.error("Failed to get AI recommendations:", error);
          setRecommendations("Could not load recommendations at this time.");
        } finally {
          setIsLoading(false);
        }
      }
    }

    getRecommendations();
  }, [user]);

  if (!user) {
    return null;
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <div className="p-3 rounded-full bg-accent/20 text-accent-foreground">
         <Lightbulb className="w-6 h-6 text-accent" />
        </div>
        <div>
            <CardTitle>AI Recommendations</CardTitle>
            <CardDescription>Quests suggested just for you to level up your skills.</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        ) : (
          <div className="text-sm text-muted-foreground whitespace-pre-wrap">
            {recommendations}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
