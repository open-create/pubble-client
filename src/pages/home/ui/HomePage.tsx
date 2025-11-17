'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Meeting, mockMeetings } from '@/entities/meeting';
import { AUTH_CHANGE_EVENT, clearAuthState, isUserAuthenticated } from '@/shared/lib';
import {
  HomeAuthHeader,
  HomeFeatureHighlights,
  HomeHero,
  HomeHowItWorks,
  HomePublicHeader,
  HomeRecentMeetings,
} from '@/widgets/home';
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
  const [meetings] = useState<Meeting[]>(mockMeetings);

  const handleMeetingClick = (meeting: Meeting) => {
    const target =
      meeting.status === 'ongoing' ? `/meetings/${meeting.id}` : `/minutes/${meeting.id}`;
    router.push(target);
  };

  const handleLogout = () => {
    clearAuthState();
    onLogout();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-gray-900">
      <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        <HomeAuthHeader onLogout={handleLogout} />
        <HomeHero
          variant="auth"
          onCreateMeeting={() => router.push('/meetings/new')}
          onViewMinutes={() => router.push('/minutes')}
        />
        <HomeRecentMeetings
          meetings={meetings}
          onMeetingClick={handleMeetingClick}
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
        <HomePublicHeader
          onLogin={() => router.push('/login')}
          onSignup={() => router.push('/signup')}
        />
        <HomeHero
          variant="public"
          onLogin={() => router.push('/login')}
          onScrollHowItWorks={scrollToHowItWorks}
        />
        <HomeHowItWorks />
        <HomeFeatureHighlights />
      </div>
      <SiteFooter />
    </div>
  );
}
