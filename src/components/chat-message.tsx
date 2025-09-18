import { Bot, User } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface ChatMessageProps {
  role: 'user' | 'bot';
  content: string;
  isLoading?: boolean;
}

function LoadingIndicator() {
  return (
    <div className="flex items-center gap-1.5">
      <span className="h-2 w-2 animate-pulse rounded-full bg-current [animation-delay:0s]"></span>
      <span className="h-2 w-2 animate-pulse rounded-full bg-current [animation-delay:0.15s]"></span>
      <span className="h-2 w-2 animate-pulse rounded-full bg-current [animation-delay:0.3s]"></span>
    </div>
  );
}

export function ChatMessage({ role, content, isLoading }: ChatMessageProps) {
  const isBot = role === 'bot';

  return (
    <div
      className={cn(
        'flex items-start gap-3 my-4',
        !isBot && 'flex-row-reverse'
      )}
    >
      <Avatar className="h-8 w-8 shrink-0">
        <AvatarFallback className={isBot ? "bg-secondary" : "bg-primary text-primary-foreground"}>
          {isBot ? <Bot className="h-5 w-5" /> : <User className="h-5 w-5" />}
        </AvatarFallback>
      </Avatar>
      <div
        className={cn(
          'max-w-[75%] rounded-lg p-3 text-sm shadow-md',
          isBot ? 'bg-card' : 'bg-primary text-primary-foreground'
        )}
      >
        {isLoading ? <LoadingIndicator /> : content}
      </div>
    </div>
  );
}
