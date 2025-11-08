
'use client';

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { Send, Search } from 'lucide-react';
import Link from 'next/link';

const users = [
    { id: 'user-2', name: 'Bella', avatarId: 'avatar-2', online: true },
    { id: 'user-3', name: 'Charlie', avatarId: 'avatar-3', online: false },
    { id: 'user-4', name: 'Diana', avatarId: 'creator-avatar', online: true },
    { id: 'user-5', name: 'Ethan', avatarId: 'avatar-1', online: false },
    { id: 'user-6', name: 'Fiona', avatarId: 'avatar-2', online: true },
    { id: 'user-7', name: 'George', avatarId: 'avatar-3', online: true },
];

const initialMessages = [
    { sender: 'Bella', text: 'Hey, did you finish the Python quest?' },
    { sender: 'You', text: 'Almost! Just stuck on the last part about classes.' },
    { sender: 'Bella', text: 'Ah, I remember that one. Let me know if you need a hint!' },
    { sender: 'You', text: 'Thanks, I appreciate it! Might take you up on that offer.' },
];

export default function SocialPage() {
    const [selectedUser, setSelectedUser] = useState(users[0]);
    const [messages, setMessages] = useState(initialMessages);
    const [newMessage, setNewMessage] = useState('');

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (newMessage.trim()) {
            setMessages([...messages, { sender: 'You', text: newMessage }]);
            setNewMessage('');
        }
    };

    return (
        <Card className="h-[calc(100vh-8rem)] w-full flex flex-col lg:flex-row">
            {/* User List */}
            <aside className="w-full lg:w-1/3 xl:w-1/4 border-b lg:border-b-0 lg:border-r">
                <div className="p-4 border-b">
                    <h2 className="text-xl font-bold">Friends</h2>
                    <div className="relative mt-2">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search friends..." className="pl-10" />
                    </div>
                </div>
                <ScrollArea className="h-[calc(100vh-20rem)] lg:h-[calc(100vh-14rem)]">
                    <div className="p-2">
                        {users.map((user) => {
                            const avatar = PlaceHolderImages.find(img => img.id === user.avatarId);
                            return (
                                <button
                                    key={user.id}
                                    className={cn(
                                        "w-full flex items-center gap-3 text-left p-2 rounded-lg transition-colors",
                                        selectedUser.id === user.id ? "bg-accent" : "hover:bg-accent/50"
                                    )}
                                    onClick={() => setSelectedUser(user)}
                                >
                                    <Avatar className="relative">
                                        {avatar && <AvatarImage src={avatar.imageUrl} alt={user.name} />}
                                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                        {user.online && <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-background" />}
                                    </Avatar>
                                    <div className="flex-1">
                                        <p className="font-semibold">{user.name}</p>
                                    </div>
                                </button>
                            )
                        })}
                    </div>
                </ScrollArea>
            </aside>

            {/* Chat Area */}
            <main className="flex-1 flex flex-col">
                <header className="p-4 border-b flex items-center gap-4">
                    {selectedUser && (
                        <>
                            <Avatar>
                                <AvatarImage src={PlaceHolderImages.find(img => img.id === selectedUser.avatarId)?.imageUrl} />
                                <AvatarFallback>{selectedUser.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <h3 className="font-semibold">{selectedUser.name}</h3>
                                <Link href={`/dashboard/user/${selectedUser.id}`} className="text-xs text-muted-foreground hover:underline">View Profile</Link>
                            </div>
                        </>
                    )}
                </header>
                <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                        {messages.map((message, index) => (
                            <div key={index} className={cn("flex items-end gap-2", message.sender === 'You' ? "justify-end" : "justify-start")}>
                                {message.sender !== 'You' && (
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={PlaceHolderImages.find(img => img.id === selectedUser.avatarId)?.imageUrl} />
                                        <AvatarFallback>{selectedUser.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                )}
                                <div className={cn(
                                    "max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-lg",
                                    message.sender === 'You' ? "bg-primary text-primary-foreground" : "bg-muted"
                                )}>
                                    <p className="text-sm">{message.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
                <footer className="p-4 border-t">
                    <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                        <Input
                            placeholder="Type a message..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                        />
                        <Button type="submit" size="icon" disabled={!newMessage.trim()}>
                            <Send className="h-4 w-4" />
                        </Button>
                    </form>
                </footer>
            </main>
        </Card>
    );
}
