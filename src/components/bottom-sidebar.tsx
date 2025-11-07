'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

interface BottomSidebarProps {
  navItems: NavItem[];
}

export function BottomSidebar({ navItems }: BottomSidebarProps) {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 z-40 w-full border-t bg-background md:hidden">
      <div className="grid h-14 grid-cols-3 items-center px-4">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex flex-col items-center justify-center gap-1 text-xs transition-colors hover:text-foreground',
              pathname.startsWith(item.href) && (item.href === '/dashboard' ? pathname === item.href : true)
                ? 'text-primary font-semibold'
                : 'text-muted-foreground'
            )}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
