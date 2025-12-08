import type { User } from '../model/types';

interface UserAvatarProps {
  user: User;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function UserAvatar({ user, size = 'md', className = '' }: UserAvatarProps) {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
  };

  // 이니셜 생성 (이름의 첫 글자들)
  const getInitials = (name: string) => {
    if (!name) return '?';

    // 한글인 경우: 성 + 이름 첫 글자 (예: 김해원 → 김해)
    if (/[�가-힣]/.test(name)) {
      return name.slice(0, 2);
    }

    // 영문인 경우: 각 단어의 첫 글자 (예: John Doe → JD)
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return user.avatarUrl ? (
    <img
      src={user.avatarUrl}
      alt={`${user.name} 프로필`}
      className={`${sizeClasses[size]} rounded-full object-cover ${className}`}
    />
  ) : (
    <div
      className={`${sizeClasses[size]} rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold ${className}`}
    >
      {getInitials(user.name)}
    </div>
  );
}
