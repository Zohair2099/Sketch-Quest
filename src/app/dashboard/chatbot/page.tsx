
'use client';

import { Bot, User } from 'lucide-react';
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { useUser } from '@/firebase';

export default function ChatbotPage() {
    const { user } = useUser();
    const [messages, setMessages] = useState([
        { sender: 'bot', text: "Hello! I'm your AI Assistant. How can I help you with your learning journey today?" }
    ]);
    const [newMessage, setNewMessage] = useState('');
    const userAvatar = PlaceHolderImages.find(img => img.id === 'avatar-1');
    const botAvatar = PlaceHolderImages.find(img => img.id === 'mascot-friendly');
    
    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (newMessage.trim()) {
            setMessages(prev => [...prev, { sender: 'user', text: newMessage }]);
            setNewMessage('');
            // Here you would typically call your AI flow
            setTimeout(() => {
                 setMessages(prev => [...prev, { sender: 'bot', text: "That's a great question! Let me look that up for you..." }]);
            }, 1000)
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
                    <ScrollArea className="h-full pr-4">
                        <div className="space-y-6">
                            {messages.map((message, index) => (
                                <div key={index} className={cn("flex items-start gap-4", message.sender === 'user' ? "justify-end" : "justify-start")}>
                                    {message.sender === 'bot' && (
                                        <Avatar className="h-8 w-8 border">
                                            {botAvatar && <AvatarImage src={botAvatar.imageUrl} />}
                                            <AvatarFallback><Bot/></AvatarFallback>
                                        </Avatar>
                                    )}
                                    <div className={cn(
                                        "max-w-md p-3 rounded-lg text-sm",
                                        message.sender === 'user' ? "bg-primary text-primary-foreground" : "bg-muted"
                                    )}>
                                        <p>{message.text}</p>
                                    </div>
                                    {message.sender === 'user' && (
                                        <Avatar className="h-8 w-8">
                                            {userAvatar && <AvatarImage src={user?.photoURL || userAvatar.imageUrl} />}
                                            <AvatarFallback>{user?.email?.[0].toUpperCase() || 'U'}</AvatarFallback>
                                        </Avatar>
                                    )}
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </CardContent>
                <CardFooter>
                    <form onSubmit={handleSendMessage} className="flex items-center gap-2 w-full">
                        <Input
                            placeholder="Ask about a quest or a topic..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                        />
                        <Button type="submit" disabled={!newMessage.trim()}>
                            Send
                        </Button>
                    </form>
                </CardFooter>
            </Card>
        </div>
    );
}
