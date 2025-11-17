'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import type { SVGProps } from 'react';

interface HomeAuthHeaderProps {
  onLogout: () => void;
}

export function HomeAuthHeader({ onLogout }: HomeAuthHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

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

        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="flex items-center gap-3 bg-white border border-gray-200 rounded-full pl-4 pr-2 py-1.5 shadow-sm"
          >
            <div className="text-right">
              <p className="text-sm text-gray-500 leading-tight">Product Owner</p>
              <p className="font-semibold text-gray-900 leading-tight">김해원</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold">
              HW
            </div>
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-3 w-60 bg-white border border-gray-100 rounded-2xl shadow-xl p-4">
              <p className="text-sm text-gray-500">demo@pubble.com</p>
              <div className="mt-4 space-y-2">
                <button
                  type="button"
                  onClick={() => {
                    onLogout();
                    setMenuOpen(false);
                  }}
                  className="w-full text-left text-sm font-medium text-red-500 hover:text-red-600"
                >
                  로그아웃
                </button>
              </div>
            </div>
          )}
        </div>
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
