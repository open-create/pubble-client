'use client';

import { Button } from '@/shared/ui';

type HeroProps =
  | {
      variant: 'auth';
      onCreateMeeting: () => void;
      onViewMinutes: () => void;
    }
  | {
      variant: 'public';
      onLogin: () => void;
      onScrollHowItWorks: () => void;
    };

export function Hero(props: HeroProps) {
  if (props.variant === 'auth') {
    return (
      <section className="bg-primary text-white rounded-3xl p-8 md:p-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between shadow-lg">
        <div>
          <p className="uppercase tracking-widest text-white/70 text-sm">오늘의 회의</p>
          <h1 className="text-4xl font-semibold mt-2 mb-4">새 회의를 바로 시작해보세요</h1>
          <p className="text-white/80 text-lg max-w-xl">
            팀원들과 채팅, 음성, 이미지를 동시에 공유하고
            <br />
            버튼 한 번으로 회의록을 받아보세요.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="white"
            onClick={props.onCreateMeeting}
            className="text-lg font-semibold px-8 py-3"
          >
            새 회의 시작하기
          </Button>
          <Button variant="ghost" onClick={props.onViewMinutes}>
            지난 회의록 보기
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
      <div>
        <p className="text-sm font-semibold text-primary uppercase tracking-[0.3em] mb-4">
          AI meeting workspace
        </p>
        <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">
          회의 끝나면, <br />
          <span className="text-primary">회의록은 퍼블</span>이 알아서.
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          텍스트·음성·이미지를 모두 모아서 AI가 회의록으로 정리해줘요.
          <br />
          팀원들은 회의에만 집중하면 됩니다.
        </p>

        <div className="flex flex-wrap gap-4">
          <Button onClick={props.onLogin} className="text-base px-6 py-3">
            로그인하고 새 회의 시작하기
          </Button>
          <Button
            variant="secondary"
            onClick={props.onScrollHowItWorks}
            className="text-base px-6 py-3"
          >
            이용방법 보기
          </Button>
        </div>
      </div>

      {/* 여기는 추후에 디자인 요소 들어가면 좋을 듯 */}
      <div className="bg-white/80 border border-secondary rounded-3xl p-8 shadow-xl">
        <h3 className="text-xl font-semibold mb-4 text-gray-900">회의록 미리보기</h3>
        <ul className="space-y-4 text-sm text-gray-600">
          <li>
            <span className="font-semibold text-gray-900">✔ 요약</span> · 회의 목표와 주요
            의사결정을 자동으로 정리합니다.
          </li>
          <li>
            <span className="font-semibold text-gray-900">✔ 타임스탬프</span> · 발언 시각과 화자를
            자동으로 기록합니다.
          </li>
          <li>
            <span className="font-semibold text-gray-900">✔ 액션 아이템</span> · 담당자와 기한까지
            리스트로 추출합니다.
          </li>
          <li>
            <span className="font-semibold text-gray-900">✔ 첨부 파일</span> · 업로드한
            이미지/파일을 회의록과 함께 제공합니다.
          </li>
        </ul>
      </div>
    </section>
  );
}
