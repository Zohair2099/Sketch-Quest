
'use client';

import { ArrowLeft, Youtube } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function QuestResourcesPage() {
  const params = useParams();
  const questId = params.questId as string;
  const videoId = 'ix9cRaBkVe0';

  return (
    <div className="space-y-6">
      <Link
        href={`/dashboard/quests/${questId}`}
        className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Quest Details
      </Link>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Youtube className="h-8 w-8 text-red-500" />
            <div>
              <CardTitle className="text-2xl font-headline">Python for Beginners - Full Course</CardTitle>
              <CardDescription>
                An in-depth video guide to kickstart your Python journey.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="aspect-video w-full">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${videoId}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="rounded-lg"
            ></iframe>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
