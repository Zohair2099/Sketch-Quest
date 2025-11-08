
'use client';

import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  XCircle,
  BookText,
  Swords,
  BrainCircuit,
  Lightbulb,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';
import { notFound, useParams, useRouter } from 'next/navigation';
import { useState, useMemo, useEffect } from 'react';
import Confetti from 'react-confetti';
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
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';
import { useUser, useFirestore, updateDocumentNonBlocking, increment, arrayUnion } from '@/firebase';
import { doc } from 'firebase/firestore';

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
  const router = useRouter();
  const { toast } = useToast();
  const { user } = useUser();
  const firestore = useFirestore();

  const questId = params.questId as string;
  const lessonId = params.lessonId as string;

  const questTopic = questsData.find((q) => q.topicId === questId);
  const lesson = questTopic?.lessons.find(
    (l) => l.id === lessonId
  ) as Lesson | undefined;

  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string | null>>({});
  const [showConfetti, setShowConfetti] = useState(false);

  const quizzes = useMemo(() => [
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
  ], []);

  const steps = useMemo(() => {
    if (!lesson) return [];
    const studySteps = lesson.miniLessons.map(ml => ({ type: 'study', ...ml }));
    const taskSteps = lesson.miniQuests.map(mq => ({ type: 'task', ...mq }));
    const quizSteps = quizzes.map((quiz, index) => ({ type: 'quiz', quiz, index }));
    return [...studySteps, ...taskSteps, ...quizSteps];
  }, [lesson, quizzes]);

  if (!questTopic || !lesson) {
    notFound();
  }

  const handleSelectAnswer = (questionIndex: number, option: string) => {
    if (selectedAnswers[questionIndex]) return; // Already answered
    
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: option,
    }));

    if (quizzes[questionIndex].answer === option) {
        toast({
            title: "Correct!",
            description: "Great job! You've earned some XP.",
        });
    } else {
        toast({
            variant: "destructive",
            title: "Not quite!",
            description: "That's not the right answer. Keep trying!",
        });
    }
  };

  const handleFinishLesson = () => {
    if (!user || !firestore || !lesson) return;

    // Update user profile in Firestore
    const userDocRef = doc(firestore, 'users', user.uid);
    updateDocumentNonBlocking(userDocRef, {
        xp: increment(lesson.xpReward),
        completedLessons: arrayUnion(lesson.id)
    });

    // Trigger confetti
    setShowConfetti(true);

    // Show toast
    toast({
        title: "Lesson Complete!",
        description: `You've earned ${lesson.xpReward} XP!`,
    });

    // Redirect after confetti finishes
    setTimeout(() => {
        router.push(`/dashboard/quests/${questId}`);
    }, 5000); // 5 seconds for confetti
  };

  const progressValue = (currentStep + 1) / steps.length * 100;
  const currentStepData = steps[currentStep];

  const renderStepContent = () => {
    switch (currentStepData.type) {
      case 'study':
        return (
          <InfoCard icon={<BookText size={24} />} title={currentStepData.title}>
            <p className="whitespace-pre-wrap text-base">{currentStepData.content}</p>
          </InfoCard>
        );
      case 'task':
        return (
          <InfoCard icon={<Swords size={24} />} title="Practice Task">
            <h4 className="font-semibold text-lg text-foreground">{currentStepData.title}</h4>
            <p className="whitespace-pre-wrap">{currentStepData.description}</p>
          </InfoCard>
        );
      case 'quiz':
        const { quiz, index } = currentStepData;
        const selectedOption = selectedAnswers[index];

        return (
            <Card>
            <CardHeader>
                <div className="flex items-center gap-4">
                    <div className="text-primary"><BrainCircuit size={24} /></div>
                    <CardTitle className="font-headline">Test Your Knowledge</CardTitle>
                </div>
                <CardDescription>Question {index + 1} of {quizzes.length}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <p className="font-semibold mb-4 text-lg">{quiz.question}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {quiz.options.map((option) => {
                            const isSelected = selectedOption === option;
                            const isCorrect = quiz.answer === option;
                            const hasBeenAnswered = selectedOption != null;

                            return (
                                <Button
                                    key={option}
                                    variant="outline"
                                    className={cn(
                                        "h-auto justify-start text-left whitespace-normal py-3 transition-all duration-300",
                                        hasBeenAnswered && isCorrect && "bg-green-100 border-green-400 text-green-900 hover:bg-green-200 dark:bg-green-900/50 dark:border-green-700 dark:text-green-200",
                                        hasBeenAnswered && !isCorrect && isSelected && "bg-red-100 border-red-400 text-red-900 hover:bg-red-200 dark:bg-red-900/50 dark:border-red-700 dark:text-red-200",
                                        !hasBeenAnswered && isSelected && "bg-accent border-primary"
                                    )}
                                    onClick={() => handleSelectAnswer(index, option)}
                                    disabled={hasBeenAnswered}
                                >
                                    <div className="flex-1">{option}</div>
                                    {hasBeenAnswered && isCorrect && <CheckCircle2 className="h-5 w-5 text-green-600" />}
                                    {hasBeenAnswered && !isCorrect && isSelected && <XCircle className="h-5 w-5 text-red-600" />}
                                </Button>
                            )
                        })}
                    </div>
                </div>
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };
  
  const isQuizStep = currentStepData.type === 'quiz';
  const isQuizAnswered = isQuizStep && selectedAnswers[currentStepData.index] != null;
  const canGoNext = !isQuizStep || isQuizAnswered;

  return (
    <div className="space-y-6">
      {showConfetti && <Confetti recycle={false} onConfettiComplete={() => setShowConfetti(false)} />}
      <header className="flex justify-between items-center">
        <Link
          href={`/dashboard/quests/${questId}`}
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to {questTopic.title}
        </Link>
        <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-yellow-500" />
            <span className="font-bold text-primary">{lesson.xpReward} XP</span>
            <Badge variant="outline" className="ml-4">{lesson.badge}</Badge>
        </div>
      </header>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
            <span>Lesson Progress</span>
            <span>Step {currentStep + 1} of {steps.length}</span>
        </div>
        <Progress value={progressValue} />
      </div>

      <div className="min-h-[400px] flex items-center justify-center animate-in fade-in-50" key={currentStep}>
        {renderStepContent()}
      </div>
      
      <div className="flex justify-between items-center">
        <Button 
            variant="outline"
            onClick={() => setCurrentStep(s => Math.max(0, s - 1))}
            disabled={currentStep === 0}
        >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
        </Button>
        {currentStep < steps.length - 1 ? (
             <Button 
                onClick={() => setCurrentStep(s => Math.min(steps.length - 1, s + 1))}
                disabled={!canGoNext}
            >
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
        ) : (
            <Button onClick={handleFinishLesson} disabled={!canGoNext}>
                Finish Lesson
            </Button>
        )}
      </div>

    </div>
  );
}
