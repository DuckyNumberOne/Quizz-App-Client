import { getItemQuizzResultByQuizz, postQuizzResult } from "@/api/quizzResult";
import ButtonDefault from "@/lib/components/common/Button/ButtonDefault";
import { initResult } from "@/lib/config/initResult";
import { QuizzResult, QuizzResultOption } from "@/lib/modal/quizzResult";
import { RootState } from "@/lib/state/store";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
interface ResultState {
  point: number;
  time: number;
  index: number;
  rightAnswer: boolean;
}

const Result = () => {
  const results = useSelector((state: RootState) => state.result);
  const user = useSelector((state: RootState) => state.user);
  const { query, push } = useRouter();
  const param = query.id;
  const calculateResult = (results: ResultState[]) => {
    let rightAnswer = 0;
    let completionTime = 0;
    let totalPoints = 0;
    results.forEach((result) => {
      completionTime += result.time;
      if (result.rightAnswer) {
        rightAnswer++;
      }
      totalPoints += result.point;
    });
    return {
      rightAnswer: rightAnswer,
      completionTime: completionTime,
      totalPoints: totalPoints,
    };
  };

  const resultUser = calculateResult(results);
  const dataResult = {
    ...resultUser,
    idUser: String(user._id),
    idQuizz: String(param),
  };
  const handleSubmit = async () => {
    try {
      const res = await postQuizzResult(dataResult);
      if (res) {
        push(`/admin/rank/${param}`);
      }
    } catch (error: any) {
      alert(error.response.data);
    }
  };

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
        <div className="p-5">
          <div className="mt-26">
            <div className="grid grid-cols-4 border pr-1.5">
              <div className="border-r text-center font-medium">Question</div>
              <div className="border-r text-center font-medium">
                Right answer
              </div>
              <div className="border-r text-center font-medium">Point</div>
              <div className=" text-center font-medium">Time (s)</div>
            </div>
            <div className="border h-[200px] overflow-y-scroll mb-5">
              {results.map((r, index) => (
                <div
                  key={index}
                  className="grid grid-cols-4 border-b border-x h-10"
                >
                  <div className="border-r text-center">{r.index}</div>
                  <div className="border-r text-center">
                    {String(r.rightAnswer)}
                  </div>
                  <div className="border-r text-center">{r.point}</div>
                  <div className="text-center">{r.time}</div>
                </div>
              ))}
            </div>
            <div className="space-y-4">
              <div className="border-2 w-full p-3 text-xl text-start">
                {resultUser.totalPoints} p
              </div>
              <div className="border-2 w-full p-3 text-xl text-start">
                {resultUser.rightAnswer} right answer
              </div>
              <div className="border-2 w-full p-3 text-xl text-start">
                {resultUser.completionTime} s
              </div>
            </div>
            <ButtonDefault
              content="Check ranking"
              className="mt-8 font-bold text-white bg-black rounded-full py-3 px-8 text-lg  hover:text-black hover:bg-white hover:shadow-sm hover:shadow-black ease-in-out duration-300 w-full"
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
