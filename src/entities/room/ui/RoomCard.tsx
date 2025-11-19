import type { Room } from '../model/types';

interface RoomCardProps {
  room: Room;
  onClick?: () => void;
  onShare?: (e: React.MouseEvent) => void;
  onViewMinutes?: (e: React.MouseEvent) => void;
}

export function RoomCard({ room, onClick, onShare, onViewMinutes }: RoomCardProps) {
  const statusMeta = {
    active: {
      label: '진행 중',
      badgeClass: 'bg-emerald-100 text-emerald-700',
    },
    ended: {
      label: '종료',
      badgeClass: 'bg-gray-100 text-gray-700',
    },
  };

  return (
    <div className="w-full bg-slate-50 hover:bg-slate-100 transition-colors rounded-2xl px-5 py-4 border border-slate-100">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* 좌측: 회의 정보 */}
        <button type="button" onClick={onClick} className="flex-1 text-left">
          <p className="text-lg font-semibold text-gray-900">{room.title}</p>
          <p className="text-sm text-gray-500">{room.createdAt}</p>
        </button>

        {/* 우측: 상태 및 액션 */}
        <div className="flex flex-wrap items-center gap-3">
          {/* 상태 뱃지 */}
          <span
            className={`px-3 py-1 text-sm rounded-full font-medium ${
              statusMeta[room.status].badgeClass
            }`}
          >
            {statusMeta[room.status].label}
          </span>

          {/* 종료된 회의만: 회의록 버튼 */}
          {room.status === 'ended' && (
            <>
              {room.noteId ? (
                <button
                  type="button"
                  onClick={onViewMinutes}
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

          {/* 공유 버튼 */}
          {onShare && (
            <button
              type="button"
              onClick={onShare}
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
          )}
        </div>
      </div>
    </div>
  );
}
