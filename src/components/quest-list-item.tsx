
"use client"

import Image from 'next/image';
import Link from 'next/link';
import { BookOpen, Star, Zap, ChevronRight } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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

interface QuestListItemProps {
  quest: Quest;
}

export function QuestListItem({ quest }: QuestListItemProps) {
  const isTopic = 'topicId' in quest;
  const questImage = quest.imageUrlId ? PlaceHolderImages.find(img => img.id === quest.imageUrlId) : null;
  const fallbackImage = PlaceHolderImages.find(img => img.id === 'hero-illustration');
  const href = isTopic ? `/dashboard/quests/${quest.topicId}` : `/dashboard/quests/${quest.id}`;

  return (
    <Card className="hover:border-primary/50 transition-colors w-full">
      <Link href={href} className="block">
        <CardContent className="p-4 flex items-center gap-4">
          {questImage ? (
            <Image
              src={questImage.imageUrl}
              alt={questImage.description}
              width={80}
              height={80}
              className="rounded-md object-cover aspect-square"
              data-ai-hint={questImage.imageHint}
            />
          ) : (
            fallbackImage && <Image
              src={fallbackImage.imageUrl}
              alt={fallbackImage.description}
              width={80}
              height={80}
              className="rounded-md object-cover aspect-square"
              data-ai-hint={fallbackImage.imageHint}
            />
          )}

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
                <Badge variant="secondary">{quest.topic}</Badge>
                {quest.trending && <Badge variant="destructive">Trending</Badge>}
            </div>
            <h3 className="font-semibold text-lg">{quest.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-1">{quest.description}</p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                <div className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    <span>{isTopic ? `${quest.lessons.length} Lessons` : '1 Lesson'}</span>
                </div>
                <div className="flex items-center gap-1">
                    <Zap className="h-4 w-4" />
                    <span>
                        {isTopic 
                            ? `${quest.lessons.reduce((sum, l) => sum + l.xpReward, 0).toLocaleString()} XP`
                            : `${quest.xpReward} XP`
                        }
                    </span>
                </div>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="ml-auto">
            <ChevronRight className="h-5 w-5" />
          </Button>
        </CardContent>
      </Link>
    </Card>
  );
}

export function QuestListItemSkeleton() {
  return (
    <Card>
      <CardContent className="p-4 flex items-center gap-4">
        <Skeleton className="h-20 w-20 rounded-md" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <div className="flex gap-4">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
        <Skeleton className="h-8 w-8 rounded-full" />
      </CardContent>
    </Card>
  );
}
