'use client';

import { ArrowLeft, CheckCircle, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { questsData, Lesson } from '@/app/dashboard/quests/page';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

function MiniLessonCard({ title, content }: { title: string; content: string }) {
    return (
        <div className="p-4 bg-muted/50 rounded-lg">
            <p className="font-bold">{title}</p>
            <p className="text-sm text-muted-foreground mt-1">{content}</p>
        </div>
    )
}

function MiniQuestCard({ title, description }: { title: string; description: string }) {
    return (
        <div className="p-4 border rounded-lg flex items-center gap-4">
            <div className="text-2xl">{title.split(' ')[0]}</div>
            <div>
                <p className="font-semibold">{title.substring(title.indexOf(' ') + 1)}</p>
                <p className="text-sm text-muted-foreground">{description}</p>
            </div>
        </div>
    )
}


export default function LessonDetailPage() {
  const params = useParams();
  const questId = params.questId as string;
  const lessonId = params.lessonId as string;

  const questTopic = questsData.find((q) => q.topicId === questId);
  const lesson = questTopic?.lessons.find((l) => l.id === lessonId) as Lesson | undefined;

  if (!questTopic || !lesson) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <Link href={`/dashboard/quests/${questId}`} className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to {questTopic.title}
      </Link>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <Badge variant="secondary" className="mb-2">{questTopic.topic}</Badge>
              <CardTitle className="font-headline text-3xl">{lesson.title}</CardTitle>
               <CardDescription className="mt-2">Level {lesson.level} of {questTopic.title}</CardDescription>
            </div>
            <div className="text-right">
                <div className="font-semibold text-primary text-lg flex items-center">
                    <Sparkles className="w-5 h-5 mr-2" />
                    <span>{lesson.xpReward} XP</span>
                </div>
                 <p className="text-sm text-muted-foreground">{lesson.badge}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-8">
            <div>
                <h3 className="text-xl font-bold mb-2">Learning Goals</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    {lesson.learningGoals.map((goal, i) => <li key={i}>{goal}</li>)}
                </ul>
            </div>
            <Separator />
            <div>
                <h3 className="text-xl font-bold mb-4">Mini Lessons</h3>
                <div className="space-y-3">
                    {lesson.miniLessons.map((ml, i) => (
                        <MiniLessonCard key={i} title={ml.title} content={ml.content} />
                    ))}
                </div>
            </div>
             <Separator />
             <div>
                <h3 className="text-xl font-bold mb-4">Mini Quests (Practice Challenges)</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {lesson.miniQuests.map((mq, i) => (
                        <MiniQuestCard key={i} title={mq.title} description={mq.description} />
                    ))}
                </div>
            </div>
        </CardContent>
         <CardFooter>
            <p className='text-xs text-muted-foreground'>Interactive coding challenges coming soon!</p>
        </CardFooter>
      </Card>
    </div>
  );
}
