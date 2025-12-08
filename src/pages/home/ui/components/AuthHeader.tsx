'use client';

import Link from 'next/link';
import type { SVGProps } from 'react';
import { mockCurrentUser } from '@/entities/user';
import { UserProfileMenu } from '@/features/user/profile-menu';

interface AuthHeaderProps {
  onLogout: () => void;
}

export function AuthHeader({ onLogout }: AuthHeaderProps) {
  return (
    <header className="flex items-center justify-between">
      <Link href="/" className="text-2xl font-bold text-primary">
        Pubble
      </Link>

      <div className="flex items-center gap-4">
        <button
          type="button"
          className="w-11 h-11 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-600 hover:text-primary hover:border-primary transition-colors"
          aria-label="알림"
        >
          <BellIcon className="w-5 h-5" />
        </button>

        <UserProfileMenu user={mockCurrentUser} onLogout={onLogout} />
      </div>
    </header>
  );
}

function BellIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M15 17H9a4 4 0 0 1-4-4V9a7 7 0 0 1 14 0v4a4 4 0 0 1-4 4z" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}
