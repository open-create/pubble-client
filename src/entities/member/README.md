# Member Entity

User와 Room을 이어주는 관계 도메인

## 비즈니스 규칙

1. **로그인 사용자**: `userId` 있음, `nickname`은 `user.name`에서 복사
2. **비회원**: `userId` 없음, `nickname`은 입장 시 직접 입력
3. `role === "host"`: 회의방 생성자, 방당 1명
4. `role === "participant"`: 일반 참여자

## 타입 정의

```tsx
export type MemberRole = 'host' | 'participant';

export interface Member {
  roomId: string;
  userId?: string;
  nickname: string;
  role: MemberRole;
  joinedAt: string;
}
```

## 관련 기능

- 회의방 참여 시 Member 레코드 생성
- 참여자 목록 표시
