"use client";

import { Award, BookOpen, Flame, Zap } from 'lucide-react';
import Image from 'next/image';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useUser } from '@/firebase';

export default function DashboardPage() {
    const scienceQuestImage = PlaceHolderImages.find(img => img.id === 'quest-science');
    const { user } = useUser();
    
    const stats = [
        { name: 'XP Points', value: '4,820', progress: 82, icon: <Zap className="w-5 h-5" />, color: 'text-yellow-500' },
        { name: 'Streak', value: '12 days', progress: 100 * (12/30), icon: <Flame className="w-5 h-5" />, color: 'text-orange-500' },
        { name: 'Level', value: '5', progress: 40, icon: <Award className="w-5 h-5" />, color: 'text-green-500' },
    ];

    const badges = [
        { name: 'Science Whiz' },
        { name: 'Perfect Score' },
        { name: '10-Day Streak' },
        { name: 'Quest Master' },
        { name: 'Early Bird' }
    ];

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Welcome back, {user?.displayName || user?.email?.split('@')[0] || 'Explorer'}!</CardTitle>
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
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <Progress value={stat.progress} className="mt-2 h-2" />
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-5">
                <Card className="lg:col-span-3">
                    <CardHeader>
                        <CardTitle>Continue Your Quest</CardTitle>
                        <CardDescription>Jump back into your last lesson.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        {scienceQuestImage && (
                            <Image
                                src={scienceQuestImage.imageUrl}
                                alt={scienceQuestImage.description}
                                width={150}
                                height={100}
                                className="rounded-lg object-cover"
                                data-ai-hint={scienceQuestImage.imageHint}
                            />
                        )}
                        <div className="flex-1">
                            <Badge variant="secondary" className="mb-2">Science</Badge>
                            <h3 className="text-lg font-semibold">The Solar System</h3>
                            <p className="text-sm text-muted-foreground mt-1">Mission 3 of 5: The Gas Giants</p>
                            <Progress value={60} className="mt-3 h-2" />
                        </div>
                        <Button className="mt-4 sm:mt-0">
                            <BookOpen className="mr-2 h-4 w-4" />
                            Continue
                        </Button>
                    </CardContent>
                </Card>

                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>My Badges</CardTitle>
                        <CardDescription>Your collection of achievements.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-2">
                            {badges.map(badge => (
                                <Badge key={badge.name} variant="outline" className="text-sm py-1 px-3">
                                    <Award className="mr-1.5 h-4 w-4 text-yellow-500" />
                                    {badge.name}
                                </Badge>
                            ))}
                       </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
