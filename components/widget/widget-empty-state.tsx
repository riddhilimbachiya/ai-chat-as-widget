'use client';

import {
  HelpCircle,
  Type,
  FileText,
  Lightbulb,
  type LucideIcon,
} from 'lucide-react';

import { ConversationEmptyState } from '@/components/ai-elements/conversation';
import { WidgetIcon } from '@/components/widget';

type SuggestionItem = { text: string; icon: LucideIcon };

export interface WidgetEmptyStateProps {
  onSuggestionClick?: (suggestion: string) => void;
  suggestions?: SuggestionItem[];
}

const defaultSuggestions = [
  { text: 'Ask me questions to clarify this idea', icon: HelpCircle },
  { text: 'Write a compelling heading', icon: Type },
  { text: 'Summarize this idea', icon: FileText },
  { text: 'Brainstorm a plan', icon: Lightbulb },
];

export const WidgetEmptyState = ({
  onSuggestionClick,
  suggestions = defaultSuggestions,
}: WidgetEmptyStateProps) => {
  const handleSuggestionClick = (suggestion: string) => {
    onSuggestionClick?.(suggestion);
  };

  return (
    <ConversationEmptyState className="items-end flex justify-end h-full text-left">
      <div className="flex w-full flex-col gap-6">
        {/* Header with Icon and Prompt */}
        <div className="flex flex-col gap-3">
          <WidgetIcon size={20} />
          <h3 className="text-base font-medium">How can I help you today?</h3>
        </div>

        {/* Suggestions */}
        <div className="flex flex-col">
          {suggestions.map((suggestion, index) => {
            return (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion.text)}
                className="w-full rounded-lg bg-transparent px-2 py-2.5 cursor-pointer text-left text-sm font-normal transition-colors hover:bg-accent flex items-center gap-2 -translate-x-2.5">
                {<suggestion.icon className="size-4 text-muted-foreground" />}
                {suggestion.text}
              </button>
            );
          })}
        </div>
      </div>
    </ConversationEmptyState>
  );
};
