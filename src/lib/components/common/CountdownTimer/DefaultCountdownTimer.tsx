import React, { useEffect, useState } from "react";

interface PropsTimer {
  maxTime: number;
  index?: number;
  stop: boolean;
  onTick: (timeLeft: number) => void; // Thêm prop onTick
}

const CountdownTimer: React.FC<PropsTimer> = ({
  maxTime,
  index,
  stop,
  onTick,
}) => {
  const [timeLeft, setTimeLeft] = useState(maxTime);

  useEffect(() => {
    setTimeLeft(maxTime);
  }, [maxTime, index]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTimeLeft: number) => {
        if (stop) {
          clearInterval(timer);
          return 0;
        }
        if (prevTimeLeft > 0) {
          return prevTimeLeft - 1;
        } else {
          clearInterval(timer);
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [maxTime, stop]);

  useEffect(() => {
    onTick(timeLeft); // Gọi hàm onTick mỗi khi timeLeft thay đổi
  }, [timeLeft, onTick]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return <>{formatTime(timeLeft)}</>;
};

export default CountdownTimer;
