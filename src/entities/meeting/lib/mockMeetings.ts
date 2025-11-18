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
  {
    id: '1',
    title: '제품 기획 회의',
    createdAt: '2024.01.15 · 14:30',
    status: 'ongoing',
    hasMinutes: false,
  },
  {
    id: '2',
    title: '주간 팀 미팅',
    createdAt: '2024.01.14 · 10:00',
    status: 'ended',
    hasMinutes: true,
  },
  {
    id: '3',
    title: 'Q1 목표 설정',
    createdAt: '2024.01.13 · 15:00',
    status: 'ended',
    hasMinutes: true,
  },
  {
    id: '4',
    title: '디자인 리뷰',
    createdAt: '2024.01.12 · 16:30',
    status: 'ended',
    hasMinutes: false,
  },
  {
    id: '5',
    title: '개발팀 스프린트',
    createdAt: '2024.01.11 · 11:00',
    status: 'ended',
    hasMinutes: true,
  },
];
