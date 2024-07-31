import { useParams, usePathname } from "next/navigation";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import {
  getAnwsersIsTrue,
  getItemQuizz,
  getQuestionById,
} from "@/api/quizz.api";
import { Anwsers, Question } from "@/lib/interface/question.interface";
import { questionInit } from "@lib/config/initQuestion";
import CountdownTimer from "@/lib/components/common/countdownTimer/defaultCountdownTimer";
import { addResult, resetResult } from "@lib/state/result/resultSlice";
import { RootState } from "@lib/state/store";
import Link from "next/link";
import { colorCardAnswer } from "@lib/config/colorCardAnswer";
import { randomUtils } from "@/utils/randomUtils ";

const Play = () => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const { query, push } = useRouter();
  const [start, setStart] = useState(false);
  const [notification, setNotification] = useState("");
  const [countdown, setCountdown] = useState(3);
  const [question, setQuestion] = useState<Question[]>(questionInit);
  const [indexs, setIndexs] = useState(0);
  const [stopTime, setStopTime] = useState(false);
  const [idsArray, setIdsArray] = useState<string[]>([]);
  const [timerA, setTimerA] = useState<any>(null);
  const timeQuestionIndex = question[indexs].time;
  const timeQuestion = timeQuestionIndex * 1000;
  const dataResult = useSelector((state: RootState) => state.result);
  const [timeLeft, setTimeLeft] = useState(timeQuestionIndex);
  const [dataAnwsersRandom, setDataAnwsersRandom] = useState<Anwsers[]>([]);

  const handleStart = () => {
    setStart(true);
  };

  const handleChoiceAnswer = async (id: string | undefined) => {
    if (id) {
      if (idsArray.includes(id)) {
        setIdsArray((prevIdsArray) =>
          prevIdsArray.filter((item) => item !== id)
        );
      } else if (idsArray.length + 1 < 4) {
        setIdsArray((prevIdsArray) => [...prevIdsArray, id]);
      }
    }
  };

  const startTimerA = () => {
    clearTimeout(timerA);
    setTimerA(
      setTimeout(() => {
        if (start) {
          if (indexs !== -1 && indexs < question.length) {
            handleSubmit();
          }
        }
      }, timeQuestion)
    );
  };

  const startTimerB = () => {
    clearTimeout(timerA);
    setTimerA(
      setTimeout(() => {
        if (indexs !== -1 && indexs < question.length - 1) {
          setIndexs((prevIndex) => prevIndex + 1);
          setIdsArray([]);
        }
      }, 1500)
    );
  };

  const clearTimer = () => {
    clearTimeout(timerA);
  };

  const indexQuestionPercent = Number(
    (indexs + 1) * (1 / question?.length) * 100
  );
  const handleTick = (timeLeft: number) => {
    setTimeLeft(timeLeft);
  };

  const handleSubmit = async () => {
    const id = query.id;
    if (dataResult.length === question.length) {
      push(`/admin/results/${id}`);
    } else {
      clearTimer();
      setStopTime(true);
      const data = {
        idsArrayAnswer: idsArray,
        idQuestion: question[indexs]._id,
      };
      const { isAllCorrect } = await getAnwsersIsTrue(data, id);
      if (isAllCorrect) {
        setNotification("TRUE");
      } else {
        setNotification("FALSE");
      }
      const resultExists = dataResult.some((result) => result.index === indexs);
      if (!resultExists) {
        const resutlt = {
          index: indexs,
          point: isAllCorrect ? question[indexs].point : 0,
          time: question[indexs].time - timeLeft,
          rightAnswer: isAllCorrect,
        };
        dispatch(addResult(resutlt));
      }
      startTimerB();
    }
  };

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
    setStopTime(false);
    setNotification("");
    if (question.length !== 1) {
      setDataAnwsersRandom(randomUtils.shuffleArray(question[indexs].anwsers));
      startTimerA();
    }
  }, [start, indexs, question]);

  useEffect(() => {
    clearTimer();
    dispatch(resetResult());
  }, [pathname]);

  useEffect(() => {
    const audio = new Audio("/music/music-play-game.mp3");
    const count = new Audio("/music/count-down.mp3");
    if (start) {
      count.pause();
      audio.play();
    } else {
      audio.pause();
      count.volume = 0.5;
      count.play();
    }
    return () => {
      audio.pause();
      count.pause();
    };
  }, [start]);

  useEffect(() => {
    const audioTrueAnswer = new Audio("/music/rightanswer.mp3");
    const audioFalseAnswer = new Audio("/music/wronganswer.mp3");

    if (notification === "TRUE") {
      audioTrueAnswer.play();
      return () => {
        audioTrueAnswer.pause();
      };
    } else if (notification === "FALSE") {
      audioFalseAnswer.play();
      return () => {
        audioFalseAnswer.pause();
      };
    }
  }, [notification]);

  return (
    <div className="">
      {start ? (
        <div className="bg-bts-hero-search-bg bg-no-repeat bg-right bg-cover h-full">
          <div className="pb-10 grid grid-cols-12 gap-4 container mx-auto">
            {/* Box 1 */}
            <div className="xl:col-span-3 lg:col-span-0 xl:block lg:hidden"></div>
            {/* Box 2  */}
            <div className="w-full xl:col-span-4 lg:col-span-6 col-span-12 slide-up mt-2 max-w-2xl mx-auto rounded-lg border h-full px-5 pt-5 bg-white shadow-2 shadow-purple-500 relative">
              {/* Notification True  */}
              {notification === "TRUE" && (
                <div className="slide-up absolute top-0 left-0 w-full h-[200px] bg-[#3ed684] z-10 rounded-b-3xl shadow-2 shadow-black flex justify-center items-center">
                  <div>
                    <p className="text-white text-[36px] font-medium text-center">
                      Correct !
                    </p>
                    <div className="w-[200px] px-4 py-2 bg-white rounded-full mt-5 shadow-2">
                      <p className="text-center w-full text-black font-semibold font-pacifico">
                        + {question[indexs].point} point
                      </p>
                    </div>
                  </div>
                </div>
              )}
              {/* Notification False  */}
              {notification === "FALSE" && (
                <div
                  className={`slide-up absolute top-0 left-0 w-full h-[200px] bg-[#e35454] z-10 rounded-b-3xl shadow-2 shadow-black flex justify-center items-center`}
                >
                  <div>
                    <p className="text-white text-[36px] font-medium text-center">
                      Incorrect !
                    </p>
                    <div className="w-[200px] px-4 py-2 bg-white rounded-full mt-5 shadow-2">
                      <p className="text-center w-full text-black font-semibold font-pacifico">
                        No points +
                      </p>
                    </div>
                  </div>
                </div>
              )}
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
                <div className="">
                  <img
                    src={
                      question
                        ? question[indexs].imgQuestion
                        : "/images/image-loading.webp"
                    }
                    alt="Logo"
                    className={`mt-5 rounded-xl border w-full mx-auto sm:h-[280px] h-[300px] fade-in-05s object-fill`}
                  />
                </div>
                <p className="font-medium mt-5 text-xl h-[70px]">
                  {question[indexs].title}
                </p>
                <div className="w-full border-r-[5px] border-white mb-3 grid grid-cols-2 grid-rows-2 gap-4">
                  {dataAnwsersRandom.map((items, index) => (
                    <div key={items._id}>
                      <div
                        className={`hover:shadow-2 hover:shadow-green-400 hover:scale-105 ease-in-out duration-300 cursor-pointer border-r-4 border-b-4 py-3 px-6 rounded-2xl w-full h-[170px] flex justify-center items-center relative`}
                        style={{
                          backgroundColor:
                            colorCardAnswer[index].colorBackground,
                          borderColor: colorCardAnswer[index].colorBoder,
                        }}
                        onClick={() => handleChoiceAnswer(items._id)}
                      >
                        <p className="text-white font-medium text-lg">
                          {items.text}
                        </p>
                        <div className="cursor-pointer">
                          <div className="absolute right-3 top-5 rounded-full border-4 border-white p-1 ease-in-out duration-300 w-[40px] h-[40px]">
                            {idsArray.includes(String(items._id)) && (
                              <Image
                                src="/images/doneLight.png"
                                width={30}
                                height={30}
                                alt="CheckBox"
                                className="absolute inset-0 z-0"
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  className="slide-up my-2 w-full rounded-lg border  bg-white shadow-2 shadow-purple-500 hover:bg-black hover:text-white ease-linear duration-300"
                  onClick={handleSubmit}
                >
                  <p className="text-center text-xl font-semibold p-4">
                    {dataResult.length === question.length
                      ? "Go to results !!!"
                      : "Next question"}
                  </p>
                </button>
              </div>
            </div>
            {/* Box 3 */}
            <div className="xl:col-span-4 lg:col-span-4 col-span-12 ">
              {/* Point and Time  */}
              <div className="slide-up mt-2 max-w-2xl mx-auto rounded-lg border bg-white shadow-2 shadow-purple-500 w-full grid grid-cols-2">
                <div className="flex items-center w-full h-full border-r p-2">
                  <div className="">
                    <Image
                      src="/images/point.webp"
                      width={40}
                      height={40}
                      alt="Logo"
                      className="bg-contain bg-center object-cover"
                    />
                  </div>
                  <p className="xl:p-2 p-1 font-medium xl:text-lg text-sm">
                    Point:{" "}
                    <span className="text-green-500">
                      {question[indexs].point}
                    </span>
                  </p>
                </div>
                <div className="flex items-center w-full h-full p-2">
                  <div>
                    <Image
                      src="/images/time-clock.webp"
                      width={40}
                      height={40}
                      alt="Logo"
                      className="bg-contain bg-center object-cover"
                    />
                  </div>
                  <p className="xl:p-2 p-1 font-medium xl:text-lg text-sm">
                    Time:{" "}
                    <span className="text-rose-600">
                      {timeQuestionIndex > 0 ? (
                        <>
                          <CountdownTimer
                            maxTime={timeQuestionIndex}
                            index={indexs}
                            stop={stopTime}
                            onTick={(timeLeft: number) => handleTick(timeLeft)}
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
              {/* Analytic  */}
              <div className="slide-up mt-2 max-w-2xl mx-auto rounded-lg border lg:h-1/4 h-full bg-white shadow-2 shadow-purple-500 w-full">
                <div className="grid grid-cols-3 border-b pr-[5px]">
                  <div className="border-r p-2">
                    <p className="text-center font-medium">Question</p>
                  </div>
                  <div className="border-r p-2">
                    <p className="text-center font-medium">Point</p>
                  </div>
                  <div className=" p-2">
                    <p className="text-center font-medium">Time(s)</p>
                  </div>
                </div>
                <div className="h-[180px] overflow-y-scroll">
                  {dataResult.map((items, index) => (
                    <div className="grid grid-cols-3 border-b" key={index}>
                      <div
                        className={`border-r p-2 text-white ${
                          items.rightAnswer ? "bg-green-400" : "bg-rose-600"
                        }`}
                      >
                        <p className="text-center font-medium">
                          {items.index + 1}
                        </p>
                      </div>
                      <div className="border-r p-2">
                        <p className="text-center font-medium">{items.point}</p>
                      </div>
                      <div className=" p-2">
                        <p className="text-center font-medium">
                          {items.time} s
                        </p>
                      </div>
                    </div>
                  ))}
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
