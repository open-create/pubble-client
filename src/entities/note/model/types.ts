export interface Note {
  id: string; // 회의록 고유 식별자
  roomId: string; // 회의록이 속한 회의방 ID (Room.id 참조)
  content: string; // 회의록 내용 (AI 생성)
  createdAt: string; // 회의록 생성 시간
}
