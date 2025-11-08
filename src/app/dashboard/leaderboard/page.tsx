
'use client';

import { Award, Crown, Share2, Building, Users, LocateFixed } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
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
import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, limit } from 'firebase/firestore';

export default function LeaderboardPage() {
  const { toast } = useToast();
  const { user: currentUser } = useUser();
  const firestore = useFirestore();
  const getAvatar = (id: string) => PlaceHolderImages.find(img => img.id === id);
  const [isInstitutionView, setIsInstitutionView] = useState(false);
  const [activeTab, setActiveTab] = useState('global');
  const [showConfetti, setShowConfetti] = useState(true);

  // Firestore query for users sorted by XP
  const usersQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'users'), orderBy('xp', 'desc'), limit(100));
  }, [firestore]);

  const { data: usersData, isLoading: isUsersLoading } = useCollection(usersQuery);

  const leaderboardData = useMemo(() => {
    if (!usersData) return [];
    return usersData.map((user, index) => ({
      rank: index + 1,
      id: user.id,
      name: user.id === currentUser?.uid ? 'You' : user.username || user.email?.split('@')[0] || `User #${index + 1}`,
      xp: user.xp || 0,
      avatarId: user.avatar || 'avatar-1',
    }));
  }, [usersData, currentUser]);
  
  useEffect(() => {
    const confettiTimer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(confettiTimer);
  }, []);

  const handleShare = (name: string, rank: number) => {
    toast({
      title: 'Share Your Achievement!',
      description: `You shared ${name}'s rank of #${rank}. Great job!`,
    });
  };

  const handleFindMe = () => {
    const myRank = leaderboardData.find(u => u.id === currentUser?.uid);
    if (myRank) {
      toast({
        title: "Found you!",
        description: `You are ranked #${myRank.rank} globally.`,
      });
    } else {
      toast({
        variant: "destructive",
        title: "Not on the leaderboard yet",
        description: "Complete some quests to get ranked!",
      });
    }
  };

  const visibleTabs = [
    { value: 'global', label: 'Global' },
    // Add other tabs here as data becomes available
  ];
  const currentData = leaderboardData;

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
                    disabled // Disabled until institutional data is available
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
          <TabsList className="grid w-full grid-cols-1">
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
                    <TableHead>Student</TableHead>
                    <TableHead className="text-right">XP</TableHead>
                    <TableHead className="w-[100px] text-center">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {isUsersLoading ? (
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
                            key={player.id} 
                            className={cn(
                                player.rank <= 3 ? "bg-accent/20" : player.id === currentUser?.uid ? 'bg-primary/10' : '',
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
