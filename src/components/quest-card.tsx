"use client"

import Image from 'next/image';
import Link from 'next/link';
import { BookOpen, Star, Zap } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Skeleton } from '@/components/ui/skeleton';
import { QuestTopic } from '@/app/dashboard/quests/page';

type Quest = {
  id: string;
  title: string;
  topic: string;
  level: number;
  xpReward: number;
  imageUrlId?: string;
  description: string;
} | QuestTopic;

interface QuestCardProps {
  quest: Quest;
}

export function QuestCard({ quest }: QuestCardProps) {
  const isTopic = 'topicId' in quest;
  const questImage = quest.imageUrlId ? PlaceHolderImages.find(img => img.id === quest.imageUrlId) : null;
  const fallbackImage = PlaceHolderImages.find(img => img.id === 'hero-illustration');

  const href = isTopic ? `/dashboard/quests/${quest.topicId}` : `/dashboard/quests/${quest.id}`;

  return (
    <Card className="flex flex-col">
       <Link href={href} className="flex flex-col flex-grow">
      <CardHeader>
        {questImage ? (
          <Image
            src={questImage.imageUrl}
            alt={questImage.description}
            width={400}
            height={200}
            className="rounded-lg object-cover aspect-[2/1]"
            data-ai-hint={questImage.imageHint}
          />
        ) : (
          fallbackImage && <Image
            src={fallbackImage.imageUrl}
            alt={fallbackImage.description}
            width={400}
            height={200}
            className="rounded-lg object-cover aspect-[2/1]"
            data-ai-hint={fallbackImage.imageHint}
          />
        )}
        <div className="flex items-center justify-between pt-4">
          <Badge variant="secondary">{quest.topic}</Badge>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Star className="w-4 h-4 text-yellow-500" />
            {isTopic ? 
                <span>{quest.lessons.length} Lessons</span> :
                <span>Level {quest.level}</span>
            }
          </div>
        </div>
        <CardTitle className="pt-2">{quest.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription>{quest.description}</CardDescription>
      </CardContent>
      <CardFooter className="flex-col items-start gap-4">
        {isTopic ? (
             <div className="flex items-center font-semibold text-primary">
                <Zap className="w-5 h-5 mr-2" />
                <span>Up to {quest.lessons.reduce((sum, l) => sum + l.xpReward, 0).toLocaleString()} XP</span>
             </div>
        ) : (
            <div className="flex items-center font-semibold text-primary">
                <Zap className="w-5 h-5 mr-2" />
                <span>{quest.xpReward} XP Reward</span>
            </div>
        )}
        <Button asChild className="w-full">
          <div className='w-full'>
            <BookOpen className="mr-2 h-4 w-4" />
            {isTopic ? 'View Quest Path' : 'Start Quest'}
          </div>
        </Button>
      </CardFooter>
      </Link>
    </Card>
  );
}

export function QuestCardSkeleton() {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <Skeleton className="h-[200px] w-full rounded-lg" />
        <div className="flex items-center justify-between pt-4">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-5 w-24" />
        </div>
        <Skeleton className="h-7 w-3/4 pt-2" />
      </CardHeader>
      <CardContent className="flex-grow space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </CardContent>
      <CardFooter className="flex-col items-start gap-4">
        <Skeleton className="h-6 w-28" />
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
  );
}
