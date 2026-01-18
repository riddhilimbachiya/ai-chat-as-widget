'use client';

import * as React from 'react';

import { XIcon } from 'lucide-react';

import { DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface WidgetHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
}

export const WidgetHeader = React.forwardRef<HTMLDivElement, WidgetHeaderProps>(
  ({ title = 'Chat', className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center justify-between border-b border-border px-4 py-3',
          className
        )}
        {...props}>
        <h2 className="text-sm font-semibold">{title}</h2>
        <DialogClose asChild>
          <Button
            variant="ghost"
            size="icon-sm"
            className="h-6 w-6 rounded-full"
            aria-label="Close chat">
            <XIcon className="h-4 w-4" />
          </Button>
        </DialogClose>
      </div>
    );
  }
);

WidgetHeader.displayName = 'WidgetHeader';
