'use client';

import { useEffect, useRef, useState } from 'react';
import type { User } from '@/entities/user';
import { UserProfileButton } from '@/entities/user';

interface UserProfileMenuProps {
  user: User;
  onLogout: () => void;
}

export function UserProfileMenu({ user, onLogout }: UserProfileMenuProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // 메뉴 외부 클릭 시 닫기
  useEffect(() => {
    if (!menuOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  const handleLogout = () => {
    onLogout();
    setMenuOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      <UserProfileButton user={user} onClick={() => setMenuOpen((prev) => !prev)} />

      {menuOpen && (
        <div className="absolute right-0 mt-3 w-60 bg-white border border-gray-100 rounded-2xl shadow-xl p-4 z-50">
          <p className="text-sm text-gray-500">{user.email}</p>
          <div className="mt-4 space-y-2">
            <button
              type="button"
              onClick={handleLogout}
              className="w-full text-left text-sm font-medium text-red-500 hover:text-red-600 transition-colors"
            >
              로그아웃
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
