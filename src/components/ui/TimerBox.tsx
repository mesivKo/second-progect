import { useState, useEffect, useMemo } from "react";
import styled from "@emotion/styled";

const Timer = styled.div<{ danger: boolean; finished: boolean }>`
  padding: 20px 62.5px;
  border-radius: 10px;
  display: flex;
  justify-self: self-end;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  max-width: 321px;
  height: 132px;
  border: 1px solid
    ${(p) => (p.finished ? "#e5e7eb" : p.danger ? "#ffb3b3" : "#cfe0ff")};
  .subtitle {
    font-weight: 400;
    font-size: 16px;
    line-height: 1;
    color: ${(p) =>
      p.finished ? "#475569" : p.danger ? "#e00000" : "#1b5de0"};
  }
  .duration {
    font-weight: 700;
    font-size: 66px;
    line-height: 1;
    color: ${(p) =>
      p.finished ? "#475569" : p.danger ? "#e00000" : "#1b5de0"};
  }
`;

type TimerBoxProps = {
  durationSec: number;
  onFinish?: () => void;
  onTick?: (timeLeft: number) => void;
  finished?: boolean;
};

export function TimerBox(props: TimerBoxProps) {
  const { durationSec, onFinish, onTick, finished = false } = props;
  const [duration, setDuration] = useState(durationSec);

  useEffect(() => {
    if (finished) return;
    const id = setInterval(() => {
      setDuration((c) => {
        if (c <= 1) {
          clearInterval(id);
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [finished]);

  useEffect(() => {
    if (duration === 0 && !finished) {
      onFinish?.();
    }

    // Call onTick when duration changes
    if (!finished && onTick) {
      onTick(duration);
    }
  }, [duration, finished, onFinish, onTick]);

  const formatTime = useMemo(() => {
    const minutes = Math.floor(duration / 60)
      .toString()
      .padStart(2, "0");

    const remainingSeconds = Math.round(duration % 60)
      .toString()
      .padStart(2, "0");

    return `${minutes}:${remainingSeconds}`;
  }, [duration]);

  const danger = duration <= durationSec / 4;
  const userTime = finished ? 'Время решения' : 'Осталось времени';

  return (
    <Timer danger={danger} finished={finished}>
      <h4 className="subtitle">{userTime}</h4>
      <div className="duration">{formatTime}</div>
    </Timer>
  );
}
