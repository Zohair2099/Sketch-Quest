"use client"

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '@/firebase';
import { initiateEmailSignIn } from '@/firebase/non-blocking-login';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

export default function LoginPage() {
  const router = useRouter();
  const auth = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState('gdg@demo.com');
  const [password, setPassword] = useState('12345678');
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
      if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
        // If user not found, try to create a new user
        try {
          await createUserWithEmailAndPassword(auth, email, password);
          toast({
            title: "Account Created & Logged In",
            description: "Redirecting to your dashboard...",
          });
          router.push('/dashboard');
        } catch (signupError: any) {
          setIsLoading(false);
          toast({
            variant: "destructive",
            title: "Signup Failed",
            description: signupError.message || "Could not create your account.",
          });
        }
      } else {
        setIsLoading(false);
        toast({
          variant: "destructive",
          title: "Login Failed",
          description: error.message || "An unexpected error occurred.",
        });
      }
    }
  };

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-headline">Welcome Back!</h1>
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
        <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Log In"}
        </Button>
      </form>
      <div className="mt-6 text-center text-sm">
        Don't have an account?{' '}
        <Link href="/signup" className="font-medium text-primary hover:underline">
          Sign up
        </Link>
      </div>
    </>
  );
}
