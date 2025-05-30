
import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface AIAssistantProps {
  onClose: () => void;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your Dorm Assistant. How can I help you today?",
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Sample AI responses
  const aiResponses = [
    "I can help you with gate pass requests, room information, and more.",
    "Your most recent gate pass was approved yesterday.",
    "The dorm meeting is scheduled for Saturday at 5pm in the common area.",
    "There are currently 42 residents in the dorm, with 8 on leave.",
    "To request a new gate pass, go to the Gate Passes section and click 'New Request'.",
    "Your locker assignment is #127, located on the second floor.",
    "The nurse's office hours are from 9am to 5pm on weekdays.",
    "You have 2 unread notifications. Would you like me to summarize them?",
    "Room cleaning is scheduled for tomorrow morning.",
    "I've notified the dorm leader about your maintenance request.",
  ];

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    // Add user message
    const newUserMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue('');
    setIsTyping(true);
    
    // Simulate AI response after a delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        sender: 'ai',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  return (
    <Card className="fixed bottom-4 right-4 w-80 sm:w-96 shadow-lg border z-50 max-h-[70vh] flex flex-col">
      <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between space-y-0">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8 bg-primary/10">
            <AvatarFallback>
              <Bot size={16} className="text-primary" />
            </AvatarFallback>
          </Avatar>
          <CardTitle className="text-lg">Dorm Assistant</CardTitle>
          <Badge variant="outline" className="bg-primary/10 text-xs">AI</Badge>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
          <X size={16} />
        </Button>
      </CardHeader>
      <ScrollArea className="flex-1 p-4 overflow-y-auto" ref={scrollAreaRef}>
        <CardContent className="p-0 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-lg p-3 ${
                  message.sender === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                <div className="flex items-start gap-2">
                  {message.sender === 'ai' && (
                    <Bot size={16} className="mt-1 shrink-0" />
                  )}
                  <div>
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  {message.sender === 'user' && (
                    <User size={16} className="mt-1 shrink-0" />
                  )}
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="max-w-[85%] rounded-lg p-3 bg-muted">
                <div className="flex items-center gap-2">
                  <Bot size={16} />
                  <div className="flex gap-1">
                    <span className="animate-bounce">.</span>
                    <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>.</span>
                    <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>.</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </ScrollArea>
      <CardFooter className="p-3 pt-2">
        <form onSubmit={handleSubmit} className="flex w-full gap-2">
          <Input
            ref={inputRef}
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Type your message..."
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={isTyping || !inputValue.trim()}>
            <Send size={16} />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};

export default AIAssistant;
