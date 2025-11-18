import { MeetingDetailPage } from '@/pages';

export default function RoomPage({ params }: { params: { roomId: string } }) {
  return <MeetingDetailPage roomId={params.roomId} />;
}
