import { useState, useEffect, useRef } from 'react';

// 초기값: 24시간 (초 단위: 24 * 60 * 60 = 86400)
const INITIAL_TIME = 24 * 60 * 60;
// 기준값: 10분 (초 단위: 10 * 60 = 600)
const THRESHOLD = 10 * 60;

type UseTimerProps = {
  initialSeconds?: number;
  onExpire?: () => void;
};

export function useTimer({ initialSeconds, onExpire }: UseTimerProps = {}) {
  const [timeLeft, setTimeLeft] = useState(initialSeconds ?? INITIAL_TIME);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const tickCountRef = useRef<number>(0);

  // ⏰ 1) 타이머 감소 로직 (한 번만 설정)
  useEffect(() => {
    // interval 설정 - 항상 1초마다 실행
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) return 0;

        const isLongTerm = prev > THRESHOLD;
        tickCountRef.current += 1;

        // 10분 이상일 때는 60틱(60초)마다 60초 감소
        if (isLongTerm) {
          if (tickCountRef.current >= 60) {
            tickCountRef.current = 0;
            return prev - 60;
          }
          return prev; // 아직 업데이트 안 함
        }
        // 10분 이하일 때는 매 틱마다 1초 감소
        return prev - 1;
      });
    }, 1000); // 1초마다 실행

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      tickCountRef.current = 0;
    };
  }, []); // 마운트 시 한 번만 실행

  // ✅ 2) 0이 되는 "순간"에만 onExpire 한 번 호출
  useEffect(() => {
    if (timeLeft === 0) {
      onExpire?.();
    }
  }, [timeLeft, onExpire]);

  // 시간 포맷팅 함수 (HH:MM:SS)
  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;

    // 10분 초과일 때는 '초'는 안 보여줘도 됨
    if (seconds > THRESHOLD) {
      return `${h}시간 ${m}분`;
    }

    // 10분 이하일 때는 초까지
    return `${h > 0 ? h + ':' : ''}${m.toString().padStart(2, '0')}:${s
      .toString()
      .padStart(2, '0')}`;
  };

  return {
    timeLeft,
    formatTime,
  };
}
