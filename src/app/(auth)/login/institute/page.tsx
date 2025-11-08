
"use client"

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function InstituteLoginPage() {
  const router = useRouter();
  const auth = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // This would be replaced with SSO or institute-specific logic in a real app
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: "Login Successful",
        description: "Redirecting to your dashboard...",
      });
      router.push('/dashboard');
    } catch (error: any) {
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: "Invalid credentials. Please contact your institution's administrator.",
      });
    }
  };

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-headline">Educational Institute Login</h1>
        <p className="text-muted-foreground">Enter your institutional credentials to continue.</p>
      </div>
      <form onSubmit={handleLogin} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email">Institutional Email</Label>
          <Input id="email" type="email" placeholder="you@yourschool.edu" required value={email} onChange={e => setEmail(e.target.value)} disabled={isLoading} />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password or SSO</Label>
             <Link href="#" className="text-sm font-medium text-primary hover:underline">
              Help
            </Link>
          </div>
          <Input id="password" type="password" required value={password} onChange={e => setPassword(e.target.value)} disabled={isLoading} />
        </div>
        <Button 
          type="submit" 
          className="w-full" 
          size="lg" 
          disabled={isLoading}
        >
          {isLoading ? "Authenticating..." : "Institute Login"}
        </Button>
      </form>
       <div className="mt-6 text-center text-sm">
        <Link href="/login" className="text-sm font-medium text-muted-foreground hover:underline">
          &larr; Back to login options
        </Link>
      </div>
    </>
  );
}
