'use client';
import Link from 'next/link';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { useSettings } from '@/context/settings-context';
import { translations } from '@/lib/translations';

export function Header() {
  const { settings } = useSettings();
  const t = (key: keyof typeof translations['en']) => {
    if (!settings) return translations['en'][key];
    return translations[settings.language as keyof typeof translations]?.[key] || translations['en'][key];
  };

  return (
    <header className="py-4 px-4 sm:px-6 lg:px-8 border-b">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/dashboard">
          <Logo />
        </Link>
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/#features" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            {t('features')}
          </Link>
          <Link href="/#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            {t('how_it_works')}
          </Link>
          <Link href="/dashboard/leaderboard" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            {t('leaderboard')}
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" asChild>
            <Link href="/login">{t('login')}</Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard">{t('get_started')}</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
