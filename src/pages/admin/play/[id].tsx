import { useParams, usePathname } from "next/navigation";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Image from "next/image";
import DefaultCardAnsswer from "@components/admin/CardAnswer/DefaultCardAnswer";
import { getItemQuizz, getQuestionById } from "@/api/quizz";
import { Question } from "@/lib/modal/question";
import { questionInit } from "@/lib/config/initQuestion";
import CountdownTimer from "@/lib/components/common/CountdownTimer/DefaultCountdownTimer";

const Play = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const [start, setStart] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [question, setQuestion] = useState<Question[]>(questionInit);
  const [indexs, setIndexs] = useState(0);
  const timeQuestionIndex = question[indexs].time;
  console.log("🚀 ~ Play ~ timeQuestionIndex:", timeQuestionIndex);
  const timeQuestion = timeQuestionIndex * 1000;
  const handleStart = () => {
    setStart(true);
  };

  const handleChoice = () => {};

  const handleTick = (updatedSeconds: number) => {
    console.log("🚀 ~ handleTick ~ updatedSeconds:", updatedSeconds);
  };

  const colorCardAnser = [
    { id: 1, colorBackground: "#e35454", colorBoder: "#bf2d49" },
    { id: 2, colorBackground: "#30b0c7", colorBoder: "#0093ad" },
    { id: 3, colorBackground: "#ff9500", colorBoder: "#c27810" },
    { id: 4, colorBackground: "#3ed684", colorBoder: "#81ab8b" },
  ];

  const indexQuestionPercent = Number(
    (indexs + 1) * (1 / question?.length) * 100
  );

  useEffect(() => {
    if (pathname && start) {
      const checkPathPlay = pathname.split("/");
      const params = checkPathPlay[checkPathPlay.length - 1];
      const fetch = async () => {
        const res = await getQuestionById(params);
        if (res) {
          setIndexs(0);
          setQuestion(res);
        }
      };
      fetch();
    }
  }, [start]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (countdown > 0) {
        setCountdown(countdown - 1);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (indexs !== -1 && indexs < question.length - 1) {
        setIndexs((prevIndex) => prevIndex + 1);
      }
    }, timeQuestion);
    return () => clearTimeout(timer);
  }, [start, indexs, question]);

  return (
    <div className="">
      {start ? (
        <div className="bg-bts-hero-search-bg bg-no-repeat bg-right bg-cover">
          <div className="pb-10 grid grid-cols-3 gap-4 container mx-auto">
            {/* Box 1 */}
            <div></div>
            {/* Box 2  */}
            <div className="slide-up mt-2 max-w-2xl mx-auto rounded-lg border h-full px-5 pt-5 bg-white shadow-2 shadow-purple-500">
              <div>
                {/* Navbar  */}
                <div className="flex justify-between items-center">
                  <p className="text-xl font-normal">
                    <span>{indexs + 1}</span>/
                    <span className="font-bold">{question.length}</span>
                  </p>
                  <div className="bg-white border-2 w-2/4 h-4 rounded-xl">
                    <div
                      style={{ width: `${indexQuestionPercent}% ` }}
                      className={`bg-yellow-300 h-full rounded-xl slide-left`}
                    ></div>
                  </div>
                  <button className="shadow-2 border-2 border-black rounded-full p-1">
                    <Image
                      src="/images/menu.png"
                      width={26}
                      height={26}
                      alt="Logo"
                      className="border-2"
                    />
                  </button>
                </div>
                {/* Body */}
                <div className="object-contain">
                  <img
                    src={
                      question
                        ? question[indexs].imgQuestion
                        : "/images/image-loading.webp"
                    }
                    alt="Logo"
                    className="mt-10 rounded-xl border w-full mx-auto h-[340px]"
                  />
                </div>
                <p className="font-medium mt-5 text-xl h-[70px]">
                  {question[indexs].title}
                </p>
                <div className="w-full border-r-[5px] border-white mb-3 grid grid-cols-2 grid-rows-2 gap-4">
                  {question[indexs].anwsers.map((items, index) => (
                    <div key={items._id}>
                      <div
                        className={`hover:shadow-2 hover:shadow-green-400 hover:scale-105 ease-in-out duration-300 cursor-pointer border-r-4 border-b-4 py-3 px-6 rounded-2xl w-full h-[170px] flex justify-center items-center relative`}
                        style={{
                          backgroundColor:
                            colorCardAnser[index].colorBackground,
                          borderColor: colorCardAnser[index].colorBoder,
                        }}
                        onClick={handleChoice}
                      >
                        <p className="text-white font-medium text-lg">
                          {items.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Box 3 */}
            <div>
              <div className="slide-up mt-2 max-w-2xl mx-auto rounded-lg border bg-white shadow-2 shadow-purple-500 w-full grid grid-cols-2">
                <div className="flex w-full h-full border-r p-2">
                  <Image
                    src="/images/point.webp"
                    width={40}
                    height={40}
                    alt="Logo"
                    className="bg-contain bg-center object-cover"
                  />
                  <p className="p-2 font-medium text-lg">
                    Point:{" "}
                    <span className="text-green-500">
                      {question[indexs].point}
                    </span>
                  </p>
                </div>
                <div className="flex w-full h-full p-2">
                  <Image
                    src="/images/time-clock.webp"
                    width={40}
                    height={40}
                    alt="Logo"
                    className="bg-contain bg-center object-cover"
                  />
                  <p className="p-2 font-medium text-lg">
                    Time:{" "}
                    <span className="text-rose-600">
                      {timeQuestionIndex > 0 ? (
                        <>
                          <CountdownTimer
                            maxTime={timeQuestionIndex}
                            index={indexs}
                          />{" "}
                          s
                        </>
                      ) : (
                        "0 s"
                      )}
                    </span>
                  </p>
                </div>
              </div>
              <div className="slide-up mt-2 max-w-2xl mx-auto rounded-lg border h-1/4 bg-white shadow-2 shadow-purple-500 w-full">
                <div className="grid grid-cols-3 border-b">
                  <div className="border-r p-2">
                    <p className="text-center font-medium">Question</p>
                  </div>
                  <div className="border-r p-2">
                    <p className="text-center font-medium">Point</p>
                  </div>
                  <div className=" p-2">
                    <p className="text-center font-medium">Time</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`flex justify-center items-center h-screen ${
            start ? "slide-down" : ""
          }`}
        >
          {countdown > 0 ? (
            <div className={`${!start ? "slide-down " : ""}`}>
              <Image
                src="/images/logo.png"
                width={250}
                height={250}
                alt="Logo"
                className="mx-auto"
              />
              <div className="mx-auto h-[180px] bg-white shadow-4 shadow-[#6c4298] w-[180px] border-4 rounded-full font-bold font-poetsen flex items-center justify-center">
                <p className="text-[160px] text-black">{countdown}</p>
              </div>
            </div>
          ) : (
            <div className={` ${!start ? "fade-in-05s" : ""}`}>
              <Image
                src="/images/logo.png"
                width={250}
                height={250}
                alt="Logo"
                className="mx-auto"
              />
              <div
                onClick={handleStart}
                className="hover:bg-rose-600 hover:shadow-rose-800 cursor-pointer text-[60px] font-bold font-poetsen shadow-4 shadow-rose-700 w-[400px] flex justify-center items-center bg-rose-500 rounded-full"
              >
                <p className="text-white">Start</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Play;
