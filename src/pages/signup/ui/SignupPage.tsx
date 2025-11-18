import Link from 'next/link';
import { SignupForm } from '@/features/auth/signup';

export function SignupPage() {
  return (
    <div className="min-h-[calc(100vh-60px)] flex items-center justify-center bg-secondary/30 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* 헤더 */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">회원가입</h1>
            <p className="text-gray-600">퍼블에 오신 것을 환영합니다!</p>
          </div>

          {/* 회원가입 폼 */}
          <SignupForm />

          {/* 로그인 링크 */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              이미 계정이 있으신가요?{' '}
              <Link href="/login" className="text-primary hover:text-primary-hover font-medium">
                로그인
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
