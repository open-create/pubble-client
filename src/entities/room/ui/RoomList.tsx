import type { Room } from '../model/types';
import { RoomCard } from './RoomCard';

interface RoomListProps {
  rooms: Room[];
  onRoomClick?: (room: Room) => void;
  onShare?: (room: Room) => void;
  onViewMinutes?: (roomId: string) => void;
  emptyMessage?: string;
}

export function RoomList({
  rooms,
  onRoomClick,
  onShare,
  onViewMinutes,
  emptyMessage = '아직 진행된 회의가 없습니다.',
}: RoomListProps) {
  if (rooms.length === 0) {
    return <div className="text-center py-12 text-gray-500">{emptyMessage}</div>;
  }

  return (
    <div className="space-y-3">
      {rooms.map((room) => (
        <RoomCard
          key={room.id}
          room={room}
          onClick={onRoomClick ? () => onRoomClick(room) : undefined}
          onShare={
            onShare
              ? (e: React.MouseEvent) => {
                  e.stopPropagation();
                  onShare(room);
                }
              : undefined
          }
          onViewMinutes={
            onViewMinutes
              ? (e: React.MouseEvent) => {
                  e.stopPropagation();
                  onViewMinutes(room.id);
                }
              : undefined
          }
        />
      ))}
    </div>
  );
}
