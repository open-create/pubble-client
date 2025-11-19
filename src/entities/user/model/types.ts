export interface User {
  id: string; // 사용자 고유 식별자
  name: string; // 사용자 이름 (닉네임)
  email: string; // 이메일
  role?: string; // 직책 (선택사항)
  avatarUrl?: string; // 프로필 이미지 URL (선택사항)
}
