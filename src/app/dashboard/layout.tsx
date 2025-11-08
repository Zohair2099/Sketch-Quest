
"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  SidebarFooter,
} from "@/components/ui/sidebar"
import {
  Home,
  Book,
  BarChart2,
  Settings,
  UserCircle,
  LogOut,
  Loader,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Logo } from "@/components/logo"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { useUser, useAuth, useSidebar } from "@/firebase"
import { SidebarInset } from "@/components/ui/sidebar"
import { useSettings } from "@/context/settings-context"
import { translations } from "@/lib/translations"

function DashboardNav({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { user, isUserLoading } = useUser();
  const { settings } = useSettings();

  const t = (key: keyof typeof translations['en']) => {
    if (!settings) return translations['en'][key];
    return translations[settings.language as keyof typeof translations]?.[key] || translations['en'][key];
  };

  const navItems = [
    { href: "/dashboard", icon: Home, label: t('dashboard') },
    { href: "/dashboard/quests", icon: Book, label: t('quests') },
    { href: "/dashboard/leaderboard", icon: BarChart2, label: t('leaderboard') },
  ]
  
  if (isUserLoading || !user || !settings) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <>
      <Sidebar collapsible="icon" side={settings.sidebarPosition as 'left' | 'right'}>
        <SidebarHeader>
          <Logo />
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href}>
                  <SidebarMenuButton
                    isActive={pathname.startsWith(item.href) && (item.href === '/dashboard' ? pathname === item.href : true)}
                    tooltip={item.label}
                  >
                    <item.icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarToggleButton />
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6 sticky top-0 z-30">
          <SidebarTrigger className="md:hidden" />
          <div className="flex-1">
            <h1 className="text-lg font-semibold capitalize">
                {pathname.split('/').pop()?.replace('-', ' ') || 'Dashboard'}
            </h1>
          </div>
          <UserMenu />
        </header>
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </SidebarInset>
    </>
  )
}


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { user, isUserLoading } = useUser();
    
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
        )
    }

    return <DashboardNav>{children}</DashboardNav>;
}

function UserMenu() {
  const { user } = useUser();
  const { settings } = useSettings();
  const router = useRouter();
  const auth = useAuth();
  const avatarImage = PlaceHolderImages.find((img) => img.id === 'avatar-1');

  const t = (key: keyof typeof translations['en']) => {
    if (!settings) return translations['en'][key];
    return translations[settings.language as keyof typeof translations]?.[key] || translations['en'][key];
  };
  
  const handleLogout = () => {
    auth.signOut();
    router.push('/');
  }

  if(!user) return null;

  return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              {avatarImage && <AvatarImage src={user.photoURL || avatarImage.imageUrl} alt="User Avatar" data-ai-hint="student avatar" />}
              <AvatarFallback>{user.email?.[0].toUpperCase() || 'A'}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user.displayName || 'Alex'}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {user.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/dashboard/profile">
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

function SidebarToggleButton() {
  const { state, toggleSidebar } = useSidebar();

  if (state === 'collapsed') {
    return (
        <SidebarMenuButton
          onClick={toggleSidebar}
          aria-label="Expand sidebar"
          tooltip="Expand"
          className="justify-center"
        >
          <ChevronsRight className="w-5 h-5" />
        </SidebarMenuButton>
    )
  }

  return (
    <SidebarMenuButton
        onClick={toggleSidebar}
        aria-label="Collapse sidebar"
        tooltip="Collapse"
        className="justify-center"
    >
        <ChevronsLeft className="w-5 h-5" />
    </SidebarMenuButton>
  )
}
