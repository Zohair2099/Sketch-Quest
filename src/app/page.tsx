import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Award, BarChart, BookOpen, Target } from 'lucide-react';
import { Logo } from '@/components/logo';

export default function Home() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-illustration');

  const features = [
    {
      icon: <Target className="h-10 w-10 text-primary" />,
      title: 'Interactive Quests',
      description: 'Engage in fun, bite-sized lessons designed as exciting quests to make learning an adventure.',
    },
    {
      icon: <Award className="h-10 w-10 text-primary" />,
      title: 'Earn Rewards & Badges',
      description: 'Stay motivated by earning XP, leveling up, and collecting unique badges for your achievements.',
    },
    {
      icon: <BarChart className="h-10 w-10 text-primary" />,
      title: 'Climb the Leaderboard',
      description: 'Compete with friends and classmates. See your rank rise on local and global leaderboards.',
    },
    {
      icon: <BookOpen className="h-10 w-10 text-primary" />,
      title: 'Personalized Learning',
      description: 'Our AI analyzes your performance to recommend the perfect quests to help you grow.',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 sm:py-24 lg:py-32 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tight text-foreground">
              Unlock Your Superpowers, One Quest at a Time.
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              SketchQuest transforms learning into a thrilling adventure. Complete quests, earn rewards, and master new skills in a fun, gamified environment.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/dashboard">Start Your Quest Free</Link>
              </Button>
            </div>
          </div>
          {heroImage && (
            <div className="mt-12 lg:mt-16">
              <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                width={1200}
                height={800}
                className="rounded-xl shadow-2xl"
                data-ai-hint={heroImage.imageHint}
                priority
              />
            </div>
          )}
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 sm:py-24 bg-card">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold font-headline text-center text-foreground">
              Why Students Love SketchQuest
            </h2>
            <p className="mt-4 text-center text-muted-foreground max-w-2xl mx-auto">
              We've packed SketchQuest with features to make learning engaging, rewarding, and effective.
            </p>
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <div key={feature.title} className="text-center">
                  <div className="flex items-center justify-center h-20 w-20 bg-primary/10 rounded-full mx-auto">
                    {feature.icon}
                  </div>
                  <h3 className="mt-6 text-xl font-semibold font-headline">{feature.title}</h3>
                  <p className="mt-2 text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 sm:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold font-headline text-center text-foreground">
              Your Adventure in 3 Simple Steps
            </h2>
            <div className="mt-12 grid md:grid-cols-3 gap-8 md:gap-12 text-center">
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-accent text-accent-foreground text-2xl font-bold">1</div>
                <h3 className="mt-6 text-xl font-semibold font-headline">Choose a Quest</h3>
                <p className="mt-2 text-muted-foreground">Pick a subject you want to master, from science to art.</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-accent text-accent-foreground text-2xl font-bold">2</div>
                <h3 className="mt-6 text-xl font-semibold font-headline">Complete Challenges</h3>
                <p className="mt-2 text-muted-foreground">Answer questions, solve puzzles, and complete mini-games.</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-accent text-accent-foreground text-2xl font-bold">3</div>
                <h3 className="mt-6 text-xl font-semibold font-headline">Level Up & Earn</h3>
                <p className="mt-2 text-muted-foreground">Gain XP, unlock badges, and watch your avatar grow.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 bg-card border-t">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
          <Logo className="h-8" />
          <p className="text-sm text-muted-foreground mt-4 sm:mt-0">
            © {new Date().getFullYear()} SketchQuest. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
