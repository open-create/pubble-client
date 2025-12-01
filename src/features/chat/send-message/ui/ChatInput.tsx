'use client';

import { useState, useRef } from 'react';
import { Button } from '@/shared/ui/button';
import { MessageType } from '@/entities/message';

type ChatInputProps = {
  onSend?: (message: { type: MessageType; content: string }) => void;
};

export function ChatInput({ onSend }: ChatInputProps) {
  const [text, setText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSendText = () => {
    if (!text.trim()) return;
    onSend?.({ type: 'text', content: text });
    setText('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendText();
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Prototype: just send the file name or a fake URL
      onSend?.({ type: 'image', content: URL.createObjectURL(file) });
      // Reset input
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleVoiceClick = () => {
    if (isRecording) {
      // Stop recording
      setIsRecording(false);
      onSend?.({ type: 'audio', content: 'voice-message.mp3' }); // Mock
    } else {
      // Start recording
      setIsRecording(true);
    }
  };

  return (
    <div className="bg-white border-t border-gray-200 p-4">
      <div className="max-w-4xl mx-auto flex items-end gap-2">
        {/* Image Upload */}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        <button
          type="button"
          onClick={handleImageClick}
          className="p-2 text-gray-500 hover:text-blue-500 hover:bg-gray-100 rounded-full transition-colors"
          title="이미지 전송"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </button>

        {/* Voice Record */}
        <button
          type="button"
          onClick={handleVoiceClick}
          className={`p-2 rounded-full transition-colors ${
            isRecording
              ? 'text-red-500 bg-red-50 animate-pulse'
              : 'text-gray-500 hover:text-red-500 hover:bg-gray-100'
          }`}
          title={isRecording ? '녹음 중지 및 전송' : '음성 녹음'}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
            />
          </svg>
        </button>

        {/* Text Input */}
        <div className="flex-1 bg-gray-100 rounded-2xl px-4 py-2">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="메시지를 입력하세요..."
            className="w-full bg-transparent border-none focus:ring-0 resize-none max-h-32 outline-none text-gray-900 placeholder-gray-500"
            rows={1}
            style={{ minHeight: '24px' }}
          />
        </div>

        {/* Send Button */}
        <Button
          variant="primary"
          onClick={handleSendText}
          disabled={!text.trim()}
          className={`transition-all px-3 py-2 ${
            text.trim() ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-gray-200 text-gray-400'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
        </Button>
      </div>
    </div>
  );
}
