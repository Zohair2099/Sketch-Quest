'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useUser } from '@/firebase';
import { Logo } from '@/components/logo';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Skeleton } from '@/components/ui/skeleton';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const mascotImage = PlaceHolderImages.find((img) => img.id === 'mascot-friendly');
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && user) {
      router.push('/dashboard');
    }
  }, [user, isUserLoading, router]);
  
  if (isUserLoading || user) {
    return (
       <div className="min-h-screen flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <Logo />
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
       </div>
    )
  }
  
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12 bg-card">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <Link href="/" aria-label="Back to homepage">
              <Logo />
            </Link>
          </div>
          {children}
        </div>
      </div>
      <div className="hidden lg:flex w-1/2 items-center justify-center bg-primary p-12 relative overflow-hidden">
        <div className="text-center">
          {mascotImage && (
             <Image
              src={mascotImage.imageUrl}
              alt={mascotImage.description}
              width={400}
              height={400}
              className="mb-8 mx-auto"
              data-ai-hint={mascotImage.imageHint}
            />
          )}
          <h2 className="text-3xl font-bold font-headline text-primary-foreground">Ready for your next Quest?</h2>
          <p className="text-primary-foreground/80 mt-2 max-w-sm mx-auto">Learning is an adventure waiting to happen. Let's get started!</p>
        </div>
        {/* Decorative shapes */}
        <div className="absolute top-10 -left-10 w-40 h-40 bg-white/10 rounded-full"></div>
        <div className="absolute bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full"></div>
      </div>
    </div>
  )
}
