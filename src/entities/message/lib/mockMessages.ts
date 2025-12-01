import { Message } from '../model/types';

export const mockMessages: Message[] = [
  {
    id: '1',
    roomId: 'test',
    senderId: 'User 1',
    type: 'text',
    content: '안녕하세요! 회의 시작할까요?',
    createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
  },
  {
    id: '2',
    roomId: 'test',
    senderId: 'User 2',
    type: 'text',
    content: '네, 안녕하세요. 자료 준비되었습니다.',
    createdAt: new Date(Date.now() - 1000 * 60 * 4).toISOString(),
  },
];
