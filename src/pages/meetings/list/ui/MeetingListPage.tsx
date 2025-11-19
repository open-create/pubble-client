'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import type { Room } from '@/entities/room';
import { mockRooms, RoomList } from '@/entities/room';
import { Button } from '@/shared/ui/button';
import { InviteModal } from '@/features/meeting/invite-modal';

type FilterType = 'all' | 'active' | 'ended';

export function MeetingListPage() {
  const router = useRouter();
  const [filter, setFilter] = useState<FilterType>('all');
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  const filteredRooms = useMemo(() => {
    if (filter === 'all') return mockRooms;
    return mockRooms.filter((room) => room.status === filter);
  }, [filter]);

  const handleRoomClick = (room: Room) => {
    router.push(`/meetings/${room.id}`);
  };

  const handleShareClick = (room: Room) => {
    setSelectedRoom(room);
  };

  const handleViewMinutes = (roomId: string) => {
    window.location.href = `/minutes/${roomId}`;
  };

  const getEmptyMessage = () => {
    if (filter === 'active') return '진행 중인 회의가 없습니다.';
    if (filter === 'ended') return '종료된 회의가 없습니다.';
    return '아직 회의가 없습니다.';
  };

  return (
    <div className="min-h-[calc(100vh-60px)] bg-slate-50">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* 헤더 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">전체 회의</h1>
          <p className="text-gray-600">참여한 모든 회의를 확인하세요.</p>
        </div>

        {/* 필터 + 새 회의 버튼 */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              전체
            </button>
            <button
              type="button"
              onClick={() => setFilter('active')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'active'
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              진행 중
            </button>
            <button
              type="button"
              onClick={() => setFilter('ended')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'ended'
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              종료됨
            </button>
          </div>

          <Button onClick={() => router.push('/meetings/new')} className="w-full md:w-auto">
            새 회의 만들기
          </Button>
        </div>

        {/* 회의 목록 */}
        {filteredRooms.length > 0 ? (
          <RoomList
            rooms={filteredRooms}
            onRoomClick={handleRoomClick}
            onShare={handleShareClick}
            onViewMinutes={handleViewMinutes}
            emptyMessage={getEmptyMessage()}
          />
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
            <p className="text-gray-500 mb-4">{getEmptyMessage()}</p>
            <Button onClick={() => router.push('/meetings/new')}>첫 회의 만들기</Button>
          </div>
        )}
      </div>

      {/* 초대 모달 */}
      {selectedRoom && (
        <InviteModal
          isOpen={!!selectedRoom}
          onClose={() => setSelectedRoom(null)}
          inviteLink={`https://pubble.com/meet/${selectedRoom.id}`}
          meetingTitle={selectedRoom.title}
        />
      )}
    </div>
  );
}
