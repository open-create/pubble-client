'use client';

import { usePathname } from 'next/navigation';
import { AppHeader } from './AppHeader';

export function LayoutHeader() {
  const pathname = usePathname();

  // pathname이 null인 경우 헤더를 표시하지 않음
  if (!pathname) {
    return null;
  }

  // 헤더를 숨길 페이지들
  const hideHeaderPaths = [
    '/', // 홈페이지는 자체 헤더 사용
  ];

  if (hideHeaderPaths.includes(pathname)) {
    return null;
  }

  return <AppHeader showBackButton={true} showHomeButton={true} />;
}
