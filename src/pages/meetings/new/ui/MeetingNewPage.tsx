import { CreateMeetingForm } from '@/features/meeting/create-room';

export function MeetingNewPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.3em] text-primary font-semibold mb-2">
            새 회의
          </p>
          <h1 className="text-4xl font-bold text-gray-900">회의방 만들기</h1>
          <p className="text-gray-600 mt-2">
            회의 목적과 보관 정책을 설정하면 초대 링크를 바로 받을 수 있어요.
          </p>
        </div>

        <CreateMeetingForm />
      </div>
    </div>
  );
}
