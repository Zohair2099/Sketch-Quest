
'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import {
  Settings,
  UserCircle,
  LogOut,
  PanelLeft,
  LucideIcon,
} from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useUser, useAuth } from '@/firebase';
import { useSettings } from '@/context/settings-context';
import { translations } from '@/lib/translations';
import { Logo } from '@/components/logo';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

interface DashboardHeaderProps {
  navItems: NavItem[];
}

export function DashboardHeader({ navItems }: DashboardHeaderProps) {
  const pathname = usePathname();
  const isMobile = useIsMobile();
  
  if (isMobile) {
    return (
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b bg-background px-4 md:hidden">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
          <Logo />
        </Link>
        <UserMenu />
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-30 hidden h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 md:flex">
       <div className="flex h-14 items-center">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
          <Logo />
        </Link>
      </div>

      {/* Mobile Menu (remains for smaller screen sizes if needed, though hidden by main logic) */}
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="/dashboard"
              className="group flex shrink-0 items-center justify-center gap-2 rounded-full text-lg font-semibold text-primary-foreground md:text-base"
            >
              <Logo />
              <span className="sr-only">SketchQuest</span>
            </Link>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground',
                   pathname === item.href && "text-foreground"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>

      <div className="ml-auto flex items-center gap-4">
        <nav className="hidden md:flex items-center space-x-2">
           {navItems.map(item => (
              <Link key={item.href} href={item.href} className={cn("text-base font-medium transition-colors hover:text-primary px-4 py-2 rounded-lg",
                 (pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/dashboard')) ? "text-primary bg-primary/10" : "text-muted-foreground"
              )}>
                 {item.label}
              </Link>
           ))}
        </nav>
        <UserMenu />
      </div>
    </header>
  );
}

function UserMenu() {
  const { user } = useUser();
  const { settings } = useSettings();
  const router = useRouter();
  const auth = useAuth();
  const avatarImage = PlaceHolderImages.find((img) => img.id === 'avatar-1');

  const t = (key: keyof (typeof translations)['en']) => {
    if (!settings) return translations['en'][key];
    return (
      translations[settings.language as keyof typeof translations]?.[key] ||
      translations['en'][key]
    );
  };

  const handleLogout = () => {
    auth.signOut().then(() => {
      // Force a full page reload to ensure all state is cleared.
      window.location.href = '/login';
    });
  };

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            {avatarImage && (
              <AvatarImage
                src={user.photoURL || avatarImage.imageUrl}
                alt="User Avatar"
                data-ai-hint="student avatar"
              />
            )}
            <AvatarFallback>
              {user.email?.[0].toUpperCase() || 'A'}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user.displayName || 'Alex'}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={`/dashboard/user/${user.uid}`}>
            <UserCircle className="mr-2 h-4 w-4" />
            <span>{t('profile')}</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/dashboard/settings">
            <Settings className="mr-2 h-4 w-4" />
            <span>{t('settings')}</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>{t('logout')}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
