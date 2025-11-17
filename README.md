# Pubble Client

Next.js + Feature-Sliced Design(FSD) 기반 프로젝트입니다.

## 🏗️ 기술 스택

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Architecture**: Feature-Sliced Design (FSD)

## 🎨 브랜드 컬러

- **Primary**: `#48A2E2` - 메인 브랜드 컬러 (밝은 파란색)
- **Secondary**: `#C9DAED` - 보조 컬러 (연한 하늘색)

Tailwind에서 `bg-primary`, `text-primary`, `border-primary` 등으로 사용 가능합니다.

## 📁 폴더 구조

```
pubble-client/
├── app/                          # Next.js App Router (라우팅 담당)
│   ├── layout.tsx
│   ├── page.tsx
│   └── room/
│       └── [roomId]/
│           └── page.tsx
│
├── pages/                        # Pages Router 호환성 유지
│   └── README.md
│
├── src/
│   ├── app/                      # FSD app layer (전역 설정, providers)
│   │   ├── globals.css
│   │   └── README.md
│   ├── entities/                 # 도메인 모델
│   │   └── README.md
│   ├── features/                 # 기능 단위
│   │   └── README.md
│   ├── pages/                    # FSD 페이지 컴포넌트
│   │   ├── meeting/
│   │   │   └── MeetingPage.tsx
│   │   └── README.md
│   ├── widgets/                  # UI 블록
│   │   └── README.md
│   └── shared/                   # 공통 유틸/컴포넌트
│       └── README.md
│
├── public/                       # 정적 파일
├── middleware.ts                 # Next.js middleware
└── README.md
```

## 🎯 FSD 레이어 설명

### 1. **app/** (Next.js Routing)

Next.js App Router 전용 폴더로, 실제 라우팅을 담당합니다.
FSD의 `src/pages` 컴포넌트를 import하여 사용합니다.

### 2. **src/app** (FSD App Layer)

애플리케이션 전역 설정을 담당합니다.

- Context Providers
- 전역 상태 관리
- 전역 스타일 (globals.css)

### 3. **src/entities**

도메인 모델(비즈니스 엔티티)을 관리합니다.

- 예: User, Room, Message 등의 핵심 도메인 객체
- 관련 API 호출, 상태 관리, 타입 정의

### 4. **src/features**

사용자 인터랙션과 비즈니스 기능 단위를 관리합니다.

- 예: 로그인, 채팅 전송, 화상 통화 제어
- 사용자 액션과 직접 연결되는 기능

### 5. **src/pages**

FSD의 페이지 레벨 컴포넌트를 관리합니다.

- 각 라우트별 페이지 컴포넌트
- 페이지별 비즈니스 로직 구성

### 6. **src/widgets**

페이지를 구성하는 독립적인 UI 블록을 관리합니다.

- 예: Header, Sidebar, Footer, VideoGrid
- 재사용 가능한 복합 컴포넌트

### 7. **src/shared**

프로젝트 전역에서 사용되는 공통 리소스를 관리합니다.

- UI 컴포넌트 (Button, Input 등)
- 유틸리티 함수
- 타입 정의
- 상수

## 🔗 라우팅 연결 방식

Next.js의 `app/` 폴더에서 FSD의 `src/pages` 컴포넌트를 import하여 연결합니다.

**예시:**

```tsx
// app/room/[roomId]/page.tsx
import { MeetingPage } from '@/pages/meeting';

export default function RoomPage({ params }: { params: { roomId: string } }) {
  return <MeetingPage roomId={params.roomId} />;
}
```

```tsx
// src/pages/meeting/ui/MeetingPage.tsx
export function MeetingPage({ roomId }: { roomId: string }) {
  return <div>Meeting Room: {roomId}</div>;
}
```

## 🚀 시작하기

### 개발 서버 실행

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000)에서 결과를 확인할 수 있습니다.

### 예시 라우트

- 홈: `http://localhost:3000`
- 미팅 룸: `http://localhost:3000/room/test-room-123`

## 📝 개발 가이드

### 새로운 페이지 추가

1. `src/pages/` 에 페이지 컴포넌트 생성
2. `app/` 에 라우트 파일 생성 및 import

### 새로운 기능 추가

1. `src/features/` 에 기능 폴더 생성
2. 필요한 경우 `src/entities/` 에 도메인 모델 추가
3. `src/pages/` 에서 해당 기능 사용

### 공통 컴포넌트 추가

1. `src/shared/ui/` 에 컴포넌트 생성
2. export하여 다른 레이어에서 사용

## 🔧 TypeScript 경로 Alias

```json
{
  "paths": {
    "@/*": ["./src/*"]
  }
}
```

`@/` 를 사용하여 `src/` 내부 모듈을 import할 수 있습니다.

## 📚 참고 자료

- [Next.js Documentation](https://nextjs.org/docs)
- [Feature-Sliced Design](https://feature-sliced.design/)
- [Tailwind CSS](https://tailwindcss.com/docs)
