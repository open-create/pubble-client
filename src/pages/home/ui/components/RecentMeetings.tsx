'use client';

import { useState } from 'react';
import type { Room } from '@/entities/room';
import { RoomList } from '@/entities/room';
import { Button } from '@/shared/ui/button';
import { InviteModal } from '@/features/meeting/invite-modal';

interface RecentMeetingsProps {
  rooms: Room[];
  onRoomClick: (room: Room) => void;
  onViewAll: () => void;
}

export function RecentMeetings({ rooms, onRoomClick, onViewAll }: RecentMeetingsProps) {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  const handleShareClick = (room: Room) => {
    setSelectedRoom(room);
  };

  const handleViewMinutes = (roomId: string) => {
    window.location.href = `/minutes/${roomId}`;
  };

  return (
    <section className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">최근 회의 목록</h2>
          <p className="text-gray-500 text-sm">
            회의 제목, 생성일, 상태, 회의록 여부를 한 번에 확인하세요.
          </p>
        </div>
        <Button variant="secondary" className="self-start" onClick={onViewAll}>
          회의 전체 보기
        </Button>
      </div>

      <RoomList
        rooms={rooms}
        onRoomClick={onRoomClick}
        onShare={handleShareClick}
        onViewMinutes={handleViewMinutes}
      />

      {selectedRoom && (
        <InviteModal
          isOpen={!!selectedRoom}
          onClose={() => setSelectedRoom(null)}
          inviteLink={`https://pubble.com/meet/${selectedRoom.id}`}
          meetingTitle={selectedRoom.title}
        />
      )}
    </section>
  );
}
