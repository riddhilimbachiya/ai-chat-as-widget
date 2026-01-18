'use client';

import { useMemo } from 'react';
import { CheckIcon, CopyIcon, ThumbsDownIcon, ThumbsUpIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Loader } from '@/components/ai-elements/loader';
import {
    Message,
    MessageAction,
    MessageActions,
    MessageContent,
    MessageResponse,
} from '@/components/ai-elements/message';
import type { UIMessage as MessageType, ChatStatus } from 'ai';

export interface ChatMessageProps {
    message: MessageType;
    index: number;
    totalMessages: number;
    isLoading: boolean;
    status: ChatStatus;
    onCopy: (content: string, id: string) => void;
    onFeedback: (id: string, type: 'up' | 'down') => void;
    copiedId: string | null;
    feedbackState: Record<string, 'up' | 'down'>;
}

/**
 * ChatMessage component renders individual messages in the chat interface.
 * Handles both user and assistant messages with appropriate styling and actions.
 * 
 * @param message - The message object from the AI SDK
 * @param index - Position in the message array
 * @param totalMessages - Total number of messages (used for determining if this is the last message)
 * @param isLoading - Whether the chat is currently loading/streaming
 * @param status - Current chat status from useChat hook
 * @param onCopy - Callback for copying message content
 * @param onFeedback - Callback for thumbs up/down feedback
 * @param copiedId - ID of the currently copied message (for UI feedback)
 * @param feedbackState - Record of feedback given for each message
 */
export function ChatMessage({
    message,
    index,
    totalMessages,
    isLoading,
    status,
    onCopy,
    onFeedback,
    copiedId,
    feedbackState,
}: ChatMessageProps) {
    const isUser = message.role === 'user';
    const isLastMessage = index === totalMessages - 1;

    const content = useMemo(() => {
        return (
            message.parts
                ?.filter((part: any) => part.type === 'text')
                .map((part: any) => part.text)
                .join('') || ''
        );
    }, [message]);

    const hasContent = Boolean(content?.trim());

    // Show loader if it's the loading placeholder OR if it's the last assistant message with no content
    const showLoader = !isUser && isLastMessage && !hasContent;

    const showAssistantFeedbackOptions =
        !isUser && hasContent && status !== 'error';
    const showAssistantFeedbackOptionsForLatestMessage =
        !isUser &&
        hasContent &&
        status !== 'error' &&
        isLastMessage &&
        !isLoading;
    const showUserFeedbackOptions = isUser && hasContent;

    return (
        <Message
            from={message.role}
            className={cn("group relative w-fit", !isUser && "w-full")}
        >
            <MessageContent className="min-h-[20px]">
                {/* Both content and loader can render simultaneously during streaming transitions.
                    This prevents layout shift when the first chunk arrives but hasn't rendered yet. */}
                {hasContent && <MessageResponse>{content}</MessageResponse>}
                {showLoader && <Loader />}
            </MessageContent>

            {showUserFeedbackOptions && (
                <div className="absolute top-full mt-1 right-0 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200 z-10">
                    <MessageActions>
                        <MessageAction
                            tooltip="Copy"
                            onClick={() => onCopy(content, message.id)}
                        >
                            {copiedId === message.id ? (
                                <CheckIcon className="size-4 text-muted-foreground" />
                            ) : (
                                <CopyIcon className="size-4 text-muted-foreground" />
                            )}
                        </MessageAction>
                    </MessageActions>
                </div>
            )}

            {(isLastMessage
                ? showAssistantFeedbackOptionsForLatestMessage
                : showAssistantFeedbackOptions) && (
                    <div
                        className={cn(
                            'h-6 mt-1 flex justify-start',
                            isLastMessage &&
                            'animate-in fade-in slide-in-from-top-1 duration-700 fill-mode-forwards'
                        )}
                    >
                        <MessageActions className="flex items-center gap-1 -ml-2">
                            <MessageAction
                                tooltip="Copy"
                                onClick={() => onCopy(content, message.id)}
                            >
                                {copiedId === message.id ? (
                                    <CheckIcon className="size-4 text-muted-foreground" />
                                ) : (
                                    <CopyIcon className="size-4 text-muted-foreground" />
                                )}
                            </MessageAction>
                            <MessageAction
                                tooltip="Good response"
                                onClick={() => onFeedback(message.id, 'up')}
                            >
                                <ThumbsUpIcon
                                    className={cn(
                                        'size-4 text-muted-foreground',
                                        feedbackState[message.id] === 'up'
                                            ? 'fill-muted-foreground/30'
                                            : ''
                                    )}
                                />
                            </MessageAction>
                            <MessageAction
                                tooltip="Bad response"
                                onClick={() => onFeedback(message.id, 'down')}
                            >
                                <ThumbsDownIcon
                                    className={cn(
                                        'size-4 text-muted-foreground',
                                        feedbackState[message.id] === 'down'
                                            ? 'fill-muted-foreground/30'
                                            : ''
                                    )}
                                />
                            </MessageAction>
                        </MessageActions>
                    </div>
                )}
        </Message>
    );
}
