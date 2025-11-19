# Note Entity

AI가 자동 생성하는 회의록

## 비즈니스 규칙

1. `Room.status === "ended"` 일 때만 생성 가능
2. AI가 회의 중 수집된 텍스트, 음성, 이미지를 분석하여 자동 생성
3. 생성 완료 시 `Room.noteId`에 할당됨
4. 회의록 포함 내용:
   - 요약: 회의 목표와 주요 의사결정
   - 타임스탬프: 발언 시각과 화자
   - 액션 아이템: 담당자와 기한
   - 첨부 파일: 업로드한 이미지/파일

## 타입 정의

```tsx
export interface Note {
  id: string;
  roomId: string;
  content: string;
  createdAt: string;
}
```

## 관련 기능

- 회의 종료 시 자동 생성
- `/minutes/[id]` 페이지에서 조회
