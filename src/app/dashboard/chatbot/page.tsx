
'use client';

import { Bot, User } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { useUser } from '@/firebase';
import { getChatbotResponse } from '@/ai/flows/chatbot-flow';
import { Skeleton } from '@/components/ui/skeleton';

interface Message {
    role: 'user' | 'model' | 'system';
    content: string;
}

export default function ChatbotPage() {
    const { user } = useUser();
    const [messages, setMessages] = useState<Message[]>([
        { role: 'model', content: "Hello! I'm your AI Assistant. How can I help you with your learning journey today?" }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const userAvatar = PlaceHolderImages.find(img => img.id === 'avatar-1');
    const botAvatar = PlaceHolderImages.find(img => img.id === 'mascot-friendly');
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTo({
                top: scrollAreaRef.current.scrollHeight,
                behavior: 'smooth',
            });
        }
    };
    
    useEffect(() => {
        // Find the viewport div of ScrollArea
        const scrollViewport = document.querySelector('.h-full > div');
        if (scrollViewport) {
          scrollViewport.scrollTop = scrollViewport.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: Message = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            // We only send messages with role 'user' or 'model' to the AI
            const historyForAI = [...messages, userMessage].filter(
                (msg) => msg.role === 'user' || msg.role === 'model'
            );

            const result = await getChatbotResponse({ history: historyForAI });
            
            const botMessage: Message = { role: 'model', content: result.response };
            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            console.error("Error getting chatbot response:", error);
            const errorMessage: Message = { role: 'model', content: "Sorry, I'm having trouble connecting right now. Please try again later." };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="h-[calc(100vh-8rem)] w-full flex justify-center items-center">
            <Card className="w-full max-w-2xl h-full flex flex-col">
                <CardHeader className="text-center">
                    <CardTitle className="flex items-center justify-center gap-2">
                        <Bot className="h-6 w-6" />
                        AI Assistant
                    </CardTitle>
                    <CardDescription>Your personal guide for SketchQuest.</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 overflow-hidden">
                    <ScrollArea className="h-full pr-4" ref={scrollAreaRef}>
                        <div className="space-y-6">
                            {messages.map((message, index) => (
                                <div key={index} className={cn("flex items-start gap-4", message.role === 'user' ? "justify-end" : "justify-start")}>
                                    {message.role === 'model' && (
                                        <Avatar className="h-8 w-8 border">
                                            {botAvatar && <AvatarImage src={botAvatar.imageUrl} />}
                                            <AvatarFallback><Bot/></AvatarFallback>
                                        </Avatar>
                                    )}
                                    <div className={cn(
                                        "max-w-md p-3 rounded-lg text-sm",
                                        message.role === 'user' ? "bg-primary text-primary-foreground" : "bg-muted"
                                    )}>
                                        <p className="whitespace-pre-wrap">{message.content}</p>
                                    </div>
                                    {message.role === 'user' && (
                                        <Avatar className="h-8 w-8">
                                            {userAvatar && <AvatarImage src={user?.photoURL || userAvatar.imageUrl} />}
                                            <AvatarFallback>{user?.email?.[0].toUpperCase() || 'U'}</AvatarFallback>
                                        </Avatar>
                                    )}
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex items-start gap-4 justify-start">
                                    <Avatar className="h-8 w-8 border">
                                        {botAvatar && <AvatarImage src={botAvatar.imageUrl} />}
                                        <AvatarFallback><Bot/></AvatarFallback>
                                    </Avatar>
                                    <div className="max-w-md p-3 rounded-lg bg-muted">
                                       <Skeleton className="h-4 w-16" />
                                    </div>
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                </CardContent>
                <CardFooter>
                    <form onSubmit={handleSendMessage} className="flex items-center gap-2 w-full">
                        <Input
                            placeholder="Ask about a quest or a topic..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            disabled={isLoading}
                        />
                        <Button type="submit" disabled={!input.trim() || isLoading}>
                            Send
                        </Button>
                    </form>
                </CardFooter>
            </Card>
        </div>
    );
}
