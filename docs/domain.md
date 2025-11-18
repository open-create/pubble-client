# 도메인 모델 문서

Pubble 프로젝트의 전체 도메인 모델 정의

---

## 도메인 엔티티

### 1. Room (회의방)

회의방의 기본 정보와 상태를 관리하는 핵심 도메인

```tsx
export type RoomStatus = 'active' | 'ended';

export type Room = {
  id: string; // 회의방 고유 식별자
  title: string; // 회의방 제목
  createdAt: string; // 생성 시간
  status: RoomStatus; // 회의방 상태 (active: 진행중, ended: 종료)
  hostUserId: string; // 방장 사용자 ID (User.id 참조)
  noteId?: string; // 생성된 회의록 ID (Note.id 참조, 있으면 회의록 생성 완료)
};
```

**비즈니스 규칙**:

- 회의방 생성 시 `status`는 `"active"`로 시작
- 회의 종료 시 `status`가 `"ended"`로 변경 (일방향, 되돌릴 수 없음)
- `noteId`가 있으면 회의록이 생성된 것, 없으면 아직 생성 전 또는 생성 중

---

### 2. Member (참여자)

User와 Room을 이어주는 관계 도메인

```tsx
export type MemberRole = 'host' | 'participant';

export type Member = {
  roomId: string; // 참여 중인 회의방 ID (Room.id 참조)
  userId?: string; // 로그인 사용자는 있음 / 비회원은 없음 (User.id 참조)
  nickname: string; // 비회원 → 입력값 / 회원 → user.name 복사
  role: MemberRole; // 역할 (host: 방장, participant: 참여자)
  joinedAt: string; // 참여 시간
};
```

**비즈니스 규칙**:

- **로그인 사용자**: `userId` 있음, `nickname`은 `user.name`에서 복사
- **비회원**: `userId` 없음, `nickname`은 입장 시 직접 입력
- `role === "host"`: 회의방 생성자, 방당 1명
- `role === "participant"`: 일반 참여자

---

### 3. Message (메시지)

회의 중 주고받는 메시지 (텍스트, 이미지, 음성)

```tsx
type MessageType = 'text' | 'image' | 'audio';

type Message = {
  id: string; // 메시지 고유 식별자
  roomId: string; // 메시지가 속한 회의방 ID (Room.id 참조)
  senderId: string; // 발신자 ID (Member 식별자 - userId 또는 임시 ID)
  type: MessageType; // 메시지 타입
  content: string; // text: 메시지 내용 / image,audio: URL
  createdAt: string; // 메시지 생성 시간

  // optional 확장:
  // editedAt?: string;    // 수정 시간
  // deletedAt?: string;   // 삭제 시간
};
```

**비즈니스 규칙**:

- `type === "text"`: `content`에 텍스트 메시지 내용
- `type === "image"`: `content`에 이미지 URL
- `type === "audio"`: `content`에 오디오 파일 URL
- 회의록 생성 시 모든 메시지가 AI에 의해 분석됨

---

### 4. User (사용자)

로그인한 사용자의 기본 정보

```tsx
type User = {
  id: string; // 사용자 고유 식별자
  name: string; // 사용자 이름 (닉네임)
  avatarUrl?: string; // 프로필 이미지 URL (선택사항)
};
```

**비즈니스 규칙**:

- 회원가입 시 생성
- `name`은 회의방 참여 시 `Member.nickname`으로 복사됨
- `avatarUrl`은 선택사항 (없을 수 있음)

---

### 5. Note (회의록)

AI가 자동 생성하는 회의록

```tsx
type Note = {
  id: string; // 회의록 고유 식별자
  roomId: string; // 회의록이 속한 회의방 ID (Room.id 참조)
  content: string; // 회의록 내용 (AI 생성)
  createdAt: string; // 회의록 생성 시간
};
```

**비즈니스 규칙**:

- `Room.status === "ended"` 일 때만 생성 가능
- AI가 회의 중 수집된 텍스트, 음성, 이미지를 분석하여 자동 생성
- 생성 완료 시 `Room.noteId`에 할당됨
- 회의록 포함 내용:
  - 요약: 회의 목표와 주요 의사결정
  - 타임스탬프: 발언 시각과 화자
  - 액션 아이템: 담당자와 기한
  - 첨부 파일: 업로드한 이미지/파일

---

## 도메인 간 관계

```
User (1) ──────┐
               ├─── (N) Member (N) ──── (1) Room
               │                              │
               │                              │ (1)
               │                              │
               │                              ↓
               │                           (1) Note
               │
               └─── (N) Message (N) ──── (1) Room
```

### 관계 상세

1. **User ↔ Room** (N:N, Member를 통한 다대다)

   - User는 여러 Room에 참여 가능
   - Room은 여러 User를 가질 수 있음
   - Member 테이블이 중간 관계 테이블 역할

2. **Room → Note** (1:1, 선택적)

   - Room은 최대 1개의 Note를 가짐
   - Note는 반드시 1개의 Room에 속함

3. **Member → Room** (N:1)

   - Member는 1개의 Room에 속함
   - Room은 여러 Member를 가짐

4. **Message → Room** (N:1)

   - Message는 1개의 Room에 속함
   - Room은 여러 Message를 가짐

5. **Message → Member** (N:1, senderId 참조)
   - Message는 1명의 Member가 작성
   - Member는 여러 Message를 작성 가능

---

## 도메인 설계 원칙

### 1. 단방향 참조

- 각 도메인은 가능한 한 단방향으로 참조
- 예: Message → Room (O), Room → Message (X)

### 2. 선택적 관계

- `Room.noteId`: Note가 없을 수도 있음 (optional)
- `Member.userId`: 비회원은 userId가 없음 (optional)
- `User.avatarUrl`: 프로필 이미지가 없을 수도 있음 (optional)

### 3. 확장 가능성

- Message에 `editedAt`, `deletedAt` 등 확장 가능
- 각 도메인은 독립적으로 확장 가능하도록 설계

---

## 주요 유즈케이스

### 1. 회원 회의 참여

```
1. User 로그인
2. Room 생성/참여
3. Member 레코드 생성 (userId 있음, nickname은 user.name 복사)
4. Message 주고받기
5. Room 종료 → Note 자동 생성
```

### 2. 비회원 회의 참여

```
1. Room 초대 링크 접속
2. nickname 입력
3. Member 레코드 생성 (userId 없음, nickname은 입력값)
4. Message 주고받기
5. (회의록은 방장이 확인 가능)
```

### 3. 회의록 생성

```
1. Room.status === "active"
2. 회의 진행 중 Message 수집
3. 회의 종료 (Room.status = "ended")
4. AI가 Message 분석
5. Note 생성
6. Room.noteId 업데이트
```

---

## 파일 위치

각 도메인의 구현 위치:

```
src/entities/
├── room/
│   ├── model/
│   │   └── types.ts        # Room, RoomStatus 타입
│   ├── lib/
│   │   └── mockRooms.ts    # Mock 데이터
│   └── README.md
│
├── member/
│   ├── model/
│   │   └── types.ts        # Member, MemberRole 타입
│   └── README.md
│
├── message/
│   ├── model/
│   │   └── types.ts        # Message, MessageType 타입
│   └── README.md
│
├── user/
│   ├── model/
│   │   └── types.ts        # User 타입
│   └── README.md
│
└── note/
    ├── model/
    │   └── types.ts        # Note 타입
    └── README.md
```
