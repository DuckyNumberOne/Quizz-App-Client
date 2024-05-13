import React, { useEffect } from "react";
const Result = () => {
  useEffect(() => {
    const audio = new Audio("/music/congratulations.mp3");
    audio.play();
    return () => {
      audio.pause();
    };
  }, []);
  return <div></div>;
};

export default Result;
