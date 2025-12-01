import { useEffect, useRef, useState } from 'react';
import { Message, MessageType, mockMessages } from '@/entities/message';
import { Room, mockRooms } from '@/entities/room';

interface UseMeetingRoomParams {
  roomId: string;
  meetingTitle: string;
}

const CURRENT_USER_ID = 'Me';

export function useMeetingRoom({ roomId, meetingTitle }: UseMeetingRoomParams) {
  const [room, setRoom] = useState<Room>(() => {
    const foundRoom = mockRooms.find((r) => r.id === roomId);
    if (foundRoom) return foundRoom;

    return {
      id: roomId,
      title: meetingTitle,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      status: 'active',
      hostUserId: CURRENT_USER_ID,
    };
  });

  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleExpire = () => {
    setRoom((prev) => ({ ...prev, status: 'ended' }));
  };

  const handleSendMessage = (messageInput: { type: MessageType; content: string }) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      roomId,
      senderId: CURRENT_USER_ID,
      type: messageInput.type,
      content: messageInput.content,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, newMessage]);
  };

  return {
    room,
    messages,
    handleExpire,
    handleSendMessage,
    bottomRef,
    currentUserId: CURRENT_USER_ID,
  };
}
