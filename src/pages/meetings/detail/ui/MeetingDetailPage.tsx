'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { InviteModal } from '@/features/meeting/invite-modal';
import { ChatInput } from '@/features/chat/send-message';
import { MeetingHeader } from './components/MeetingHeader';
import { MessageList } from './components/MessageList';
import { MeetingEndedNotice } from './components/MeetingEndedNotice';
import { useMeetingRoom } from '../model/useMeetingRoom';

interface MeetingDetailPageProps {
  roomId: string;
}

export function MeetingDetailPage({ roomId }: MeetingDetailPageProps) {
  const searchParams = useSearchParams();
  const shouldShowInvite = searchParams?.get('showInvite') === 'true';
  const [showInviteModal, setShowInviteModal] = useState(shouldShowInvite);
  const [isWelcome, setIsWelcome] = useState(shouldShowInvite);

  const meetingTitle = searchParams?.get('title') || '새 회의';
  const { room, messages, handleExpire, handleSendMessage, bottomRef, currentUserId } =
    useMeetingRoom({
      roomId,
      meetingTitle,
    });

  return (
    <div
      className={`h-screen flex flex-col bg-gray-100 ${
        room.status === 'ended' ? 'bg-red-100' : ''
      }`}
    >
      <MeetingHeader
        title={room.title}
        participantCount={3}
        onTimerExpire={handleExpire}
        onInviteClick={() => {
          setShowInviteModal(true);
          setIsWelcome(false);
        }}
      />

      <main className="flex-1 flex flex-col overflow-hidden max-w-6xl mx-auto w-full bg-white shadow-sm md:my-4 md:rounded-2xl md:border md:border-gray-200">
        <MessageList messages={messages} currentUserId={currentUserId} bottomRef={bottomRef} />

        {room.status === 'ended' ? (
          <MeetingEndedNotice
            onViewMinutes={() => alert('회의록 보러 가기')}
            onDeleteMeeting={() => alert('회의 삭제하기')}
          />
        ) : (
          <ChatInput onSend={handleSendMessage} />
        )}
      </main>

      {/* 초대 모달 */}
      {showInviteModal && (
        <InviteModal
          isOpen={showInviteModal}
          onClose={() => setShowInviteModal(false)}
          inviteLink={`https://pubble.com/meet/${roomId}`}
          meetingTitle={room.title}
          isWelcome={isWelcome}
        />
      )}
    </div>
  );
}
