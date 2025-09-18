'use client';

import { useEffect, useRef } from 'react';
import { ScrollArea, ScrollAreaViewport } from '@/components/ui/scroll-area';
import { ChatMessage } from './chat-message';
import type { Message } from '@/app/page';

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
}

export function ChatMessages({ messages, isLoading }: ChatMessagesProps) {
  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (viewportRef.current) {
      viewportRef.current.scrollTo({
        top: viewportRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages, isLoading]);

  return (
    <ScrollArea className="h-full">
      <ScrollAreaViewport ref={viewportRef}>
        <div className="p-4 md:p-6">
          {messages.map((message) => (
            <ChatMessage key={message.id} {...message} />
          ))}
          {isLoading && <ChatMessage role="bot" content="" isLoading />}
        </div>
      </ScrollAreaViewport>
    </ScrollArea>
  );
}
