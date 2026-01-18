'use client';

import * as React from 'react';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import { DialogPortal } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

export interface WidgetContentProps
  extends React.ComponentProps<typeof DialogPrimitive.Content> {
  children: React.ReactNode;
}

export const WidgetContent = React.forwardRef<
  HTMLDivElement,
  WidgetContentProps
>(({ className, children, ...props }, ref) => {
  return (
    <DialogPortal>
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          'fixed bottom-6 right-6',
          'w-[440px] h-[660px]',
          'flex flex-col overflow-hidden p-0',
          'bg-card border-border rounded-lg border shadow-lg',
          'z-50 outline-none',

          // animation
          'data-[state=open]:animate-in data-[state=closed]:animate-out',
          'data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0',
          'data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95',
          'data-[state=open]:slide-in-from-bottom-4 data-[state=closed]:slide-out-to-bottom-4',
          'origin-bottom-right',

          // timing
          'duration-250 ease-[cubic-bezier(0.16,1,0.3,1)]',

          className
        )}
        {...props}>
        {children}
      </DialogPrimitive.Content>
    </DialogPortal>
  );
});

WidgetContent.displayName = 'WidgetContent';
