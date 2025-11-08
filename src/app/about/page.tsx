
import Image from 'next/image';
import Link from 'next/link';
import { Mail, Linkedin, Github, Twitter, Code } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from '@/components/header';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function AboutPage() {
  const avatarImage = PlaceHolderImages.find((img) => img.id === 'creator-avatar');

  const skills = [
    'React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 
    'Firebase', 'Genkit', 'UI/UX Design', 'Project Management'
  ];

  const socialLinks = [
    { icon: <Mail className="h-5 w-5" />, href: 'mailto:creator@example.com', label: 'Email' },
    { icon: <Linkedin className="h-5 w-5" />, href: '#', label: 'LinkedIn' },
    { icon: <Github className="h-5 w-5" />, href: '#', label: 'GitHub' },
    { icon: <Twitter className="h-5 w-5" />, href: '#', label: 'Twitter' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12 sm:py-16 lg:py-20">
        <Card className="max-w-4xl mx-auto animate-in fade-in-50 duration-500">
          <CardHeader className="text-center p-8">
            {avatarImage && (
              <Avatar className="h-32 w-32 mx-auto border-4 border-primary shadow-lg">
                <AvatarImage src={avatarImage.imageUrl} alt="Creator's Avatar" data-ai-hint={avatarImage.imageHint}/>
                <AvatarFallback>SQ</AvatarFallback>
              </Avatar>
            )}
            <h1 className="text-4xl font-bold font-headline mt-4">Alex Doe</h1>
            <p className="text-xl text-muted-foreground">Creator of SketchQuest</p>
            <div className="mt-4 flex justify-center gap-3">
                {socialLinks.map((social) => (
                    <Button key={social.label} variant="outline" size="icon" asChild>
                        <Link href={social.href} aria-label={social.label}>
                            {social.icon}
                        </Link>
                    </Button>
                ))}
            </div>
          </CardHeader>
          <CardContent className="p-8 pt-0">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-semibold font-headline mb-4 border-b pb-2">About SketchQuest</h2>
                <p className="text-muted-foreground leading-relaxed">
                  SketchQuest was born from a passion for making education accessible, engaging, and genuinely fun. I believe that learning shouldn't be a chore, but an adventure. By blending proven educational concepts with the excitement of game mechanics, my goal is to empower students everywhere to unlock their full potential and discover a lifelong love for learning. This platform is my contribution to that vision.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold font-headline mb-4 border-b pb-2">My Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-base py-1 px-3">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                 <h2 className="text-2xl font-semibold font-headline mb-4 border-b pb-2">My Philosophy</h2>
                 <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground">
                    "The best way to predict the future is to invent it. With technology and creativity, we can build learning tools that not only educate but also inspire the next generation of thinkers, creators, and problem-solvers."
                </blockquote>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
