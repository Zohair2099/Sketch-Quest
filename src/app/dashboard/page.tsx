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
        { name: 'Quests Completed', value: '15', progress: 50, icon: <CheckCircle className="w-5 h-5" />, color: 'text-green-500' },
    ];

    const chartData = [
      { day: "Mon", xp: 50 },
      { day: "Tue", xp: 75 },
      { day: "Wed", xp: 120 },
      { day: "Thu", xp: 90 },
      { day: "Fri", xp: 150 },
      { day: "Sat", xp: 180 },
      { day: "Sun", xp: 200 },
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
                    <CardDescription>You're doing great. Keep up the momentum!</CardDescription>
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
                                {stat.name === 'XP Points' ? '+20% from last week' : stat.name === 'Streak' ? 'Keep it going!' : '50% of all quests'}
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
                        <CardTitle>Continue Your Quest</CardTitle>
                        <CardDescription>Jump back into your last lesson.</CardDescription>
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
                            <div className="flex justify-between items-center">
                                <Badge variant="secondary" className="mb-2">Science</Badge>
                                <p className="text-sm text-muted-foreground mt-1">Mission 3 of 5</p>
                            </div>
                            <h3 className="text-lg font-semibold">The Solar System</h3>
                            <Progress value={60} className="mt-3 h-2" />
                        </div>
                        <Button className="w-full mt-2">
                            <BookOpen className="mr-2 h-4 w-4" />
                            Continue
                        </Button>
                    </CardContent>
                </Card>
            </div>
            <AiRecommendations />
        </div>
    );
}
