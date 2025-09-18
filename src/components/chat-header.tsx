'use client';

import { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Icons } from './icons';
import { cn } from '@/lib/utils';

export function ChatHeader() {
  const [mode, setMode] = useState<'gemini' | 'custom'>('gemini');

  return (
    <header className="flex items-center justify-between p-4 border-b bg-card">
      <div className="flex items-center gap-2">
        <Icons.logo className="h-8 w-8 text-primary" />
        <h1 className="text-xl font-bold text-foreground">DualMind Chat</h1>
      </div>
      <div className="flex items-center space-x-3">
        <Label
          htmlFor="mode-toggle"
          className={cn(
            'font-medium transition-colors',
            mode === 'gemini' ? 'text-primary' : 'text-muted-foreground'
          )}
        >
          Gemini
        </Label>
        <Switch
          id="mode-toggle"
          checked={mode === 'custom'}
          onCheckedChange={(checked) => setMode(checked ? 'custom' : 'gemini')}
          aria-label="Toggle chat mode"
        />
        <Label
          htmlFor="mode-toggle"
          className={cn(
            'font-medium transition-colors',
            mode === 'custom' ? 'text-primary' : 'text-muted-foreground'
          )}
        >
          Custom
        </Label>
      </div>
    </header>
  );
}
