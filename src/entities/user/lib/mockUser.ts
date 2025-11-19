import type { User } from '../model/types';

// 현재 로그인한 사용자 Mock 데이터
export const mockCurrentUser: User = {
  id: 'user-1',
  name: '김해원',
  email: 'demo@pubble.com',
  role: 'Product Owner',
  avatarUrl: undefined, // 이미지 없으면 이니셜 표시
};
