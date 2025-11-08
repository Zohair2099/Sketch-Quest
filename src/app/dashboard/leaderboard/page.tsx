
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

const leaderboardData = {
  class: [
    { rank: 1, name: 'Alex', xp: 4820, avatarId: 'avatar-1' },
    { rank: 2, name: 'Bella', xp: 4510, avatarId: 'avatar-2' },
    { rank: 3, name: 'Charlie', xp: 4200, avatarId: 'avatar-3' },
    { rank: 4, name: 'Diana', xp: 3980, avatarId: 'avatar-1' },
    { rank: 5, name: 'You', xp: 3850, avatarId: 'avatar-1' },
    { rank: 6, name: 'Ethan', xp: 3750, avatarId: 'avatar-2' },
    { rank: 7, name: 'Fiona', xp: 3500, avatarId: 'avatar-3' },
    { rank: 8, name: 'George', xp: 3320, avatarId: 'avatar-1' },
    { rank: 9, name: 'Hannah', xp: 3100, avatarId: 'avatar-2' },
    { rank: 10, name: 'Ian', xp: 2950, avatarId: 'avatar-3' },
    { rank: 11, name: 'Julia', xp: 2800, avatarId: 'avatar-2' },
    { rank: 12, name: 'Kevin', xp: 2650, avatarId: 'avatar-1' },
    { rank: 13, name: 'Laura', xp: 2500, avatarId: 'avatar-3' },
    { rank: 14, name: 'Mike', xp: 2350, avatarId: 'avatar-1' },
    { rank: 15, name: 'Nora', xp: 2200, avatarId: 'avatar-2' },
  ],
  school: [
    { rank: 1, name: 'Oakridge High', xp: 258000, avatarId: 'quest-science' },
    { rank: 2, name: 'Maplewood Secondary', xp: 241000, avatarId: 'quest-coding' },
    { rank: 3, name: 'Cedar Creek Academy', xp: 235000, avatarId: 'quest-art' },
    { rank: 4, name: 'Pine Ridge School', xp: 220000, avatarId: 'quest-python' },
    { rank: 5, name: 'Your School', xp: 215000, avatarId: 'hero-illustration' },
    { rank: 6, name: 'Riverdale Institute', xp: 201000, avatarId: 'quest-science' },
    { rank: 7, name: 'Mountain View Prep', xp: 198000, avatarId: 'quest-coding' },
    { rank: 8, name: 'Lakeside Grammar', xp: 185000, avatarId: 'quest-art' },
    { rank: 9, name: 'Valley Technical', xp: 172000, avatarId: 'quest-python' },
    { rank: 10, name: 'Northwood High', xp: 168000, avatarId: 'hero-illustration' },
  ],
  state: [
    { rank: 1, name: 'Olivia', xp: 9850, avatarId: 'avatar-2' },
    { rank: 2, name: 'Liam', xp: 9700, avatarId: 'avatar-1' },
    { rank: 3, name: 'Emma', xp: 9600, avatarId: 'avatar-3' },
    { rank: 4, name: 'Noah', xp: 9550, avatarId: 'avatar-1' },
    { rank: 5, name: 'Ava', xp: 9400, avatarId: 'avatar-2' },
    { rank: 6, name: 'Elijah', xp: 9320, avatarId: 'avatar-1' },
    { rank: 7, name: 'Sophia', xp: 9150, avatarId: 'avatar-3' },
    { rank: 8, name: 'James', xp: 9000, avatarId: 'avatar-1' },
    { rank: 9, name: 'Isabella', xp: 8850, avatarId: 'avatar-2' },
    { rank: 10, name: 'William', xp: 8700, avatarId: 'avatar-1' },
    { rank: 11, name: 'Mia', xp: 8550, avatarId: 'avatar-3' },
    { rank: 12, name: 'Benjamin', xp: 8400, avatarId: 'avatar-1' },
    { rank: 13, name: 'Charlotte', xp: 8250, avatarId: 'avatar-2' },
    { rank: 25, name: 'You', xp: 3850, avatarId: 'avatar-1' },
  ],
  country: [
    { rank: 1, name: 'Noah', xp: 15200, avatarId: 'avatar-1' },
    { rank: 2, name: 'Ava', xp: 14900, avatarId: 'avatar-2' },
    { rank: 3, name: 'Isabella', xp: 14850, avatarId: 'avatar-3' },
    { rank: 4, name: 'Lucas', xp: 14700, avatarId: 'avatar-1' },
    { rank: 5, name: 'Mia', xp: 14650, avatarId: 'avatar-2' },
    { rank: 6, name: 'Mason', xp: 14500, avatarId: 'avatar-1' },
    { rank: 7, name: 'Amelia', xp: 14400, avatarId: 'avatar-3' },
    { rank: 8, name: 'Logan', xp: 14300, avatarId: 'avatar-1' },
    { rank: 9, name: 'Harper', xp: 14250, avatarId: 'avatar-2' },
    { rank: 10, name: 'Ethan', xp: 14100, avatarId: 'avatar-1' },
    { rank: 11, name: 'Evelyn', xp: 13950, avatarId: 'avatar-3' },
    { rank: 12, name: 'Aiden', xp: 13800, avatarId: 'avatar-1' },
    { rank: 13, name: 'Abigail', xp: 13650, avatarId: 'avatar-2' },
    { rank: 150, name: 'You', xp: 3850, avatarId: 'avatar-1' },
  ],
  global: [
    { rank: 1, name: 'Kenji', xp: 52300, avatarId: 'avatar-1' },
    { rank: 2, name: 'Fatima', xp: 51900, avatarId: 'avatar-2' },
    { rank: 3, name: 'Lars', xp: 51800, avatarId: 'avatar-3' },
    { rank: 4, name: 'Priya', xp: 51750, avatarId: 'avatar-2' },
    { rank: 5, name: 'Mateo', xp: 51600, avatarId: 'avatar-1' },
    { rank: 6, name: 'Chloe', xp: 51450, avatarId: 'avatar-3' },
    { rank: 7, name: 'David', xp: 51300, avatarId: 'avatar-1' },
    { rank: 8, name: 'Zoe', xp: 51200, avatarId: 'avatar-2' },
    { rank: 9, name: 'Leo', xp: 51150, avatarId: 'avatar-1' },
    { rank: 10, 'name': 'Nkechi', 'xp': 51000, 'avatarId': 'avatar-3' },
    { rank: 11, 'name': 'Santiago', 'xp': 50850, 'avatarId': 'avatar-1' },
    { rank: 12, 'name': 'Freja', 'xp': 50700, 'avatarId': 'avatar-2' },
    { rank: 13, 'name': 'Adil', 'xp': 50550, 'avatarId': 'avatar-3' },
    { rank: 14, 'name': 'Yuki', 'xp': 50400, 'avatarId': 'avatar-2' },
    { rank: 4032, name: 'You', xp: 3850, avatarId: 'avatar-1' },
  ],
};


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
  const currentData = leaderboardData[activeTab as keyof typeof leaderboardData] || [];

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
                    currentData.map((player, index) => {
                        const avatar = getAvatar(player.avatarId);
                        return (
                        <TableRow 
                            key={player.rank} 
                            className={cn(
                                player.rank <= 3 ? "bg-accent/20" : player.name === 'You' || player.name === 'Your School' ? 'bg-primary/10' : '',
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
        </Tabs>
      </CardContent>
    </Card>
  );
}
