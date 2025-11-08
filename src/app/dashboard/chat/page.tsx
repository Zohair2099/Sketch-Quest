
'use client';

import { Bot, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function ChatPage() {
  return (
    <Card className="h-[calc(100vh-8rem)]">
      <CardHeader className="flex flex-row items-center gap-4">
        <div className="p-3 rounded-full bg-primary/10 text-primary">
          <Bot className="w-6 h-6" />
        </div>
        <div>
          <CardTitle>AI Assistant</CardTitle>
          <CardDescription>Ask me anything about your quests, scores, or programming!</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="h-full flex flex-col">
        <div className="flex-1 space-y-4 p-4 overflow-y-auto rounded-lg bg-muted/50">
          {/* Placeholder for chat messages */}
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-full bg-primary text-primary-foreground">
              <Bot className="w-5 h-5" />
            </div>
            <div className="bg-background p-3 rounded-lg max-w-lg">
              <p className="font-bold">SketchQuest AI</p>
              <p>Hello! How can I help you on your learning adventure today?</p>
            </div>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2">
          <Input placeholder="Type your message..." className="flex-1" />
          <Button>
            <Send className="w-5 h-5" />
            <span className="sr-only">Send</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
