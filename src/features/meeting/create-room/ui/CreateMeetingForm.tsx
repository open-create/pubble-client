'use client';

import { useMemo, useState } from 'react';
import { Button, Input } from '@/shared/ui';
import { InviteModal } from '@/features/meeting/invite-modal';

// type RetentionPolicy = 'A';

interface FormErrors {
  title?: string;
  purpose?: string;
}

export function CreateMeetingForm() {
  const [title, setTitle] = useState('');
  const [purpose, setPurpose] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [inviteLink, setInviteLink] = useState<string | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [showInviteModal, setShowInviteModal] = useState(false);

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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    setInviteLink(null);

    await new Promise((resolve) => setTimeout(resolve, 500));

    const inviteCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    setInviteLink(`https://pubble.com/meet/${inviteCode}`);
    setIsSubmitting(false);
  };

  return (
    <>
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

      {inviteLink && (
        <>
          <div className="mt-8 bg-primary/5 border border-primary/20 rounded-3xl p-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm text-primary font-semibold uppercase tracking-widest">
                초대 링크 생성 완료
              </p>
              <p className="text-xl font-semibold text-gray-900 mt-1">{inviteLink}</p>
              <p className="text-sm text-gray-600">
                초대 설정 버튼을 눌러 공유하거나 인원/비밀번호를 설정하세요.
              </p>
            </div>
            <Button
              type="button"
              onClick={() => setShowInviteModal(true)}
              className="w-full md:w-auto"
            >
              초대 설정 열기
            </Button>
          </div>

          <InviteModal
            isOpen={showInviteModal}
            onClose={() => setShowInviteModal(false)}
            inviteLink={inviteLink}
            meetingTitle={title || '새 회의'}
          />
        </>
      )}
    </>
  );
}
