interface MeetingPageProps {
  roomId: string;
}

export function MeetingPage({ roomId }: MeetingPageProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Meeting Room</h1>
        <p className="text-gray-600">Room ID: {roomId}</p>
      </div>
    </div>
  );
}
