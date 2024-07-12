import { getItemQuizz } from "@/api/quizz";
import { getItemQuizzResultByQuizz, postQuizzResult } from "@/api/quizzResult";
import ButtonDefault from "@/lib/components/common/button/buttonDefault";
import { colorCardAnswer } from "@lib/config/colorCardAnswer";
import { initResult } from "@lib/config/initResult";
import { Quizz } from "@lib/modal/quizz";
import { QuizzResult, QuizzResultOption } from "@lib/modal/quizzResult";
import { RootState } from "@lib/state/store";
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
  const [quizz, setQuizz] = useState<Quizz>();
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
    questions: results,
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

  useEffect(() => {
    if (param) {
      const fetch = async () => {
        const res = await getItemQuizz(param);
        setQuizz(res);
      };
      fetch();
    }
  }, [param]);

  return (
    <div className="bg-bts-hero-search-bg bg-no-repeat bg-right bg-cover h-screen pt-10 ">
      <div className="max-w-7xl mx-auto grid grid-cols-2 gap-10">
        <div className=" col-span-1 fade-in-01s mt-12 bg-white w-full h-[700px] mx-auto rounded-xl shadow-4 shadow-purple-600 relative">
          <div className="absolute left-60 top-[-85px]">
            <img
              src={user.urlAvatar}
              width={100}
              height={100}
              className="object-cover w-40 h-40 rounded-full border-2 shadow-4 shadow-purple-600"
              alt="Avatar"
            />
            <p className="text-base text-center mt-3 font-semibold">
              {user.fullName}
            </p>
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
                    <div className="border-r text-center">{r.index + 1}</div>
                    <div className="border-r text-center">
                      {String(r.rightAnswer)}
                    </div>
                    <div className="border-r text-center">{r.point}</div>
                    <div className="text-center">{r.time}</div>
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                <div className="border-2 w-full p-3 text-xl text-start ">
                  <span> {resultUser.totalPoints} p / </span>
                  <span className="font-medium">
                    {quizz?.question.reduce(
                      (accumulator, currentValue) =>
                        accumulator + currentValue.point,
                      0
                    )}{" "}
                    p
                  </span>
                </div>
                <div className="border-2 w-full p-3 text-xl text-start">
                  <p>
                    <span>{resultUser.rightAnswer}</span> /{" "}
                    <span className="font-medium">
                      {quizz?.question.length} right answer
                    </span>{" "}
                  </p>
                </div>
                <div className="border-2 w-full p-3 text-xl text-start">
                  <span>{resultUser.completionTime} s / </span>
                  <span className="font-medium">
                    {quizz?.question.reduce(
                      (accumulator, currentValue) =>
                        accumulator + currentValue.time,
                      0
                    )}{" "}
                    s{" "}
                  </span>
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
        <div className=" col-span-1 fade-in-01s mt-12 bg-white w-full h-[700px] mx-auto rounded-xl shadow-4 shadow-purple-600 relative p-5">
          <div className="w-full p-4 bg-[#8854c0] mb-2 rounded-t-xl">
            <p className="text-white font-semibold text-xl text-center">
              {" "}
              Correct answer
            </p>
          </div>
          <div className="h-[600px] overflow-y-scroll space-y-6">
            {quizz?.question.map((qz, index) => (
              <div className="border grid grid-cols-6" key={index}>
                <div className="col-span-2 px-2 py-3 border-r-2 grid place-items-center">
                  <img
                    src={qz.imgQuestion}
                    width={200}
                    height={180}
                    className="bg-contain object-cover bg-center bg-no-repeat rounded-lg"
                    alt="Thumbnail question"
                  />{" "}
                </div>
                <div className="col-span-4 p-2">
                  <p className="text-base h-[100px] font-medium">{qz.title}</p>
                  <div className="gap-2 grid grid-cols-2 w-full">
                    {qz.anwsers.map((aw, index) => (
                      <div
                        className={`w-full h-full rounded-lg  flex justify-center items-center border ${
                          aw.isCorrect && "text-white"
                        }`}
                        style={{
                          backgroundColor: aw.isCorrect ? "#3ed684" : "#fffff",
                        }}
                        key={index}
                      >
                        <p className=" font-medium text-center">{aw.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
