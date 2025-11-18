'use client';

import { useState } from 'react';
import { Modal, Input, Button } from '@/shared/ui';
import {
  validateRoomPassword,
  copyToClipboard,
  shareToKakao,
  shareToSMS,
  shareToEmail,
} from '@/shared/lib';

interface InviteModalProps {
  isOpen: boolean;
  onClose: () => void;
  inviteLink: string;
  meetingTitle: string;
}

export function InviteModal({ isOpen, onClose, inviteLink, meetingTitle }: InviteModalProps) {
  const [maxParticipants, setMaxParticipants] = useState(8);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(inviteLink);
    if (success) {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);

    if (value) {
      const result = validateRoomPassword(value);
      setPasswordError(result.error || '');
    } else {
      setPasswordError('');
    }
  };

  const handleMaxParticipantsChange = (value: number) => {
    if (value >= 2 && value <= 20) {
      setMaxParticipants(value);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="초대 링크" size="md">
      <div className="space-y-6">
        {/* 초대 링크 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">초대 링크</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={inviteLink}
              readOnly
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 text-sm"
            />
            <Button onClick={handleCopy} className="whitespace-nowrap">
              {copySuccess ? '복사됨 ✓' : '복사'}
            </Button>
          </div>
          <p className="mt-1 text-xs text-gray-500">이 링크를 공유하여 팀원을 초대하세요.</p>
        </div>

        {/* 공유 버튼 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">빠른 공유</label>
          <div className="grid grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => shareToKakao(inviteLink, meetingTitle)}
              className="flex flex-col items-center gap-2 p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center text-lg">
                💬
              </div>
              <span className="text-xs font-medium text-gray-700">카카오톡</span>
            </button>

            <button
              type="button"
              onClick={() => shareToSMS(inviteLink, meetingTitle)}
              className="flex flex-col items-center gap-2 p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-green-400 flex items-center justify-center text-lg">
                💬
              </div>
              <span className="text-xs font-medium text-gray-700">문자</span>
            </button>

            <button
              type="button"
              onClick={() => shareToEmail(inviteLink, meetingTitle)}
              className="flex flex-col items-center gap-2 p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center text-lg">
                📧
              </div>
              <span className="text-xs font-medium text-gray-700">이메일</span>
            </button>
          </div>
        </div>

        {/* 최대 인원 설정 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            최대 인원 <span className="text-gray-500 font-normal">(2~20명)</span>
          </label>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => handleMaxParticipantsChange(maxParticipants - 1)}
              disabled={maxParticipants <= 2}
              className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              −
            </button>
            <div className="flex-1 text-center">
              <span className="text-2xl font-bold text-gray-900">{maxParticipants}</span>
              <span className="text-sm text-gray-500 ml-1">명</span>
            </div>
            <button
              type="button"
              onClick={() => handleMaxParticipantsChange(maxParticipants + 1)}
              disabled={maxParticipants >= 20}
              className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              +
            </button>
          </div>
        </div>

        {/* 방 비밀번호 설정 */}
        <div>
          <Input
            label="방 비밀번호 (선택)"
            type="text"
            inputMode="numeric"
            placeholder="4~8자 숫자"
            value={password}
            onChange={handlePasswordChange}
            error={passwordError}
            maxLength={8}
          />
          <p className="mt-1 text-xs text-gray-500">
            비밀번호를 설정하면 링크를 알아도 입장 시 비밀번호가 필요합니다.
          </p>
        </div>

        {/* 확인 버튼 */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
          <Button variant="secondary" onClick={onClose}>
            닫기
          </Button>
          <Button
            onClick={() => {
              // TODO: 설정 저장 로직 (API 호출)
              console.log('Settings:', { maxParticipants, password });
              onClose();
            }}
          >
            설정 완료
          </Button>
        </div>
      </div>
    </Modal>
  );
}
