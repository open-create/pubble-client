'use client';

import Link from 'next/link';
import { Button } from '@/shared/ui';

interface PublicHeaderProps {
  onLogin: () => void;
  onSignup: () => void;
}

export function PublicHeader({ onLogin, onSignup }: PublicHeaderProps) {
  return (
    <header className="flex items-center justify-between py-6">
      <Link href="/" className="text-2xl font-bold text-primary">
        Pubble
      </Link>
      <div className="flex items-center gap-3">
        <Button
          variant="secondary"
          onClick={onLogin}
          className="border-none bg-transparent text-gray-800 hover:text-primary"
        >
          로그인
        </Button>
        <Button onClick={onSignup}>회원가입</Button>
      </div>
    </header>
  );
}
