'use client';

import { Message } from '../model/types';

type MessageBubbleProps = {
  message: Message;
  isMe: boolean;
};

export function MessageBubble({ message, isMe }: MessageBubbleProps) {
  return (
    <div className={`flex ${isMe ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-[70%] ${isMe ? 'items-end' : 'items-start'} flex flex-col`}>
        {!isMe && <span className="text-xs text-gray-500 mb-1 ml-1">{message.senderId}</span>}
        <div
          className={`px-4 py-2 rounded-2xl ${
            isMe
              ? 'bg-blue-500 text-white rounded-tr-none'
              : 'bg-white text-gray-900 border border-gray-200 rounded-tl-none'
          }`}
        >
          {message.type === 'text' && <p className="whitespace-pre-wrap break-words">{message.content}</p>}
          {message.type === 'image' && (
            <img src={message.content} alt="Shared" className="max-w-full rounded-lg" />
          )}
          {message.type === 'audio' && (
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                />
              </svg>
              <span>음성 메시지</span>
            </div>
          )}
        </div>
        <span className={`text-xs text-gray-400 mt-1 ${isMe ? 'mr-1' : 'ml-1'}`}>
          {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
}
