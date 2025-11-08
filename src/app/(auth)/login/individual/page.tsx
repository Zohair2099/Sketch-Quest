
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

export default function IndividualLoginPage() {
  const router = useRouter();
  const auth = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
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
        description: "Invalid email or password. Please try again.",
      });
    }
  };

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-headline">Individual Login</h1>
        <p className="text-muted-foreground">Enter your credentials to access your account.</p>
      </div>
      <form onSubmit={handleLogin} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" type="email" placeholder="you@example.com" required value={email} onChange={e => setEmail(e.target.value)} disabled={isLoading} />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link href="#" className="text-sm font-medium text-primary hover:underline">
              Forgot password?
            </Link>
          </div>
          <Input id="password" type="password" required value={password} onChange={e => setPassword(e.target.value)} disabled={isLoading} />
        </div>
        <Button 
          type="submit" 
          className="w-full animate-bounce-slow shadow-lg hover:shadow-xl transform transition-all duration-300" 
          size="lg" 
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Student Login"}
        </Button>
      </form>
      <div className="mt-6 text-center text-sm">
        Don't have an account?{' '}
        <Link href="/signup" className="font-medium text-primary hover:underline">
          Sign up
        </Link>
      </div>
       <div className="mt-4 text-center text-sm">
        <Link href="/login" className="text-sm font-medium text-muted-foreground hover:underline">
          &larr; Back to login options
        </Link>
      </div>
    </>
  );
}
