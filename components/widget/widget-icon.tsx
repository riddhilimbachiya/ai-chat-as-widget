import * as React from 'react';

import { cn } from '@/lib/utils';

export interface WidgetIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export const WidgetIcon = React.forwardRef<SVGSVGElement, WidgetIconProps>(
  ({ size = 28, className, ...props }, ref) => {
    return (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 107 106.72"
        width={size}
        height={size}
        className={cn('text-neutral-900 dark:text-neutral-100', className)}
        {...props}>
        <path
          d="M50.37,102.47l.75-45.77V12.65c0-4.39,5.34-6.65,8.44-3.54l38.26,38.37c3.1,3.11.96,8.47-3.53,8.47h-33.66c-3.74,0-5.66,4.61-2.99,7.29l42.1,42.23c2.67,2.68,7.27.75,7.27-3V7.07c0-3.97-3.21-7.07-7.05-7.07H4.74C.25,0-1.67,4.61,1.75,7.29l40.18,40.3c3.1,3.11.96,8.47-3.53,8.47H4.74c-4.49,0-6.41,4.61-2.99,7.29l42.1,42.12c1.92,2.68,6.52.75,6.52-3Z"
          fill="currentColor"
          strokeWidth="0"
        />
      </svg>
    );
  }
);

WidgetIcon.displayName = 'WidgetIcon';
