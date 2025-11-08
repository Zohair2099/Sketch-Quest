'use client';

import {
  ArrowLeft,
  Check,
  CheckCircle,
  X,
  BookText,
  BrainCircuit,
  Swords,
  Lightbulb,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { useState } from 'react';
import { questsData, Lesson } from '@/app/dashboard/quests/page';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

function InfoCard({
  icon,
  title,
  children,
  className,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'rounded-xl border bg-card text-card-foreground shadow p-6',
        className
      )}
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="text-primary">{icon}</div>
        <h3 className="text-xl font-bold font-headline">{title}</h3>
      </div>
      <div className="space-y-4 text-muted-foreground">{children}</div>
    </div>
  );
}

export default function LessonDetailPage() {
  const params = useParams();
  const { toast } = useToast();
  const questId = params.questId as string;
  const lessonId = params.lessonId as string;

  const questTopic = questsData.find((q) => q.topicId === questId);
  const lesson = questTopic?.lessons.find(
    (l) => l.id === lessonId
  ) as Lesson | undefined;

  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string | null>>({});
  const [submitted, setSubmitted] = useState(false);

  if (!questTopic || !lesson) {
    notFound();
  }

  const quizzes = [
    {
      question: 'Who created Python?',
      options: ['James Gosling', 'Guido van Rossum', 'Bjarne Stroustrup', 'Dennis Ritchie'],
      answer: 'Guido van Rossum',
    },
    {
      question: 'What type of language is Python?',
      options: ['Compiled', 'Interpreted', 'Assembly', 'Binary'],
      answer: 'Interpreted',
    },
    {
        question: 'What symbol is used to start a comment in Python?',
        options: ['//', '<!--', '#', '--'],
        answer: '#',
    },
    {
        question: 'What will the following code print? `print("Python" + "Rocks")`',
        options: ['Python Rocks', 'Python+Rocks', 'PythonRocks', 'Error'],
        answer: 'PythonRocks',
    }
  ];

  const handleSelectAnswer = (questionIndex: number, option: string) => {
    if (submitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: option,
    }));
  };

  const handleSubmitQuiz = () => {
    setSubmitted(true);
    let score = 0;
    quizzes.forEach((quiz, index) => {
      if (selectedAnswers[index] === quiz.answer) {
        score++;
      }
    });
    toast({
        title: "Quiz Submitted!",
        description: `You scored ${score} out of ${quizzes.length}. Keep up the great work!`,
    })
  };

  return (
    <div className="space-y-8">
      <Link
        href={`/dashboard/quests/${questId}`}
        className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to {questTopic.title}
      </Link>

      <header>
        <Badge variant="secondary" className="mb-2">
          {questTopic.topic}
        </Badge>
        <h1 className="font-headline text-4xl font-bold tracking-tight">
          {lesson.title}
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Level {lesson.level} &middot; {lesson.description}
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          {/* Study Material */}
          <InfoCard icon={<BookText size={24} />} title="Study Material">
            {lesson.miniLessons.map((ml, i) => (
              <div key={i}>
                <h4 className="font-semibold text-lg text-foreground">{ml.title}</h4>
                <p className="whitespace-pre-wrap">{ml.content}</p>
              </div>
            ))}
          </InfoCard>

          {/* Practice Tasks */}
          <InfoCard icon={<Swords size={24} />} title="Practice Tasks">
             <ul className="list-disc list-outside pl-5 space-y-2">
                {lesson.miniQuests.map((mq, i) => (
                    <li key={i}>
                        <span className="font-semibold text-foreground">{mq.title}: </span>
                        <span>{mq.description}</span>
                    </li>
                ))}
            </ul>
          </InfoCard>

          {/* Quiz Section */}
          <Card>
            <CardHeader>
                <div className="flex items-center gap-4">
                    <div className="text-primary"><BrainCircuit size={24} /></div>
                    <CardTitle className="font-headline">Test Your Knowledge</CardTitle>
                </div>
                <CardDescription>Complete the quiz to earn XP and test your understanding.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {quizzes.map((quiz, index) => (
                    <div key={index}>
                        <p className="font-semibold mb-3">{index + 1}. {quiz.question}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {quiz.options.map((option) => {
                                const isSelected = selectedAnswers[index] === option;
                                const isCorrect = quiz.answer === option;
                                return (
                                    <Button
                                        key={option}
                                        variant="outline"
                                        className={cn(
                                            "h-auto justify-start text-left whitespace-normal py-3",
                                            submitted && isCorrect && "bg-green-100 border-green-300 text-green-900 hover:bg-green-200 dark:bg-green-900/50 dark:border-green-700 dark:text-green-200",
                                            submitted && !isCorrect && isSelected && "bg-red-100 border-red-300 text-red-900 hover:bg-red-200 dark:bg-red-900/50 dark:border-red-700 dark:text-red-200",
                                            !submitted && isSelected && "bg-accent border-primary"
                                        )}
                                        onClick={() => handleSelectAnswer(index, option)}
                                        disabled={submitted}
                                    >
                                        <div className="flex-1">{option}</div>
                                        {submitted && isCorrect && <CheckCircle className="h-5 w-5 text-green-600" />}
                                        {submitted && !isCorrect && isSelected && <X className="h-5 w-5 text-red-600" />}
                                    </Button>
                                )
                            })}
                        </div>
                    </div>
                ))}
            </CardContent>
            <CardFooter className="border-t pt-6">
                <Button onClick={handleSubmitQuiz} disabled={submitted || Object.keys(selectedAnswers).length < quizzes.length} className="w-full sm:w-auto">
                    {submitted ? 'Quiz Completed' : 'Submit Answers'}
                </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Lesson Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">XP Reward</span>
                        <div className="font-bold text-primary flex items-center gap-1">
                            <Sparkles className="h-5 w-5" />
                            <span>{lesson.xpReward} XP</span>
                        </div>
                    </div>
                     <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Badge</span>
                        <Badge variant="outline">{lesson.badge}</Badge>
                    </div>
                </CardContent>
            </Card>

            <InfoCard icon={<Lightbulb size={24} />} title="Gamification Tips" className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                <ul className="list-disc list-outside pl-5 space-y-2">
                    <li>Give the learner a "First Code Run" badge 🎖️ when they print their first line.</li>
                    <li>Add a talking mascot (like a snake or robot) that says the printed message out loud.</li>
                </ul>
            </InfoCard>
        </div>
      </div>
    </div>
  );
}
