'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { InviteModal } from '@/features/meeting/invite-modal';
import { Button } from '@/shared/ui';

interface MeetingDetailPageProps {
  roomId: string;
}

export function MeetingDetailPage({ roomId }: MeetingDetailPageProps) {
  const searchParams = useSearchParams();
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [isWelcome, setIsWelcome] = useState(false);

  // Query parameter로 전달된 회의 제목 (없으면 기본값)
  const meetingTitle = searchParams?.get('title') || '새 회의';

  useEffect(() => {
    // 회의 생성 직후 진입한 경우 환영 모달 자동 열기
    if (searchParams?.get('showInvite') === 'true') {
      setShowInviteModal(true);
      setIsWelcome(true);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 회의방 정보 섹션 */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* 좌측: 회의 정보 */}
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{meetingTitle}</h1>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  참여자 3명
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  진행 중
                </span>
              </div>
            </div>

            {/* 우측: 액션 버튼 */}
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                onClick={() => {
                  setShowInviteModal(true);
                  setIsWelcome(false);
                }}
                className="flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                  />
                </svg>
                <span className="hidden sm:inline">참여자 초대</span>
                <span className="sm:hidden">초대</span>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 회의방 본문 (TODO: 실제 회의 UI 구현) */}
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-white rounded-3xl shadow-lg p-8 text-center">
          <h2 className="text-xl font-semibold mb-4">회의방 화면</h2>
          <p className="text-gray-600">채팅, 음성, 화면 공유 UI가 여기에 들어갑니다.</p>
        </div>
      </div>

      {/* 초대 모달 */}
      {showInviteModal && (
        <InviteModal
          isOpen={showInviteModal}
          onClose={() => setShowInviteModal(false)}
          inviteLink={`https://pubble.com/meet/${roomId}`}
          meetingTitle={meetingTitle}
          isWelcome={isWelcome}
        />
      )}
    </div>
  );
}
