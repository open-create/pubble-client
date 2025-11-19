'use client';

import { useMemo, useState } from 'react';
import type { Room } from '@/entities/room';
import { Button } from '@/shared/ui/button';
import { InviteModal } from '@/features/meeting/invite-modal';

interface RecentMeetingsProps {
  rooms: Room[];
  onRoomClick: (room: Room) => void;
  onViewAll: () => void;
}

export function RecentMeetings({ rooms, onRoomClick, onViewAll }: RecentMeetingsProps) {
  const hasRooms = rooms.length > 0;
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  const statusMeta = useMemo(
    () => ({
      active: {
        label: '진행 중',
        badgeClass: 'bg-emerald-100 text-emerald-700',
      },
      ended: {
        label: '종료',
        badgeClass: 'bg-gray-100 text-gray-700',
      },
    }),
    []
  );

  const handleShareClick = (e: React.MouseEvent, room: Room) => {
    e.stopPropagation();
    setSelectedRoom(room);
  };

  const handleViewMinutes = (e: React.MouseEvent, roomId: string) => {
    e.stopPropagation();
    // 회의록 페이지로 이동
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

      {hasRooms ? (
        <div className="space-y-3">
          {rooms.map((room) => (
            <div
              key={room.id}
              className="w-full bg-slate-50 hover:bg-slate-100 transition-colors rounded-2xl px-5 py-4 border border-slate-100"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <button
                  type="button"
                  onClick={() => onRoomClick(room)}
                  className="flex-1 text-left"
                >
                  <p className="text-lg font-semibold text-gray-900">{room.title}</p>
                  <p className="text-sm text-gray-500">{room.createdAt}</p>
                </button>

                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className={`px-3 py-1 text-sm rounded-full font-medium ${
                      statusMeta[room.status].badgeClass
                    }`}
                  >
                    {statusMeta[room.status].label}
                  </span>
                  {room.status === 'ended' && (
                    <>
                      {room.noteId ? (
                        <button
                          type="button"
                          onClick={(e) => handleViewMinutes(e, room.id)}
                          className="px-3 py-1 text-sm rounded-full font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                        >
                          회의록 보기
                        </button>
                      ) : (
                        <span className="px-3 py-1 text-sm rounded-full font-medium bg-gray-100 text-gray-500">
                          생성 중
                        </span>
                      )}
                    </>
                  )}
                  <button
                    type="button"
                    onClick={(e) => handleShareClick(e, room)}
                    className="p-2 rounded-lg hover:bg-white transition-colors text-gray-600 hover:text-primary"
                    title="공유하기"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">아직 진행된 회의가 없습니다.</div>
      )}

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
