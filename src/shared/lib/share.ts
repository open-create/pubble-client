/**
 * 클립보드에 텍스트 복사
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
}

/**
 * 카카오톡으로 공유
 */
export function shareToKakao(url: string, title: string): void {
  if (typeof window === 'undefined') return;

  // 카카오톡 SDK가 로드되어 있는 경우
  if (window.Kakao && window.Kakao.Link) {
    window.Kakao.Link.sendDefault({
      objectType: 'feed',
      content: {
        title: title,
        description: '초대 링크를 통해 회의에 참여하세요.',
        imageUrl: '',
        link: {
          mobileWebUrl: url,
          webUrl: url,
        },
      },
    });
  } else {
    // SDK가 없으면 URL로 대체
    window.open(`https://sharer.kakao.com/talk/friends?url=${encodeURIComponent(url)}`, '_blank');
  }
}

/**
 * 문자로 공유 (SMS)
 */
export function shareToSMS(url: string, title: string): void {
  const message = `${title}\n초대 링크: ${url}`;
  window.location.href = `sms:?body=${encodeURIComponent(message)}`;
}

/**
 * 이메일로 공유
 */
export function shareToEmail(url: string, title: string): void {
  const subject = encodeURIComponent(title);
  const body = encodeURIComponent(`초대 링크: ${url}\n\n링크를 통해 회의에 참여하세요.`);
  window.location.href = `mailto:?subject=${subject}&body=${body}`;
}

// TypeScript global 타입 확장
declare global {
  interface Window {
    Kakao?: {
      Link?: {
        sendDefault: (options: unknown) => void;
      };
    };
  }
}

