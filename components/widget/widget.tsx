'use client';

import { useState, useRef } from 'react';

import { useChat } from '@ai-sdk/react';
import { cn } from '@/lib/utils';

import { Dialog } from '@/components/ui/dialog';
import {
  WidgetContent,
  WidgetTrigger,
  WidgetHeader,
  WidgetIcon,
  WidgetEmptyState,
} from '@/components/widget/index';
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from '@/components/ai-elements/conversation';
import {
  PromptInput,
  PromptInputBody,
  type PromptInputMessage,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputFooter,
} from '@/components/ai-elements/prompt-input';
import { ChatMessage } from '@/components/widget/chat-message';


export const Widget = () => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [feedbackState, setFeedbackState] = useState<Record<string, 'up' | 'down'>>({});
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { messages, status, error, sendMessage, setMessages, clearError } = useChat({
    onError: (error) => {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          parts: [
            {
              type: 'text',
              text: error?.message || 'Something went wrong. Please try again.',
            },
          ],
        },
      ]);
    },
  });

  const isLoading = status === 'submitted' || status === 'streaming';
  const isEmpty = messages.length === 0;

  // Optimistic UI: Show a placeholder assistant message while waiting for the API response
  // This prevents layout shift and provides immediate visual feedback
  const messagesToDisplay = isLoading && messages[messages.length - 1]?.role === 'user'
    ? [
      ...messages,
      {
        id: 'loading-placeholder',
        role: 'assistant',
        content: '',
        parts: [],
      } as any,
    ]
    : messages;



  const handleSubmit = async (message: PromptInputMessage) => {
    const content = message.text?.trim();
    if (!content && !message.files?.length) return;

    if (error) clearError();

    setText('');
    await sendMessage({
      text: content || 'Sent with attachments',
      files: message.files,
    });
  };

  const handleSuggestionClick = (suggestion: string) => {
    setText(suggestion);
    textareaRef.current?.focus();
  };

  const handleCopy = (content: string, id: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleFeedback = (id: string, type: 'up' | 'down') => {
    setFeedbackState((prev) => {
      const current = prev[id];
      if (current === type) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: type };
    });
    // add your feedback logic here
    console.log('feedback', id, type);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <WidgetTrigger aria-label="Open chat">
        <div className="absolute inset-0 flex items-center justify-center">
          <WidgetIcon size={20} />
        </div>
      </WidgetTrigger>
      <WidgetContent>
        <div className="flex flex-col h-full">
          <WidgetHeader title="yap!" />
          <Conversation className="flex-1">
            <ConversationContent className={cn(isEmpty && 'h-full')}>
              {isEmpty ? (
                <WidgetEmptyState onSuggestionClick={handleSuggestionClick} />
              ) : (
                <>
                  {messagesToDisplay.map((message, index) => (
                    <ChatMessage
                      key={message.id}
                      message={message}
                      index={index}
                      totalMessages={messagesToDisplay.length}
                      isLoading={isLoading}
                      status={status}
                      onCopy={handleCopy}
                      onFeedback={handleFeedback}
                      copiedId={copiedId}
                      feedbackState={feedbackState}
                    />
                  ))}
                </>
              )}
            </ConversationContent>
            <ConversationScrollButton />
          </Conversation>
          <PromptInput onSubmit={handleSubmit} className="p-4" multiple>
            <PromptInputBody>
              <PromptInputTextarea
                onChange={(e) => setText(e.target.value)}
                ref={textareaRef}
                value={text}
                placeholder="Type your message..."
                disabled={isLoading}
              />
            </PromptInputBody>
            <PromptInputFooter className="w-full flex justify-end">
              <PromptInputSubmit
                disabled={!text.trim() || isLoading}
                status={status}
              />
            </PromptInputFooter>
          </PromptInput>
        </div>
      </WidgetContent>
    </Dialog >
  );
};