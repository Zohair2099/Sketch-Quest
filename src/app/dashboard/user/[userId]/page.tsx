
'use client';

import { useUser, useFirestore, useDoc, useMemoFirebase, updateDocumentNonBlocking, setDocumentNonBlocking, increment } from '@/firebase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { doc } from 'firebase/firestore';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Activity, Award, BarChart3, Book, Bot, Calendar, Edit, FlaskConical, Flame, Goal, Mail, Shield, Star, Swords, Target, Trash2, Trophy, UserPlus, Users, PlusCircle
} from 'lucide-react';
import Link from 'next/link';
import { useSettings } from '@/context/settings-context';
import { useToast } from '@/hooks/use-toast';
import { defaultSettings } from '@/context/settings-context';

const skillData = [
  { name: 'Python', level: 0, fill: "var(--color-python)" },
  { name: 'JS', level: 0, fill: "var(--color-js)" },
  { name: 'Art', level: 0, fill: "var(--color-art)" },
  { name: 'Math', level: 0, fill: "var(--color-math)" },
  { name: 'Science', level: 0, fill: "var(--color-science)" },
];

const chartConfig = {
  level: {
    label: "Level",
  },
  python: {
    label: "Python",
    color: "hsl(var(--chart-1))",
  },
  js: {
    label: "JavaScript",
    color: "hsl(var(--chart-2))",
  },
  art: {
    label: "Art",
    color: "hsl(var(--chart-3))",
  },
  math: {
    label: "Math",
    color: "hsl(var(--chart-4))",
  },
  science: {
    label: "Science",
    color: "hsl(var(--chart-5))",
  },
}

const badges = [
  { name: 'Code Beginner', icon: <Star className="w-4 h-4" />, description: 'Completed your first coding quest.' },
  { name: 'Variable Explorer', icon: <Award className="w-4 h-4" />, description: 'Mastered the art of variables.' },
  { name: 'Logic Knight', icon: <Shield className="w-4 h-4" />, description: 'Conquered complex conditional logic.' },
  { name: 'Pythonista', icon: <Bot className="w-4 h-4" />, description: 'Achieved Level 10 in Python.' },
  { name: 'Streak Starter', icon: <Flame className="w-4 h-4" />, description: 'Maintained a 3-day streak.' },
];

const recentActivities: any[] = []

