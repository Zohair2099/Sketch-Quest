
"use client"

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useAuth, useUser, useFirestore, setDocumentNonBlocking } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc } from 'firebase/firestore';

export default function SignupPage() {
  const router = useRouter();
  const auth = useAuth();
  const firestore = useFirestore();
  const { user } = useUser();
  const { toast } = useToast();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // If user is logged in, redirect to dashboard
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);


  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Passwords do not match",
        description: "Please check your passwords and try again.",
      });
      return;
    }
    setIsLoading(true);
    
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // This block executes on success.
        
        // Update Firebase Auth profile
        await updateProfile(userCredential.user, {
            displayName: username
        });

        // Create a user document in Firestore.
        const userRef = doc(firestore, 'users', userCredential.user.uid);
        const newUserProfile = {
          id: userCredential.user.uid,
          username: username,
          email: userCredential.user.email,
          role: 'Student',
          xp: 0,
          streak: 0,
          badges: [],
          completedLessons: [],
          avatar: '',
          bio: `Welcome to my SketchQuest profile!`,
          institutionId: '',
          gradeYear: '',
          preferredLanguage: 'en',
          darkMode: false,
        };
        // Use a non-blocking write to create the user profile.
        setDocumentNonBlocking(userRef, newUserProfile, { merge: false });
        
        toast({
          title: "Account Created!",
          description: "Redirecting you to the dashboard...",
        });
        // The onAuthStateChanged listener will handle the redirect automatically.
      })
      .catch((error) => {
        setIsLoading(false);
        let description = "Could not create your account. Please try again.";
        if (error.code === 'auth/email-already-in-use') {
            description = "This email is already in use. Please log in or use a different email.";
        } else if (error.code === 'auth/invalid-email') {
            description = "Please enter a valid email address.";
        }
        toast({
          variant: "destructive",
          title: "Signup Failed",
          description: description,
        });
      });
  };

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-headline">Create your Account</h1>
        <p className="text-muted-foreground">Join SketchQuest and start your learning adventure!</p>
      </div>
      <form onSubmit={handleSignup} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input id="username" type="text" placeholder="Your awesome name" required value={username} onChange={e => setUsername(e.target.value)} disabled={isLoading} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" type="email" placeholder="you@example.com" required value={email} onChange={e => setEmail(e.target.value)} disabled={isLoading} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" required value={password} onChange={e => setPassword(e.target.value)} disabled={isLoading} minLength={6}/>
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirm-password">Confirm Password</Label>
          <Input id="confirm-password" type="password" required value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} disabled={isLoading} minLength={6}/>
        </div>
        <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </Button>
      </form>
      <div className="mt-6 text-center text-sm">
        Already have an account?{' '}
        <Link href="/login" className="font-medium text-primary hover:underline">
          Log in
        </Link>
      </div>
    </>
  );
}
