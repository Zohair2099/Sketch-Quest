
'use client';

import { Award, Crown, Share2 } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const leaderboardData = [
  { rank: 1, name: 'Alex', xp: 4820, avatarId: 'avatar-1' },
  { rank: 2, name: 'Bella', xp: 4510, avatarId: 'avatar-2' },
  { rank: 3, name: 'Charlie', xp: 4200, avatarId: 'avatar-3' },
  { rank: 4, name: 'Diana', xp: 3980, avatarId: 'avatar-1' },
  { rank: 5, name: 'Ethan', xp: 3750, avatarId: 'avatar-2' },
  { rank: 6, name: 'Fiona', xp: 3500, avatarId: 'avatar-3' },
  { rank: 7, name: 'George', xp: 3200, avatarId: 'avatar-1' },
];

export default function LeaderboardPage() {
  const { toast } = useToast();
  const getAvatar = (id: string) => PlaceHolderImages.find(img => img.id === id);

  const handleShare = (name: string, rank: number) => {
    toast({
      title: 'Share Your Achievement!',
      description: `You shared ${name}'s rank of #${rank}. Great job!`,
    });
    // In a real app, this would open a share dialog
    console.log(`Sharing rank for ${name}: #${rank}`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Leaderboard</CardTitle>
        <CardDescription>See who's at the top of their game!</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="class">
          <TabsList className="grid w-full grid-cols-3 md:w-auto md:inline-flex">
            <TabsTrigger value="class">Class</TabsTrigger>
            <TabsTrigger value="school">School</TabsTrigger>
            <TabsTrigger value="global">Global</TabsTrigger>
          </TabsList>
          <TabsContent value="class" className="mt-4">
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
                {leaderboardData.map((player) => {
                  const avatar = getAvatar(player.avatarId);
                  return (
                    <TableRow key={player.rank} className={player.rank <= 3 ? "bg-accent/20" : ""}>
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
                })}
              </TableBody>
            </Table>
          </TabsContent>
          <TabsContent value="school"><p className="text-muted-foreground p-8 text-center">School leaderboard coming soon!</p></TabsContent>
          <TabsContent value="global"><p className="text-muted-foreground p-8 text-center">Global leaderboard coming soon!</p></TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
