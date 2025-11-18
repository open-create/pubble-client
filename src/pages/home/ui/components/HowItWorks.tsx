const steps = [
  {
    title: '회의방 만들기',
    description: '링크를 공유해서 팀원을 바로 초대하세요.',
    icon: '1',
  },
  {
    title: '채팅·음성·이미지 업로드',
    description: '모든 대화 기록을 한 곳으로 모읍니다.',
    icon: '2',
  },
  {
    title: "'회의록 생성' 클릭",
    description: 'AI가 핵심만 정리된 회의록을 완성해줘요.',
    icon: '3',
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16">
      <div className="mb-10">
        <p className="text-sm uppercase tracking-[0.3em] text-primary font-semibold mb-3">
          How it works
        </p>
        <h2 className="text-3xl font-bold">"어떻게 쓰는지" 3단계</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {steps.map((step) => (
          <div
            key={step.title}
            className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm"
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-lg mb-4">
              {step.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
            <p className="text-gray-600 text-sm">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
