
'use client';

import { Award, Crown, Share2, Building, Users, LocateFixed } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Skeleton } from '@/components/ui/skeleton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import Confetti from 'react-confetti';

const leaderboardData = [
  { rank: 1, name: 'Alex', xp: 4820, avatarId: 'avatar-1' },
  { rank: 2, name: 'Bella', xp: 4510, avatarId: 'avatar-2' },
  { rank: 3, name: 'Charlie', xp: 4200, avatarId: 'avatar-3' },
  { rank: 4, name: 'Diana', xp: 3980, avatarId: 'avatar-1' },
  { rank: 5, name: 'Ethan', xp: 3750, avatarId: 'avatar-2' },
  { rank: 6, name: 'Fiona', xp: 3500, avatarId: 'avatar-3' },
  { rank: 7, name: 'George', xp: 3200, avatarId: 'avatar-1' },
  { rank: 12, name: 'You', xp: 2800, avatarId: 'avatar-1' },
];

export default function LeaderboardPage() {
  const { toast } = useToast();
  const getAvatar = (id: string) => PlaceHolderImages.find(img => img.id === id);
  const [isLoading, setIsLoading] = useState(true);
  const [isInstitutionView, setIsInstitutionView] = useState(false);
  const [activeTab, setActiveTab] = useState('class');
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    // Simulate data fetching
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    // Stop confetti after a few seconds
    const confettiTimer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
    return () => {
      clearTimeout(timer);
      clearTimeout(confettiTimer);
    }
  }, []);

  useEffect(() => {
    // Reset to the first available tab when the view mode changes
    if (isInstitutionView) {
        setActiveTab('class');
    } else {
        setActiveTab('state');
    }
  }, [isInstitutionView]);

  const handleShare = (name: string, rank: number) => {
    toast({
      title: 'Share Your Achievement!',
      description: `You shared ${name}'s rank of #${rank}. Great job!`,
    });
    // In a real app, this would open a share dialog
    console.log(`Sharing rank for ${name}: #${rank}`);
  };

  const handleFindMe = () => {
    toast({
        title: "Found you!",
        description: "You are ranked #12 in your class."
    });
  }

  const institutionTabs = [
    { value: 'class', label: 'Class' },
    { value: 'school', label: 'School' },
  ];

  const individualTabs = [
    { value: 'state', label: 'State' },
    { value: 'country', label: 'Country' },
    { value: 'global', label: 'Global' },
  ];

  const visibleTabs = isInstitutionView ? institutionTabs : individualTabs;

  return (
    <Card>
      {showConfetti && <Confetti recycle={false} onConfettiComplete={() => setShowConfetti(false)} />}
      <CardHeader className="space-y-4">
        <CardTitle>Leaderboard</CardTitle>
        <CardDescription>See who's at the top of their game! Switch between individual and institutional rankings.</CardDescription>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-muted-foreground" />
                <Label htmlFor="view-mode-switch">Individual</Label>
                <Switch 
                    id="view-mode-switch"
                    checked={isInstitutionView}
                    onCheckedChange={setIsInstitutionView}
                />
                <Label htmlFor="view-mode-switch">Institution</Label>
                <Building className="h-5 w-5 text-muted-foreground" />
            </div>

            <div className="flex w-full md:w-auto items-center gap-2">
                <Select defaultValue="all-time">
                    <SelectTrigger className="w-full md:w-[150px]">
                        <SelectValue placeholder="Time" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all-time">All Time</SelectItem>
                        <SelectItem value="this-week">This Week</SelectItem>
                        <SelectItem value="this-month">This Month</SelectItem>
                    </SelectContent>
                </Select>
                 <Select defaultValue="xp">
                    <SelectTrigger className="w-full md:w-[150px]">
                        <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="xp">Performance (XP)</SelectItem>
                        <SelectItem value="streak">Streak</SelectItem>
                    </SelectContent>
                </Select>
                <Button variant="outline" onClick={handleFindMe}>
                    <LocateFixed className="mr-2 h-4 w-4" />
                    My Level
                </Button>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3">
             {visibleTabs.map(tab => (
                <TabsTrigger key={tab.value} value={tab.value}>{tab.label}</TabsTrigger>
             ))}
          </TabsList>
          
          {visibleTabs.map(tab => (
             <TabsContent key={tab.value} value={tab.value} className="mt-4">
                <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead className="w-[80px]">Rank</TableHead>
                    <TableHead>{isInstitutionView ? 'Institution' : 'Student'}</TableHead>
                    <TableHead className="text-right">XP</TableHead>
                    <TableHead className="w-[100px] text-center">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {isLoading ? (
                    Array.from({ length: 7 }).map((_, index) => (
                        <TableRow key={index}>
                        <TableCell><Skeleton className="h-8 w-8 rounded-full" /></TableCell>
                        <TableCell>
                            <div className="flex items-center gap-4">
                            <Skeleton className="h-10 w-10 rounded-full" />
                            <Skeleton className="h-6 w-24" />
                            </div>
                        </TableCell>
                        <TableCell className="text-right"><Skeleton className="h-6 w-16 ml-auto" /></TableCell>
                        <TableCell className="text-center"><Skeleton className="h-8 w-8 mx-auto" /></TableCell>
                        </TableRow>
                    ))
                    ) : (
                    leaderboardData.map((player, index) => {
                        const avatar = getAvatar(player.avatarId);
                        return (
                        <TableRow 
                            key={player.rank} 
                            className={cn(
                                player.rank <= 3 ? "bg-accent/20" : player.name === 'You' ? 'bg-primary/10' : '',
                                "opacity-0 animate-in fade-in-0"
                            )}
                            style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
                        >
                            <TableCell className="font-medium text-lg">
                            <div className="flex items-center justify-center w-8 h-8">
                                {player.rank === 1 && <Crown className="w-6 h-6 text-yellow-500" />}
                                {player.rank === 2 && <Award className="w-5 h-5 text-gray-400" />}
                                {player.rank === 3 && <Award className="w-5 h-5 text-amber-700" />}
                                {player.rank > 3 && player.rank}
                            </div>
                            </TableCell>
                            <TableCell>
                            <div className="flex items-center gap-4">
                                <Avatar>
                                {avatar && <AvatarImage src={avatar.imageUrl} alt={player.name} />}
                                <AvatarFallback>{player.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span className="font-medium">{player.name}</span>
                            </div>
                            </TableCell>
                            <TableCell className="text-right font-bold">{player.xp.toLocaleString()}</TableCell>
                            <TableCell className="text-center">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleShare(player.name, player.rank)}
                                aria-label={`Share ${player.name}'s rank`}
                            >
                                <Share2 className="h-4 w-4" />
                            </Button>
                            </TableCell>
                        </TableRow>
                        );
                    })
                    )}
                </TableBody>
                </Table>
             </TabsContent>
          ))}

          {/* Placeholder content for tabs not currently visible */}
          {(!isInstitutionView && <TabsContent value="class"><p className="text-muted-foreground p-8 text-center">Switch to Institution view to see Class leaderboards.</p></TabsContent>)}
          {(!isInstitutionView && <TabsContent value="school"><p className="text-muted-foreground p-8 text-center">Switch to Institution view to see School leaderboards.</p></TabsContent>)}

          {(isInstitutionView && <TabsContent value="state"><p className="text-muted-foreground p-8 text-center">Switch to Individual view to see State leaderboards.</p></TabsContent>)}
          {(isInstitutionView && <TabsContent value="country"><p className="text-muted-foreground p-8 text-center">Switch to Individual view to see Country leaderboards.</p></TabsContent>)}
          {(isInstitutionView && <TabsContent value="global"><p className="text-muted-foreground p-8 text-center">Switch to Individual view to see Global leaderboards.</p></TabsContent>)}

        </Tabs>
      </CardContent>
    </Card>
  );
}
