
'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { recommendNextLessons } from '@/ai/ai-lesson-recommendations';
import { useUser } from '@/firebase';
import { Lightbulb } from 'lucide-react';
import { Skeleton } from './ui/skeleton';
import { questsData } from '@/app/dashboard/quests/page';

// Function to format quest data for the AI prompt
function formatAvailableLessons() {
  return questsData.map(quest => {
    if ('topicId' in quest) {
        // This is a QuestTopic with multiple lessons
        return `Quest Series: "${quest.title}" (Topic: ${quest.topic})\nDescription: ${quest.description}\nLessons available: ${quest.lessons.length}`;
    } else {
        // This is a single quest
        return `Quest: "${quest.title}" (Topic: ${quest.topic}, Level: ${quest.level})\nDescription: ${quest.description}`;
    }
  }).join('\n\n');
}

const learningHistorySample = `
Completed Quests:
- None yet. This is a new student.

Areas of Interest:
- The student has shown interest in programming and wants to start with something beginner-friendly.
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
          const availableLessons = formatAvailableLessons();
          const result = await recommendNextLessons({
            studentId: user.uid,
            learningHistory: learningHistorySample,
            availableLessons: availableLessons,
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
