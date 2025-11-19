import type { User } from '../model/types';
import { UserAvatar } from './UserAvatar';

interface UserProfileButtonProps {
  user: User;
  onClick?: () => void;
}

export function UserProfileButton({ user, onClick }: UserProfileButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-3 bg-white border border-gray-200 rounded-full pl-4 pr-2 py-1.5 shadow-sm hover:border-primary transition-colors"
    >
      <div className="text-right">
        {user.role && <p className="text-sm text-gray-500 leading-tight">{user.role}</p>}
        <p className="font-semibold text-gray-900 leading-tight">{user.name}</p>
      </div>
      <UserAvatar user={user} size="md" />
    </button>
  );
}
