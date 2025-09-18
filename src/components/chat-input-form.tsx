'use client';

import type { FormEventHandler } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ChatInputFormProps {
  input: string;
  setInput: (value: string) => void;
  handleSendMessage: FormEventHandler<HTMLFormElement>;
  isLoading: boolean;
}

export function ChatInputForm({
  input,
  setInput,
  handleSendMessage,
  isLoading,
}: ChatInputFormProps) {
  return (
    <div className="p-4 border-t bg-card">
      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <Input
          autoFocus
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-grow text-base"
          disabled={isLoading}
        />
        <Button
          type="submit"
          size="icon"
          disabled={isLoading || !input.trim()}
          aria-label="Send message"
        >
          <Send className="h-5 w-5" />
        </Button>
      </form>
    </div>
  );
}
