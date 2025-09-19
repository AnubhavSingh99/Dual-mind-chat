'use client';

import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { continueConversation } from '@/app/actions';
import { ChatHeader } from '@/components/chat-header';
import { ChatMessages } from '@/components/chat-messages';
import { ChatInputForm } from '@/components/chat-input-form';

export type Message = {
  id: string;
  role: 'user' | 'bot';
  content: string;
};

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'bot',
      content: 'Welcome to F1 Expert Chat! I can provide detailed information about Formula 1 racing, including teams, drivers, race history, regulations, and upcoming events. How can I help with your F1 questions today?',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<'gemini' | 'custom'>('gemini');
  const [thinkingMode, setThinkingMode] = useState<boolean>(false);
  const { toast } = useToast();

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: trimmedInput,
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const result = await continueConversation(newMessages, mode, thinkingMode);

      if (result.type === 'error') {
        throw new Error(result.message);
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        content: result.content,
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description:
          error instanceof Error ? error.message : 'An unknown error occurred.',
      });
      // Revert optimistic update
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  };

  // Handle mode change from the header
  const handleModeChange = (newMode: 'gemini' | 'custom') => {
    setMode(newMode);
    
    // Add a system message when mode changes
    const systemMessage: Message = {
      id: Date.now().toString(),
      role: 'bot',
      content: newMode === 'custom' 
        ? 'Switched to Driver mode. I\'ll respond with the perspective and excitement of an F1 driver, sharing insights from behind the wheel!' 
        : 'Switched to Analyst mode. I\'ll provide detailed technical analysis and statistics about Formula 1 racing.'
    };
    
    setMessages(prev => [...prev, systemMessage]);
  };
  
  // Handle thinking mode toggle
  const handleThinkingModeChange = (enabled: boolean) => {
    setThinkingMode(enabled);
    
    // Add a system message when thinking mode changes
    const systemMessage: Message = {
      id: Date.now().toString(),
      role: 'bot',
      content: enabled 
        ? 'Detailed Analysis mode enabled. I\'ll now provide more in-depth explanations and show my reasoning process.' 
        : 'Detailed Analysis mode disabled. I\'ll provide more concise responses.'
    };
    
    setMessages(prev => [...prev, systemMessage]);
  };

  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <div className="flex h-full w-full max-w-4xl flex-col rounded-lg border shadow-lg">
        <ChatHeader 
          mode={mode} 
          onModeChange={handleModeChange}
          thinkingMode={thinkingMode}
          onThinkingModeChange={handleThinkingModeChange}
        />
        <div className="flex-1 overflow-hidden">
          <ChatMessages messages={messages} isLoading={isLoading} />
        </div>
        <ChatInputForm
          input={input}
          setInput={setInput}
          handleSendMessage={handleSendMessage}
          isLoading={isLoading}
        />
      </div>
    </main>
  );
}
