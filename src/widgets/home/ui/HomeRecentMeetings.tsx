'use client';

import { useMemo } from 'react';
import type { Meeting } from '@/entities/meeting';
import { Button } from '@/shared/ui';

interface HomeRecentMeetingsProps {
  meetings: Meeting[];
  onMeetingClick: (meeting: Meeting) => void;
  onViewAll: () => void;
}

export function HomeRecentMeetings({
  meetings,
  onMeetingClick,
  onViewAll,
}: HomeRecentMeetingsProps) {
  const hasMeetings = meetings.length > 0;

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

      {hasMeetings ? (
        <div className="space-y-3">
          {meetings.map((meeting) => (
            <button
              key={meeting.id}
              type="button"
              onClick={() => onMeetingClick(meeting)}
              className="w-full text-left bg-slate-50 hover:bg-slate-100 transition-colors rounded-2xl px-5 py-4 border border-slate-100"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-lg font-semibold text-gray-900">{meeting.title}</p>
                  <p className="text-sm text-gray-500">{meeting.createdAt}</p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className={`px-3 py-1 text-sm rounded-full font-medium ${
                      statusMeta[meeting.status].badgeClass
                    }`}
                  >
                    {statusMeta[meeting.status].label}
                  </span>
                  {meeting.status === 'ended' && (
                    <span
                      className={`px-3 py-1 text-sm rounded-full font-medium ${
                        meeting.hasMinutes
                          ? 'bg-primary/10 text-primary'
                          : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {meeting.hasMinutes ? '회의록 ✅' : '생성 중'}
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">아직 진행된 회의가 없습니다.</div>
      )}
    </section>
  );
}
