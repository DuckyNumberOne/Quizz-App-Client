import { getItemQuizzResultByQuizz } from "@/api/quizzResult";
import { initResult } from "@/lib/config/initResult";
import { QuizzResult, QuizzResultOption } from "@/lib/modal/quizzResult";
import { RootState } from "@/lib/state/store";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
const Rank = () => {
  const result = useSelector((state: RootState) => state.result);
  console.log("🚀 ~ Rank ~ result:", result);
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const audio = new Audio("/music/congratulations.mp3");
    audio.volume = 0.5;
    audio.play();
    return () => {
      audio.pause();
    };
  }, []);

  return (
    <div className="bg-bts-hero-search-bg bg-no-repeat bg-right bg-cover h-screen pt-10">
      <div className="fade-in-01s mt-12 bg-white w-[600px] h-[700px] mx-auto rounded-xl shadow-4 shadow-purple-600 relative">
        <div className="absolute left-55 top-[-70px]">
          <img
            src={user.urlAvatar}
            width={100}
            height={100}
            className="object-cover w-40 h-40 rounded-full border-2 shadow-4 shadow-purple-600"
            alt="Avatar"
          />
        </div>
        <div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Rank;
