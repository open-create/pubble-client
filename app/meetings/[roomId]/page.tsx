import { MeetingDetailPage } from '@/pages/meetings/detail';

export default async function RoomPage({ params }: { params: Promise<{ roomId: string }> }) {
  const { roomId } = await params;
  return <MeetingDetailPage roomId={roomId} />;
}