export default function ProfilePage() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const { settings, updateSetting } = useSettings();
  const { toast } = useToast();

  const userDocRef = useMemoFirebase(() => {
    if (!user) return null;
    return doc(firestore, 'users', user.uid);
  }, [user, firestore]);
  
  const { data: userData, isLoading: isUserDocLoading } = useDoc(userDocRef);

  const avatarImage = PlaceHolderImages.find((img) => img.id === 'avatar-1');

  const handleResetAccount = () => {
      if (!userDocRef) return;
      const resetData = {
          xp: 0,
          streak: 0,
          badges: [],
      };
      setDocumentNonBlocking(userDocRef, resetData, { merge: true });
      toast({
          title: "Account Reset",
          description: "Your points and progress have been reset to zero."
      });
  };

  const handleToggleTestMode = () => {
      const newTestModeState = !settings.isTestMode;
      updateSetting('isTestMode', newTestModeState);
      toast({
          title: newTestModeState ? "Test Mode Enabled" : "Test Mode Disabled",
          description: newTestModeState ? "The test mode banner is now visible." : "You have returned to normal mode."
      });
  };

  const handleAddXp = () => {
      if (!userDocRef) return;
      updateDocumentNonBlocking(userDocRef, {
          xp: increment(1000)
      });
      toast({
          title: "XP Added!",
          description: "You've been awarded 1,000 XP."
      });
  };

  if (isUserLoading || !user) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-24 w-24 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-64" />
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
        </div>
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header section */}
      <Card className="animate-in fade-in-50">
        <CardContent className="p-6 flex flex-col md:flex-row items-center gap-6">
          <Avatar className="h-24 w-24 border-4 border-primary">
            {avatarImage && <AvatarImage src={user.photoURL || avatarImage.imageUrl} alt="User Avatar" data-ai-hint="student avatar" />}
            <AvatarFallback>{user.email?.[0].toUpperCase() || 'A'}</AvatarFallback>
          </Avatar>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold font-headline">{user.displayName || 'Alex Ryder'}</h1>
            <p className="text-muted-foreground text-lg">“Future Tech Leader”</p>
            <div className="mt-2 flex items-center justify-center md:justify-start gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>SketchQuest University</span>
                </div>
                 <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>Joined August 2024</span>
                </div>
            </div>
          </div>
          <div className="flex gap-2">
             <Button>
                <UserPlus className="mr-2 h-4 w-4" /> Follow
             </Button>
             <Button variant="outline">
                <Mail className="mr-2 h-4 w-4" /> Message
             </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
           {/* Gamification & Progress */}
          <Card className="animate-in fade-in-50 delay-150">
            <CardHeader>
              <CardTitle>Gamification & Progress</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 text-center">
              <div className="flex flex-col items-center gap-2">
                <p className="text-sm text-muted-foreground">Rank</p>
                <p className="text-3xl font-bold">#0</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <p className="text-sm text-muted-foreground">XP</p>
                <p className="text-3xl font-bold">{isUserDocLoading ? <Skeleton className="h-8 w-16 mx-auto" /> : (userData?.xp ?? 0).toLocaleString()}</p>
              </div>
               <div className="flex flex-col items-center gap-2">
                <p className="text-sm text-muted-foreground">Streak</p>
                <div className="flex items-center text-3xl font-bold">
                    <Flame className="w-7 h-7 text-orange-500 mr-1" />
                    {isUserDocLoading ? <Skeleton className="h-8 w-8 mx-auto" /> : userData?.streak ?? 0}
                </div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <p className="text-sm text-muted-foreground">Quests Done</p>
                <p className="text-3xl font-bold">0</p>
              </div>
            </CardContent>
             <CardContent>
                <p className="text-sm font-medium mb-3 text-center">Badges Earned</p>
                 <TooltipProvider>
                    <div className="flex justify-center gap-4">
                    {badges.map(badge => (
                        <Tooltip key={badge.name}>
                        <TooltipTrigger asChild>
                            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-accent text-accent-foreground cursor-pointer opacity-50">
                            {badge.icon}
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p className="font-semibold">{badge.name}</p>
                            <p className="text-sm text-muted-foreground">{badge.description}</p>
                        </TooltipContent>
                        </Tooltip>
                    ))}
                    </div>
                </TooltipProvider>
            </CardContent>
          </Card>
          
          {/* Skill Insights */}
          <Card className="animate-in fade-in-50 delay-300">
            <CardHeader>
              <CardTitle>Skill & Activity Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
                <div>
                    <h3 className="text-lg font-semibold mb-4">Skill Graph</h3>
                     <ChartContainer config={chartConfig} className="h-[250px] w-full">
                        <BarChart data={skillData} layout="vertical" margin={{ left: 10, right: 30 }}>
                            <CartesianGrid horizontal={false} />
                            <YAxis 
                                dataKey="name" 
                                type="category" 
                                tickLine={false} 
                                axisLine={false} 
                                tickMargin={10}
                                className="text-sm"
                            />
                            <XAxis dataKey="level" type="number" hide />
                            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                            <Bar dataKey="level" radius={8}>
                                {skillData.map((entry, index) => (
                                    <div key={`cell-${index}`} fill={entry.fill} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ChartContainer>
                </div>
                <Separator />
                <div>
                     <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                     {recentActivities.length > 0 ? (
                        <ul className="space-y-4">
                            {recentActivities.map((activity, index) => (
                                <li key={index} className="flex items-center gap-4 text-sm">
                                    {activity.icon}
                                    <span className="flex-1 text-muted-foreground">{activity.text}</span>
                                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                                </li>
                            ))}
                        </ul>
                     ) : (
                        <p className="text-sm text-muted-foreground text-center py-4">No recent activity. Complete a quest to get started!</p>
                     )}
                </div>
            </CardContent>
          </Card>

          {/* Goals & Motivation */}
          <Card className="animate-in fade-in-50 delay-450">
            <CardHeader>
                <CardTitle>Goals & Motivation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground text-center py-4">No goals set yet. Set a goal to start your journey!</p>
            </CardContent>
          </Card>

          {/* Advanced Settings */}
          <Card className="animate-in fade-in-50 delay-500">
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
              <CardDescription>Handle with care. These actions are irreversible.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row gap-4">
              <Button variant="destructive" onClick={handleResetAccount}>
                <Trash2 className="mr-2 h-4 w-4" />
                Reset Account
              </Button>
              <Button variant="outline" onClick={handleToggleTestMode}>
                <FlaskConical className="mr-2 h-4 w-4" />
                {settings.isTestMode ? "Exit Test Mode" : "Enter Test Mode"}
              </Button>
              <Button variant="outline" onClick={handleAddXp}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add 1000 XP
              </Button>
            </CardContent>
          </Card>
        </div>
        
        {/* Right Sidebar */}
        <div className="space-y-8">
            <Card className="animate-in fade-in-50 delay-150">
                <CardHeader>
                    <CardTitle>Social & Community</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex justify-around text-center">
                        <div>
                            <p className="text-2xl font-bold">0</p>
                            <p className="text-sm text-muted-foreground">Followers</p>
                        </div>
                        <div>
                            <p className="text-2xl font-bold">0</p>
                            <p className="text-sm text-muted-foreground">Following</p>
                        </div>
                    </div>
                    <Separator />
                    <h4 className="font-semibold">Team Info</h4>
                    <p className="text-sm text-muted-foreground text-center py-4">You are not part of a team yet.</p>
                </CardContent>
            </Card>

            <Card className="animate-in fade-in-50 delay-300">
                <CardHeader>
                    <CardTitle>Settings & Customization</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col space-y-2">
                    <Button variant="ghost" className="justify-start" asChild>
                        <Link href={`/dashboard/user/${user.uid}`}>
                            <Edit className="mr-2 h-4 w-4" /> Edit Profile
                        </Link>
                    </Button>
                     <Button variant="ghost" className="justify-start" asChild>
                        <Link href="/dashboard/settings">
                            <Shield className="mr-2 h-4 w-4" /> Privacy Controls
                        </Link>
                    </Button>
                     <Button variant="ghost" className="justify-start" asChild>
                        <Link href="/dashboard/settings">
                            <Bot className="mr-2 h-4 w-4" /> Avatar Customization
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}

// A placeholder icon component
function CheckCircle(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
      <polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
  );
}
