'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Room } from '@/entities/room';
import { mockRooms } from '@/entities/room';
import { AUTH_CHANGE_EVENT, clearAuthState, isUserAuthenticated } from '@/shared/lib/auth';
import { AuthHeader } from './components/AuthHeader';
import { PublicHeader } from './components/PublicHeader';
import { Hero } from './components/Hero';
import { RecentMeetings } from './components/RecentMeetings';
import { FeatureHighlights } from './components/FeatureHighlights';
import { HowItWorks } from './components/HowItWorks';
import { SiteFooter } from '@/widgets/site-footer';

export function HomePage() {
  const [authState, setAuthState] = useState<'loading' | 'authenticated' | 'guest'>('loading');

  useEffect(() => {
    const syncState = () => {
      setAuthState(isUserAuthenticated() ? 'authenticated' : 'guest');
    };

    const handleStorageChange: EventListener = () => syncState();
    const handleCustomAuthChange: EventListener = () => syncState();

    syncState();

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener(AUTH_CHANGE_EVENT, handleCustomAuthChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener(AUTH_CHANGE_EVENT, handleCustomAuthChange);
    };
  }, []);

  if (authState === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary/30 text-gray-500">
        잠시만 기다려 주세요...
      </div>
    );
  }

  if (authState === 'authenticated') {
    return <AuthenticatedHome onLogout={() => setAuthState('guest')} />;
  }

  return <PublicHome />;
}

function AuthenticatedHome({ onLogout }: { onLogout: () => void }) {
  const router = useRouter();
  const [rooms] = useState<Room[]>(mockRooms);

  const handleRoomClick = (room: Room) => {
    // 진행 중이든 종료되었든 회의방으로 이동 (종료된 회의는 읽기 전용)
    router.push(`/meetings/${room.id}`);
  };

  const handleLogout = () => {
    clearAuthState();
    onLogout();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-gray-900">
      <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        <AuthHeader onLogout={handleLogout} />
        <Hero
          variant="auth"
          onCreateMeeting={() => router.push('/meetings/new')}
          onViewMinutes={() => router.push('/minutes')}
        />
        <RecentMeetings
          rooms={rooms}
          onRoomClick={handleRoomClick}
          onViewAll={() => router.push('/meetings')}
        />
      </div>
    </div>
  );
}

function PublicHome() {
  const router = useRouter();

  const scrollToHowItWorks = () => {
    const section = document.getElementById('how-it-works');
    section?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-white via-secondary/20 to-white text-gray-900">
      <div className="max-w-6xl mx-auto px-6">
        <PublicHeader
          onLogin={() => router.push('/login')}
          onSignup={() => router.push('/signup')}
        />
        <Hero
          variant="public"
          onLogin={() => router.push('/login')}
          onScrollHowItWorks={scrollToHowItWorks}
        />
        <HowItWorks />
        <FeatureHighlights />
      </div>
      <SiteFooter />
    </div>
  );
}
