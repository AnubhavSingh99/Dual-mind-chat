'use client';

import { useState, useEffect } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Icons } from './icons';
import { cn } from '@/lib/utils';
import { BrainCircuit } from 'lucide-react';

interface ChatHeaderProps {
  mode: 'gemini' | 'custom';
  onModeChange: (mode: 'gemini' | 'custom') => void;
  thinkingMode: boolean;
  onThinkingModeChange: (enabled: boolean) => void;
}

export function ChatHeader({ 
  mode, 
  onModeChange, 
  thinkingMode, 
  onThinkingModeChange 
}: ChatHeaderProps) {
  return (
    <header className="flex items-center justify-between p-4 border-b bg-card">
      <div className="flex items-center gap-2">
        <Icons.logo className="h-8 w-8 text-primary" />
        <h1 className="text-xl font-bold text-foreground">F1 Expert Chat</h1>
      </div>
      <div className="flex items-center gap-6">
        {/* Personality Mode Toggle */}
        <div className="flex items-center space-x-3">
          <Label
            htmlFor="mode-toggle"
            className={cn(
              'font-medium transition-colors',
              mode === 'gemini' ? 'text-primary' : 'text-muted-foreground'
            )}
          >
            Analyst
          </Label>
          <Switch
            id="mode-toggle"
            checked={mode === 'custom'}
            onCheckedChange={(checked) => onModeChange(checked ? 'custom' : 'gemini')}
            aria-label="Toggle chat mode"
          />
          <Label
            htmlFor="mode-toggle"
            className={cn(
              'font-medium transition-colors',
              mode === 'custom' ? 'text-primary' : 'text-muted-foreground'
            )}
          >
            Driver
          </Label>
        </div>
        
        {/* Thinking Mode Toggle */}
        <div className="flex items-center space-x-3">
          <BrainCircuit className={cn(
            'h-4 w-4 transition-colors',
            thinkingMode ? 'text-primary' : 'text-muted-foreground'
          )} />
          <Switch
            id="thinking-toggle"
            checked={thinkingMode}
            onCheckedChange={onThinkingModeChange}
            aria-label="Toggle thinking mode"
          />
          <Label
            htmlFor="thinking-toggle"
            className={cn(
              'font-medium transition-colors',
              thinkingMode ? 'text-primary' : 'text-muted-foreground'
            )}
          >
            Detailed Analysis
          </Label>
        </div>
      </div>
    </header>
  );
}
