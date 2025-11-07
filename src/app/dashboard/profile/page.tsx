'use client';

import { useUser } from '@/firebase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProfilePage() {
  const { user, isUserLoading } = useUser();
  const avatarImage = PlaceHolderImages.find((img) => img.id === 'avatar-1');

  if (isUserLoading || !user) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold font-headline">Profile</h1>
        <Card>
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-8 w-48" />
            </CardTitle>
            <CardDescription>
              <Skeleton className="h-4 w-64" />
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <Skeleton className="h-24 w-24 rounded-full" />
             <Skeleton className="h-4 w-1/2" />
             <Skeleton className="h-4 w-1/3" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-headline">Profile</h1>
      <Card>
        <CardHeader>
          <CardTitle>{user.displayName || 'Anonymous User'}</CardTitle>
          <CardDescription>
            This is your personal profile page.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <Avatar className="h-24 w-24">
                {avatarImage && <AvatarImage src={user.photoURL || avatarImage.imageUrl} alt="User Avatar" data-ai-hint="student avatar" />}
                <AvatarFallback>{user.email?.[0].toUpperCase() || 'A'}</AvatarFallback>
            </Avatar>
            <div>
                <p className="font-semibold">Email</p>
                <p className="text-muted-foreground">{user.email}</p>
            </div>
             <div>
                <p className="font-semibold">UID</p>
                <p className="text-muted-foreground text-xs">{user.uid}</p>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
