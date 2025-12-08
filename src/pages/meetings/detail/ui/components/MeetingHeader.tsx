'use client';

import { Button } from '@/shared/ui/button';
import { SmartTimer } from '@/widgets/room-timer';

interface MeetingHeaderProps {
  title: string;
  participantCount: number;
  onInviteClick: () => void;
  onTimerExpire: () => void;
}

export function MeetingHeader({
  title,
  participantCount,
  onInviteClick,
  onTimerExpire,
}: MeetingHeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 flex-none">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* 좌측: 회의 정보 */}
          <div>
            <h1 className="text-xl font-bold text-gray-900">{title}</h1>
            <div className="flex items-center gap-3 mt-1 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                {participantCount}명
              </span>
              <SmartTimer onExpire={onTimerExpire} inline />
            </div>
          </div>

          {/* 우측: 액션 버튼 */}
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              onClick={onInviteClick}
              className="flex items-center gap-2 text-sm px-3 py-1.5"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
              <span className="hidden sm:inline">초대</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
