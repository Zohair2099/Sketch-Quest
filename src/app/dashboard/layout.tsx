
'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Book, BarChart2, Home, Loader, Users, Bot, FlaskConical } from 'lucide-react';
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
    { href: '/dashboard/chatbot', icon: Bot, label: 'AI' },
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
      {settings.isTestMode && (
        <div className="bg-yellow-500 text-center py-1 text-sm font-semibold text-black flex items-center justify-center gap-2">
            <FlaskConical className="h-4 w-4" />
            You are in Test Mode
        </div>
      )}
      <DashboardHeader navItems={navItems} />
      <main className="flex-1 p-4 md:p-8 animate-in fade-in-50 pb-20 md:pb-8">
        {children}
      </main>
      {isMobile && <BottomSidebar navItems={navItems} />}
    </div>
  );
}
