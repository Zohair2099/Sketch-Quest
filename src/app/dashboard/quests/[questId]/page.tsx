
'use client';

import { ArrowLeft, BookOpen, CheckCircle, Flame, Star, Zap, Youtube } from 'lucide-react';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { questsData, QuestTopic } from '@/app/dashboard/quests/page';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function QuestDetailPage() {
  const params = useParams();
  const questId = params.questId as string;

  const questTopic = questsData.find((q) => q.topicId === questId) as QuestTopic | undefined;

  if (!questTopic) {
    notFound();
  }

  const topicImage = PlaceHolderImages.find((img) => img.id === questTopic.imageUrlId);

  return (
    <div className="space-y-6">
      <Link href="/dashboard/quests" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Quests
      </Link>

      <Card>
        <CardHeader className="flex flex-col md:flex-row gap-6">
            {topicImage && (
                <Image 
                    src={topicImage.imageUrl}
                    alt={topicImage.description}
                    width={150}
                    height={150}
                    className="rounded-lg object-cover w-full md:w-[150px] aspect-square"
                    data-ai-hint={topicImage.imageHint}
                />
            )}
            <div className='flex-1'>
                <Badge variant="secondary">{questTopic.topic}</Badge>
                <CardTitle className="mt-2 text-3xl font-headline">{questTopic.title}</CardTitle>
                <CardDescription className="mt-2">{questTopic.description}</CardDescription>
                <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4"/>
                        <span>{questTopic.lessons.length} Lessons</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Star className="h-4 w-4"/>
                        <span>Levels 1-{questTopic.lessons.length}</span>
                    </div>
                </div>
            </div>
        </CardHeader>
      </Card>
      
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Lessons</h2>
        {questTopic.lessons.map((lesson, index) => (
          <Card key={lesson.id} className="hover:border-primary/50 transition-colors">
            <Link href={`/dashboard/quests/${questId}/${lesson.id}`} className="block">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted font-bold text-muted-foreground">
                  {lesson.level}
                </div>
                <div className="flex-1">
                  <p className="font-semibold">{lesson.title}</p>
                  <p className="text-sm text-muted-foreground line-clamp-1">{lesson.description}</p>
                </div>
                <div className="hidden sm:flex items-center gap-1 text-sm font-semibold text-primary">
                  <Zap className="h-4 w-4" />
                  <span>{lesson.xpReward} XP</span>
                </div>
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-green-100 dark:bg-green-900">
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>

      <Separator />

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Additional Resources</h2>
         <Card className="hover:border-primary/50 transition-colors">
            <Link href={`/dashboard/quests/${questId}/resources`} className="block" target="_blank" rel="noopener noreferrer">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 dark:bg-red-900">
                  <Youtube className="h-6 w-6 text-red-600 dark:text-red-400" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold">Python for Beginners - Full Course</p>
                  <p className="text-sm text-muted-foreground">A comprehensive video tutorial covering all the basics.</p>
                </div>
                <Button variant="secondary">Watch Video</Button>
              </CardContent>
            </Link>
          </Card>
      </div>
    </div>
  );
}
