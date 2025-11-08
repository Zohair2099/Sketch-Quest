'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Home,
  Book,
  BarChart2,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  User,
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
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
import { cn } from '@/lib/utils';
import { useSidebar } from '@/context/sidebar-context';
import { useSettings } from '@/context/settings-context';
import { useAuth, useUser } from '@/firebase';
import { translations } from '@/lib/translations';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Logo } from './logo';

export function Sidebar() {
  const { isCollapsed, toggleSidebar } = useSidebar();
  const { settings } = useSettings();
  const pathname = usePathname();

  const t = (key: keyof typeof translations['en']) => {
    return (
      translations[settings.language as keyof typeof translations]?.[key] ||
      translations['en'][key]
    );
  };

  const navItems = [
    { href: '/dashboard', icon: Home, label: t('dashboard') },
    { href: '/dashboard/quests', icon: Book, label: t('quests') },
    {
      href: '/dashboard/leaderboard',
      icon: BarChart2,
      label: t('leaderboard'),
    },
  ];

  return (
    <div
      className={cn(
        'hidden md:flex flex-col border-r bg-background transition-all duration-300 ease-in-out',
        isCollapsed ? 'w-20' : 'w-64'
      )}
    >
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Logo className={isCollapsed ? 'h-6' : 'h-8'} />
        </Link>
      </div>
      <nav className="flex-1 overflow-y-auto overflow-x-hidden px-2 py-4 lg:px-4">
        <TooltipProvider delayDuration={0}>
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        'flex h-9 items-center justify-start rounded-lg px-3 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground',
                        pathname === item.href &&
                          'bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground',
                        isCollapsed && 'justify-center'
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      <span
                        className={cn(
                          'ml-4 whitespace-nowrap transition-opacity',
                          isCollapsed ? 'opacity-0 w-0' : 'opacity-100'
                        )}
                      >
                        {item.label}
                      </span>
                    </Link>
                  </TooltipTrigger>
                  {isCollapsed && (
                    <TooltipContent side="right">
                      <p>{item.label}</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              </li>
            ))}
          </ul>
        </TooltipProvider>
      </nav>
      <div className="mt-auto border-t p-4">
        <UserMenu isCollapsed={isCollapsed} />
        <SidebarToggleButton />
      </div>
    </div>
  );
}

function UserMenu({ isCollapsed }: { isCollapsed: boolean }) {
  const { user } = useUser();
  const { settings } = useSettings();
  const router = useRouter();
  const auth = useAuth();
  const avatarImage = PlaceHolderImages.find((img) => img.id === 'avatar-1');

  const t = (key: keyof (typeof translations)['en']) => {
    return (
      translations[settings.language as keyof typeof translations]?.[key] ||
      translations['en'][key]
    );
  };

  const handleLogout = () => {
    auth.signOut();
    router.push('/');
  };

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            'flex w-full items-center gap-2 px-2 text-left',
            isCollapsed ? 'justify-center' : 'justify-start'
          )}
        >
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={user.photoURL || avatarImage?.imageUrl}
              alt="User Avatar"
            />
            <AvatarFallback>
              {user.email?.[0].toUpperCase() || 'A'}
            </AvatarFallback>
          </Avatar>
          <div
            className={cn(
              'flex flex-col',
              isCollapsed ? 'hidden' : 'inline-block'
            )}
          >
            <span className="text-sm font-medium">
              {user.displayName || 'Alex'}
            </span>
            <span className="text-xs text-muted-foreground">
              {user.email}
            </span>
          </div>
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
          <Link href="/dashboard/profile">
            <User className="mr-2 h-4 w-4" />
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

function SidebarToggleButton() {
  const { isCollapsed, toggleSidebar } = useSidebar();
  return (
    <div className="mt-4 flex w-full justify-center">
      <Button variant="ghost" size="icon" onClick={toggleSidebar}>
        {isCollapsed ? (
          <ChevronRight className="h-5 w-5" />
        ) : (
          <ChevronLeft className="h-5 w-5" />
        )}
      </Button>
    </div>
  );
}
