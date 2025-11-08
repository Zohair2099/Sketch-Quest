
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { User, Building } from 'lucide-react';

export default function LoginPage() {
  return (
    <>
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold font-headline">Choose Your Path</h1>
        <p className="text-muted-foreground">Are you an individual learner or part of an institution?</p>
      </div>
      
      <div className="space-y-4">
        <Button size="lg" className="w-full h-20 text-lg flex-col" asChild>
          <Link href="/login/individual">
            <div className="flex items-center gap-4">
              <User className="h-6 w-6" />
              <span>Individual Login</span>
            </div>
          </Link>
        </Button>
        <Button size="lg" variant="secondary" className="w-full h-20 text-lg flex-col" asChild>
          <Link href="/login/institute">
            <div className="flex items-center gap-4">
              <Building className="h-6 w-6" />
              <span>Educational Institute Login</span>
            </div>
          </Link>
        </Button>
      </div>

      <div className="mt-6 text-center text-sm">
        Don't have an account?{' '}
        <Link href="/signup" className="font-medium text-primary hover:underline">
          Sign up as an Individual
        </Link>
      </div>
    </>
  );
}
