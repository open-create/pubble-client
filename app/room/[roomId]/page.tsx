import { MeetingPage } from '@/pages/meeting/MeetingPage';

export default function RoomPage({ params }: { params: { roomId: string } }) {
  return <MeetingPage roomId={params.roomId} />;
}
