import Link from 'next/link';
import { LoginForm } from '@/features';

export function LoginPage() {
  return (
    <div className="min-h-[calc(100vh-60px)] flex items-center justify-center bg-secondary/30 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">로그인</h1>
            <p className="text-gray-600">다시 만나서 반가워요!</p>
          </div>

          <LoginForm />

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              아직 계정이 없으신가요?{' '}
              <Link href="/signup" className="text-primary hover:text-primary-hover font-medium">
                회원가입
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
