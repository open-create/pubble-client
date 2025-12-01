'use client';

import { Button } from '@/shared/ui/button';

interface MeetingEndedNoticeProps {
  onViewMinutes: () => void;
  onDeleteMeeting: () => void;
}

export function MeetingEndedNotice({ onViewMinutes, onDeleteMeeting }: MeetingEndedNoticeProps) {
  return (
    <div className="bg-white border-t border-gray-200 p-6 flex flex-col items-center justify-center gap-4">
      <p className="text-lg font-medium text-gray-900">회의가 종료되었습니다.</p>
      <div className="flex items-center gap-3">
        <Button variant="secondary" onClick={onViewMinutes}>
          회의록 보러 가기
        </Button>
        <Button
          variant="ghost"
          className="text-red-500 hover:bg-red-50 hover:text-red-600"
          onClick={onDeleteMeeting}
        >
          회의 삭제하기
        </Button>
      </div>
    </div>
  );
}
