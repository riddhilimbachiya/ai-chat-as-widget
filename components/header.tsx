'use client';

import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Sparkles } from 'lucide-react';

export function Header() {
  return (
    <header className="w-full justify-between px-8 flex py-5 border-b border-border items-center bg-muted/10 absolute top-0 left-0 sticky z-50 backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <a>
          <span className="font-bold text-primary text-xl tracking-tight">
            yap!
          </span>
        </a>
      </div>
      <p className="text-base font-semibold flex gap-2 items-center">
        <p className="flex relative items-center text-base text-foreground">
          <Sparkles className="size-3 mr-1 text-primary" /> AI Chat
          Interfaces -
        </p>{' '}
        <span className="text-base text-muted-foreground">
          Built with Vercel's AI SDK in Next.js.
        </span>
      </p>
      <div className="flex items-center gap-2">
        <ThemeToggle />
      </div>
    </header>
  );
}
