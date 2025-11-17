export type MeetingStatus = 'ongoing' | 'ended';

export interface Meeting {
  id: string; // 회의 고유 식별자
  title: string; // 회의 제목
  createdAt: string; // 회의 생성 일시
  status: MeetingStatus; // 회의 상태
  hasMinutes: boolean; // 회의록 존재 여부
}
