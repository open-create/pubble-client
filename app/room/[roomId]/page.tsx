import { MeetingPage } from '@/pages/meeting';

export default function RoomPage({ params }: { params: { roomId: string } }) {
  return <MeetingPage roomId={params.roomId} />;
}
