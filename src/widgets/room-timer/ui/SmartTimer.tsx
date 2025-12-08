'use client';

import { useTimer } from '../model/useTimer';

type SmartTimerProps = {
  // 필요하면 커스텀 초기값 받기 (없으면 24시간)
  initialSeconds?: number;
  // 타이머가 0이 되는 순간 호출
  onExpire?: () => void;
  // 인라인 모드 (작은 텍스트, 아이콘 포함)
  inline?: boolean;
};

export default function SmartTimer({ initialSeconds, onExpire, inline = false }: SmartTimerProps) {
  const { timeLeft, formatTime } = useTimer({ initialSeconds, onExpire });

  // 인라인 모드 (작은 텍스트, 아이콘 포함)
  if (inline) {
    return (
      <span className="flex items-center gap-1">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span className="font-mono text-gray-600">{formatTime(Math.max(timeLeft, 0))}</span>
      </span>
    );
  }

  // 기본 모드 (큰 화면 중앙 표시)
  return (
    <div className="flex justify-center items-center p-10">
      <div className="font-mono font-bold text-black text-4xl">
        {formatTime(Math.max(timeLeft, 0))}
      </div>
    </div>
  );
}

