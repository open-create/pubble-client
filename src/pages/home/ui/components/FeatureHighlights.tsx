const featureCards = [
  {
    title: '채팅·음성·이미지 한 번에 정리',
    description: '각기 흩어진 메시지와 파일을 자동으로 연결해 회의 흐름을 파악하기 쉬워요.',
  },
  {
    title: '한 번 생성된 회의록은 언제든 재확인',
    description: '완성된 회의록과 파일을 언제든 다시 열람하고 공유할 수 있어요.',
  },
  {
    title: '진행 중/종료된 회의 한눈에 관리',
    description: '회의 상태와 회의록 여부를 한 리스트에서 확인하세요.',
  },
  {
    title: '안심되는 협업 보안',
    description: '모든 데이터는 암호화되어 저장되고 필요한 사람에게만 공유됩니다.',
  },
];

export function FeatureHighlights() {
  return (
    <section className="py-16">
      <div className="mb-10">
        <p className="text-sm uppercase tracking-[0.3em] text-primary font-semibold mb-3">
          Features
        </p>
        <h2 className="text-3xl font-bold">퍼블이 사랑받는 이유</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {featureCards.map((feature) => (
          <div
            key={feature.title}
            className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm"
          >
            <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
