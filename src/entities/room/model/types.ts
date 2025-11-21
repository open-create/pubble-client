export type RoomStatus = 'active' | 'ended';

export interface Room {
  id: string; // 회의방 고유 식별자
  title: string; // 회의방 제목
  createdAt: string; // 생성 시간
  expiresAt: string; // 종료 시간, expiresAt: string;
  status: RoomStatus; // 회의방 상태 (active: 진행중, ended: 종료)
  hostUserId: string; // 방장 사용자 ID (User.id 참조)
  noteId?: string; // 생성된 회의록 ID (Note.id 참조, 있으면 회의록 생성 완료)
}
