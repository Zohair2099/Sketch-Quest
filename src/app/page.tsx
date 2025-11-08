'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Award, BarChart, BookOpen, Target } from 'lucide-react';
import { Logo } from '@/components/logo';
import { useSettings } from '@/context/settings-context';
import { translations } from '@/lib/translations';


export default function Home() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-illustration');
  const { settings } = useSettings();
  const t = (key: keyof typeof translations['en']) => {
    if (!settings) return translations['en'][key];
    return translations[settings.language as keyof typeof translations]?.[key] || translations['en'][key];
  };

  const features = [
    {
      icon: <Target className="h-10 w-10 text-primary" />,
      title: t('feature_interactive_title'),
      description: t('feature_interactive_desc'),
    },
    {
      icon: <Award className="h-10 w-10 text-primary" />,
      title: t('feature_rewards_title'),
      description: t('feature_rewards_desc'),
    },
    {
      icon: <BarChart className="h-10 w-10 text-primary" />,
      title: t('feature_leaderboard_title'),
      description: t('feature_leaderboard_desc'),
    },
    {
      icon: <BookOpen className="h-10 w-10 text-primary" />,
      title: t('feature_personalized_title'),
      description: t('feature_personalized_desc'),
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
              {t('hero_title')}
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('hero_subtitle')}
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/dashboard">{t('hero_cta')}</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 sm:py-24 bg-card">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold font-headline text-center text-foreground">
              {t('features_title')}
            </h2>
            <p className="mt-4 text-center text-muted-foreground max-w-2xl mx-auto">
              {t('features_subtitle')}
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
              {t('how_it_works_title')}
            </h2>
            <div className="mt-12 grid md:grid-cols-3 gap-8 md:gap-12 text-center">
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-accent text-accent-foreground text-2xl font-bold">1</div>
                <h3 className="mt-6 text-xl font-semibold font-headline">{t('step1_title')}</h3>
                <p className="mt-2 text-muted-foreground">{t('step1_desc')}</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-accent text-accent-foreground text-2xl font-bold">2</div>
                <h3 className="mt-6 text-xl font-semibold font-headline">{t('step2_title')}</h3>
                <p className="mt-2 text-muted-foreground">{t('step2_desc')}</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-accent text-accent-foreground text-2xl font-bold">3</div>
                <h3 className="mt-6 text-xl font-semibold font-headline">{t('step3_title')}</h3>
                <p className="mt-2 text-muted-foreground">{t('step3_desc')}</p>
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
            © {new Date().getFullYear()} SketchQuest. {t('footer_rights')}
          </p>
        </div>
      </footer>
    </div>
  );
}
