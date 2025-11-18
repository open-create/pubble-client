'use client';

import { useRouter } from 'next/navigation';
// import { Button } from '@/shared';

interface AppHeaderProps {
  title?: string;
  showBackButton?: boolean;
  showHomeButton?: boolean;
  rightActions?: React.ReactNode;
}

export function AppHeader({
  title,
  showBackButton = true,
  showHomeButton = true,
  rightActions,
}: AppHeaderProps) {
  const router = useRouter();

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        {/* 좌측: 뒤로가기 + 로고/제목 */}
        <div className="flex items-center gap-3">
          {showBackButton && (
            <button
              type="button"
              onClick={() => router.back()}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="뒤로가기"
            >
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          )}

          {showHomeButton && (
            <button
              type="button"
              onClick={() => router.push('/')}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <span className="text-xl font-bold text-gray-900 hidden sm:inline">Pubble</span>
            </button>
          )}

          {title && (
            <h1 className="text-lg font-semibold text-gray-900 hidden sm:inline">{title}</h1>
          )}
        </div>

        {/* 우측: 커스텀 액션 버튼들 */}
        {rightActions && <div className="flex items-center gap-2">{rightActions}</div>}
      </div>
    </header>
  );
}
