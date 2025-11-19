export type MessageType = 'text' | 'image' | 'audio';

export interface Message {
  id: string; // 메시지 고유 식별자
  roomId: string; // 메시지가 속한 회의방 ID (Room.id 참조)
  senderId: string; // 발신자 ID (Member 식별자)
  type: MessageType; // 메시지 타입
  content: string; // text: 메시지 내용 / image,audio: URL
  createdAt: string; // 메시지 생성 시간

  // optional 확장:
  // editedAt?: string;    // 수정 시간
  // deletedAt?: string;   // 삭제 시간
}
