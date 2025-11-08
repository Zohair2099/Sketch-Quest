
"use client";

import { Award, BookOpen, Flame, Zap, Target, CheckCircle, Lightbulb } from 'lucide-react';
import Image from 'next/image';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { doc } from 'firebase/firestore';
import { useFirestore, useUser, useDoc, useMemoFirebase } from '@/firebase';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { AiRecommendations } from '@/components/ai-recommendations';
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardPage() {
    const scienceQuestImage = PlaceHolderImages.find(img => img.id === 'quest-science');
    const { user } = useUser();
    const firestore = useFirestore();

    const userDocRef = useMemoFirebase(() => {
        if (!user) return null;
        return doc(firestore, 'users', user.uid);
    }, [user, firestore]);
    
    const { data: userData, isLoading: isUserDocLoading } = useDoc(userDocRef);

    const stats = [
        { name: 'XP Points', value: userData?.xp ?? 0, progress: ((userData?.xp ?? 0) / 10000) * 100, icon: <Zap className="w-5 h-5" />, color: 'text-yellow-500' },
        { name: 'Streak', value: `${userData?.streak ?? 0} days`, progress: ((userData?.streak ?? 0)/30) * 100, icon: <Flame className="w-5 h-5" />, color: 'text-orange-500' },
        { name: 'Quests Completed', value: '0', progress: 0, icon: <CheckCircle className="w-5 h-5" />, color: 'text-green-500' },
    ];

    const chartData = [
      { day: "Mon", xp: 0 },
      { day: "Tue", xp: 0 },
      { day: "Wed", xp: 0 },
      { day: "Thu", xp: 0 },
      { day: "Fri", xp: 0 },
      { day: "Sat", xp: 0 },
      { day: "Sun", xp: 0 },
    ]

    const chartConfig = {
      xp: {
        label: "XP",
        color: "hsl(var(--primary))",
      },
    }

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Welcome back, {user?.displayName || userData?.email?.split('@')[0] || 'Explorer'}!</CardTitle>
                    <CardDescription>Ready to start your first quest?</CardDescription>
                </CardHeader>
            </Card>

            <div className="grid gap-6 md:grid-cols-3">
                {stats.map(stat => (
                    <Card key={stat.name}>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
                            <span className={stat.color}>{stat.icon}</span>
                        </CardHeader>
                        <CardContent>
                            {isUserDocLoading ? (
                                <Skeleton className="h-8 w-24" />
                            ) : (
                                <div className="text-2xl font-bold">{stat.value}</div>
                            )}
                            <p className="text-xs text-muted-foreground">
                                {stat.name === 'XP Points' ? 'Start a quest to earn XP' : stat.name === 'Streak' ? 'Start a lesson to build your streak' : 'No quests completed yet'}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-5">
                <Card className="lg:col-span-3">
                    <CardHeader>
                        <CardTitle>Weekly XP Trend</CardTitle>
                        <CardDescription>Your XP gains over the last 7 days.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfig} className="h-[200px] w-full">
                            <BarChart accessibilityLayer data={chartData}>
                                <CartesianGrid vertical={false} />
                                <XAxis
                                    dataKey="day"
                                    tickLine={false}
                                    tickMargin={10}
                                    axisLine={false}
                                />
                                <YAxis hide />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Bar dataKey="xp" fill="var(--color-xp)" radius={8} />
                            </BarChart>
                        </ChartContainer>
                    </CardContent>
                </Card>

                 <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Start a Quest</CardTitle>
                        <CardDescription>Choose a quest to begin your adventure.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-start gap-4">
                        {scienceQuestImage && (
                            <Image
                                src={scienceQuestImage.imageUrl}
                                alt={scienceQuestImage.description}
                                width={400}
                                height={200}
                                className="rounded-lg object-cover w-full aspect-[16/9]"
                                data-ai-hint={scienceQuestImage.imageHint}
                            />
                        )}
                        <div className="flex-1 w-full">
                            <h3 className="text-lg font-semibold">Explore a new topic!</h3>
                            <p className="text-sm text-muted-foreground">There are many quests available. Find one that interests you.</p>
                        </div>
                        <Button className="w-full mt-2" asChild>
                            <a href="/dashboard/quests">
                                <BookOpen className="mr-2 h-4 w-4" />
                                Browse Quests
                            </a>
                        </Button>
                    </CardContent>
                </Card>
            </div>
            <AiRecommendations />
        </div>
    );
}
