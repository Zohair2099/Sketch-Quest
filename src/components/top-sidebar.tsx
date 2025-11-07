'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from './logo';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

interface TopSidebarProps {
  navItems: NavItem[];
}

export function TopSidebar({ navItems }: TopSidebarProps) {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container mx-auto flex h-14 items-center px-4 md:px-6">
        <Link href="/dashboard" className="mr-6 flex items-center">
          <Logo />
        </Link>
        <div className="flex items-center gap-4 text-sm lg:gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-2 transition-colors hover:text-foreground',
                pathname.startsWith(item.href) && (item.href === '/dashboard' ? pathname === item.href : true)
                  ? 'text-foreground font-semibold'
                  : 'text-muted-foreground'
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
