'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

import { DialogTrigger } from '@/components/ui/dialog';

export interface WidgetTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const WidgetTrigger = React.forwardRef<
  HTMLButtonElement,
  WidgetTriggerProps
>(({ className, children, ...props }, ref) => {
  return (
    <div className="fixed bottom-6 right-6 z-10">
      <DialogTrigger asChild>
        <button
          ref={ref}
          className={cn(
            'relative block size-11 overflow-hidden border border-border shadow-xs bg-background rounded-xl cursor-pointer',
            'hover:opacity-90 transition-opacity',
            className
          )}
          {...props}>
          {children}
        </button>
      </DialogTrigger>
    </div>
  );
});

WidgetTrigger.displayName = 'WidgetTrigger';
