'use client';

import { RefObject } from 'react';
import { MessageBubble, Message } from '@/entities/message';

interface MessageListProps {
  messages: Message[];
  currentUserId: string;
  bottomRef: RefObject<HTMLDivElement | null>;
}

export function MessageList({ messages, currentUserId, bottomRef }: MessageListProps) {
  return (
    <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
      {messages.map((msg) => (
        <MessageBubble key={msg.id} message={msg} isMe={msg.senderId === currentUserId} />
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
