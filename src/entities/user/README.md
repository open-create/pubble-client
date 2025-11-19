# User Entity

로그인한 사용자의 기본 정보

## 비즈니스 규칙

1. 회원가입 시 생성
2. `name`은 회의방 참여 시 `Member.nickname`으로 복사됨
3. `avatarUrl`은 선택사항 (없을 수 있음)

## 타입 정의

```tsx
export interface User {
  id: string;
  name: string;
  avatarUrl?: string;
}
```

## 관련 기능

- `features/auth/signup` - 회원가입
- `features/auth/login` - 로그인
- Member 생성 시 User 정보 참조
