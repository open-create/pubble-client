'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input } from '@/shared/ui';
import { validateRoomPassword } from '@/shared/lib';

interface FormErrors {
  title?: string;
  purpose?: string;
  password?: string;
}

export function CreateMeetingForm() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [purpose, setPurpose] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const previewExpiration = useMemo(() => {
    const now = new Date();
    now.setHours(now.getHours() + 24);
    return now.toLocaleString();
  }, []);

  const validate = () => {
    const newErrors: FormErrors = {};

    if (!title.trim()) {
      newErrors.title = '회의 제목을 입력하세요.';
    } else if (title.trim().length > 30) {
      newErrors.title = '회의 제목은 30자 이하여야 합니다.';
    }

    if (purpose.trim().length > 100) {
      newErrors.purpose = '회의 목적은 100자 이하여야 합니다.';
    }

    // 방 비밀번호는 선택사항이지만, 입력했다면 검증
    if (password) {
      const passwordValidation = validateRoomPassword(password);
      if (!passwordValidation.isValid) {
        newErrors.password = passwordValidation.error;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);

    // 실시간 에러 표시
    if (value && errors.password) {
      const validation = validateRoomPassword(value);
      if (validation.isValid) {
        setErrors({ ...errors, password: undefined });
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    // TODO: 실제 API 호출
    await new Promise((resolve) => setTimeout(resolve, 500));

    const roomId = Math.random().toString(36).substring(2, 8).toUpperCase();

    // 회의방 생성 성공 → 바로 회의방으로 라우팅 (초대 모달 자동 표시)
    router.push(`/meetings/${roomId}?showInvite=true&title=${encodeURIComponent(title)}`);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-lg p-8 space-y-8">
      <section className="space-y-4">
        <Input
          label="회의 제목"
          placeholder="예: 제품 기획 킥오프"
          maxLength={30}
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          error={errors.title}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">회의 목적 (선택)</label>
          <textarea
            value={purpose}
            onChange={(event) => setPurpose(event.target.value)}
            maxLength={100}
            rows={4}
            placeholder="회의 목적을 간단히 적어주세요. (최대 100자)"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.purpose ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.purpose && <p className="mt-1 text-sm text-red-500">{errors.purpose}</p>}
        </div>
      </section>

      <div className="bg-secondary/20 border border-secondary rounded-2xl p-5">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">회의 기본 설정</h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-start gap-2">
            <span className="text-gray-500">⏱️</span>
            <div>
              <p className="font-medium text-gray-900">만료 시간: 24시간 후 자동 만료</p>
              <p className="text-xs text-gray-500">예상 만료: {previewExpiration}</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-gray-500">🗂️</span>
            <div>
              <p className="font-medium text-gray-900">보관 정책: 원본 24시간 보관 후 삭제</p>
              <p className="text-xs text-gray-500">회의 종료 후 24시간 동안만 원본 보관</p>
            </div>
          </div>
        </div>
      </div>

      <section className="space-y-4">
        <Input
          label="방 비밀번호 (선택)"
          type="text"
          inputMode="numeric"
          placeholder="4~8자 숫자"
          value={password}
          onChange={handlePasswordChange}
          error={errors.password}
          maxLength={8}
        />
        <p className="text-xs text-gray-500">
          비밀번호를 설정하면 초대 링크를 알아도 입장 시 비밀번호가 필요합니다.
        </p>
      </section>

      <div className="flex justify-end gap-4 flex-wrap">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="px-10 py-3 text-base font-semibold"
        >
          {isSubmitting ? '회의 생성 중...' : '회의 생성'}
        </Button>
      </div>
    </form>
  );
}
