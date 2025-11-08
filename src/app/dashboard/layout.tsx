
'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Book, BarChart2, Home, Loader, Users, Bot } from 'lucide-react';
import { useUser } from '@/firebase';
import { DashboardHeader } from '@/components/dashboard-header';
import { useIsMobile } from '@/hooks/use-mobile';
import { BottomSidebar } from '@/components/bottom-sidebar';
import { useSettings } from '@/context/settings-context';
import { translations } from '@/lib/translations';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, isUserLoading } = useUser();
  const isMobile = useIsMobile();
  const { settings } = useSettings();
  
  const t = (key: keyof (typeof translations)['en']) => {
    if (!settings) return translations['en'][key];
    return (
      translations[settings.language as keyof typeof translations]?.[key] ||
      translations['en'][key]
    );
  };
  
  const navItems = [
    { href: '/dashboard', icon: Home, label: t('dashboard') },
    { href: '/dashboard/quests', icon: Book, label: t('quests') },
    { href: '/dashboard/leaderboard', icon: BarChart2, label: t('leaderboard') },
    { href: '/dashboard/social', icon: Users, label: 'Social' },
  ];

  React.useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [isUserLoading, user, router]);

  if (isUserLoading || !user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <DashboardHeader navItems={navItems} />
      <main className="flex-1 p-4 md:p-8 animate-in fade-in-50 pb-20 md:pb-8">
        {children}
      </main>
      {isMobile && <BottomSidebar navItems={navItems} />}
    </div>
  );
}
