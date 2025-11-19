export type MemberRole = 'host' | 'participant';

export interface Member {
  roomId: string; // 참여 중인 회의방 ID (Room.id 참조)
  userId?: string; // 로그인 사용자는 있음 / 비회원은 없음 (User.id 참조)
  nickname: string; // 비회원 → 입력값 / 회원 → user.name 복사
  role: MemberRole; // 역할 (host: 방장, participant: 참여자)
  joinedAt: string; // 참여 시간
}
