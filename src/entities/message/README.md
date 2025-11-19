# Message Entity

회의 중 주고받는 메시지 (텍스트, 이미지, 음성)

## 비즈니스 규칙

1. `type === "text"`: `content`에 텍스트 메시지 내용
2. `type === "image"`: `content`에 이미지 URL
3. `type === "audio"`: `content`에 오디오 파일 URL
4. 회의록 생성 시 모든 메시지가 AI에 의해 분석됨

## 타입 정의

```tsx
export type MessageType = 'text' | 'image' | 'audio';

export interface Message {
  id: string;
  roomId: string;
  senderId: string;
  type: MessageType;
  content: string;
  createdAt: string;
}
```

## 관련 기능

- 채팅 메시지 송수신
- 이미지/오디오 업로드
- 회의록 생성 시 메시지 분석
