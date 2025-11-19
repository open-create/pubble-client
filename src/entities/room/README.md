# Room Entity

회의방의 기본 정보와 상태를 관리하는 핵심 도메인

## 비즈니스 규칙

1. 회의방 생성 시 `status`는 `"active"`로 시작
2. 회의 종료 시 `status`가 `"ended"`로 변경 (일방향, 되돌릴 수 없음)
3. `noteId`가 있으면 회의록이 생성된 것, 없으면 아직 생성 전 또는 생성 중
4. 회의 공유: 최대 20명, 비밀번호 선택

## 타입 정의

```tsx
export type RoomStatus = 'active' | 'ended';

export interface Room {
  id: string; // 회의방 고유 식별자
  title: string; // 회의방 제목
  createdAt: string; // 생성 시간
  status: RoomStatus; // 회의방 상태
  hostUserId: string; // 방장 사용자 ID
  noteId?: string; // 생성된 회의록 ID
}
```

## 관련 기능

- `features/meeting/create-room` - 회의방 생성
- `features/meeting/invite-modal` - 초대 링크 공유
- `pages/meetings/*` - 회의방 관련 페이지들
