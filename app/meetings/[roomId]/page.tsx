import { MeetingDetailPage } from '@/pages/meetings/detail';

export default function RoomPage({ params }: { params: { roomId: string } }) {
  return <MeetingDetailPage roomId={params.roomId} />;
}
