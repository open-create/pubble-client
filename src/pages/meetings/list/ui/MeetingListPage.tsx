'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import type { Meeting } from '@/entities';
import { mockMeetings } from '@/entities';
import { Button } from '@/shared';
import { InviteModal } from '@/features';

type FilterType = 'all' | 'ongoing' | 'ended';

export function MeetingListPage() {
  const router = useRouter();
  const [filter, setFilter] = useState<FilterType>('all');
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);

  const filteredMeetings = useMemo(() => {
    if (filter === 'all') return mockMeetings;
    return mockMeetings.filter((meeting) => meeting.status === filter);
  }, [filter]);

  const statusMeta = useMemo(
    () => ({
      ongoing: {
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

  const handleMeetingClick = (meeting: Meeting) => {
    router.push(`/meetings/${meeting.id}`);
  };

  const handleShareClick = (e: React.MouseEvent, meeting: Meeting) => {
    e.stopPropagation();
    setSelectedMeeting(meeting);
  };

  const handleViewMinutes = (e: React.MouseEvent, meetingId: string) => {
    e.stopPropagation();
    window.location.href = `/minutes/${meetingId}`;
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
              onClick={() => setFilter('ongoing')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'ongoing'
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
        <div className="space-y-3">
          {filteredMeetings.length > 0 ? (
            filteredMeetings.map((meeting) => (
              <div
                key={meeting.id}
                className="bg-white hover:bg-gray-50 transition-colors rounded-2xl px-6 py-5 border border-gray-100 shadow-sm"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <button
                    type="button"
                    onClick={() => handleMeetingClick(meeting)}
                    className="flex-1 text-left"
                  >
                    <p className="text-xl font-semibold text-gray-900 mb-1">{meeting.title}</p>
                    <p className="text-sm text-gray-500">{meeting.createdAt}</p>
                  </button>

                  <div className="flex flex-wrap items-center gap-3">
                    <span
                      className={`px-3 py-1 text-sm rounded-full font-medium ${
                        statusMeta[meeting.status].badgeClass
                      }`}
                    >
                      {statusMeta[meeting.status].label}
                    </span>

                    {meeting.status === 'ended' && (
                      <>
                        {meeting.hasMinutes ? (
                          <button
                            type="button"
                            onClick={(e) => handleViewMinutes(e, meeting.id)}
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
                      onClick={(e) => handleShareClick(e, meeting)}
                      className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600 hover:text-primary"
                      title="공유하기"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
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
            ))
          ) : (
            <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
              <p className="text-gray-500 mb-4">
                {filter === 'ongoing' && '진행 중인 회의가 없습니다.'}
                {filter === 'ended' && '종료된 회의가 없습니다.'}
                {filter === 'all' && '아직 회의가 없습니다.'}
              </p>
              <Button onClick={() => router.push('/meetings/new')}>첫 회의 만들기</Button>
            </div>
          )}
        </div>
      </div>

      {/* 초대 모달 */}
      {selectedMeeting && (
        <InviteModal
          isOpen={!!selectedMeeting}
          onClose={() => setSelectedMeeting(null)}
          inviteLink={`https://pubble.com/meet/${selectedMeeting.id}`}
          meetingTitle={selectedMeeting.title}
        />
      )}
    </div>
  );
}
