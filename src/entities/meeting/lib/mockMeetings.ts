import type { Meeting } from '../model/types';

export const mockMeetings: Meeting[] = [
  {
    id: 'kickoff',
    title: '퍼블 제품 기획 킥오프',
    createdAt: '2024.06.10 · 10:00',
    status: 'ongoing',
    hasMinutes: false,
  },
  {
    id: 'design-sync',
    title: '디자인 & 개발 주간 싱크',
    createdAt: '2024.06.07 · 15:30',
    status: 'ended',
    hasMinutes: true,
  },
  {
    id: 'sales-demo',
    title: '세일즈 데모 준비 회의',
    createdAt: '2024.06.04 · 09:00',
    status: 'ended',
    hasMinutes: true,
  },
];
