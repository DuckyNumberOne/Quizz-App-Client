import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { getItemQuizzResultByUser } from "@/api/quizzResult";
import ButtonDefault from "@/lib/components/common/button/buttonDefault";
import Link from "next/link";
import { Question } from "@lib/modal/question";
import ChartThree from "@/lib/components/common/charts/chartThree";
import { debounce } from "@/utils/debounce";

interface Question2 {
  index: number;
  point: number;
  time: number;
  rightAnswer: boolean;
  _id: string;
}

interface Quizz {
  _id: string;
  urlThumbnail: string;
  title: string;
  question: Question[];
}

interface QuizzResult {
  _id: string;
  idUser: string;
  idQuizz: Quizz;
  questions: Question2[];
  rightAnswer: number;
  completionTime: number;
  totalPoints: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const History = () => {
  const { query } = useRouter();
  const [titleQuizz, setTitleQuizz] = useState("");
  const [quizz, setQuizz] = useState<QuizzResult[]>([]);
  const [indexs, setIndex] = useState(-1);
  const [persenPoint, setPersenPoint] = useState(0);
  const [persenCompletionTime, setPersenCompletionTime] = useState(0);
  const [persenRightAnswer, setPersenRightAnswer] = useState(0);

  const [filteredDataQuizz, setFilteredDataQuizz] = useState<QuizzResult[]>([]);
  const dataPersen = {
    title: "Question Result Analytics",
    text: ["Point", "Time", "RightAnswer"],
    persen: [persenPoint, persenCompletionTime, persenRightAnswer],
    color: ["#3C50E0", "#6577F3", "#8FD0EF"],
  };

  const filterDataQuizz = () => {
    const filteredQuizz = quizz.filter((qz) =>
      qz.idQuizz.title.toLowerCase().includes(titleQuizz.toLowerCase())
    );
    setFilteredDataQuizz(filteredQuizz);
  };

  const fetch = async () => {
    const res = await getItemQuizzResultByUser(String(query.id));
    setQuizz(res);
  };

  const debouncedCallback = debounce({
    delay: 500,
    callback: (value: string) => {
      setTitleQuizz(value);
    },
  });

  const handleInputChange = (e: any) => {
    debouncedCallback(e.target.value);
  };

  const handleClick = (index: number) => {
    setIndex(index);
  };

  useEffect(() => {
    if (query.id !== undefined) {
      fetch();
    }
  }, [query.id]);

  useEffect(() => {
    if (titleQuizz.trim() == "") {
      if (quizz !== undefined) {
        setFilteredDataQuizz(quizz);
      }
    } else {
      filterDataQuizz();
    }
  }, [titleQuizz, quizz]);

  useEffect(() => {
    if (indexs !== -1 && quizz) {
      const totalPoints = quizz[indexs].totalPoints;
      const maxPossiblePoints = quizz[indexs].idQuizz.question.reduce(
        (accumulator, currentValue) => accumulator + currentValue.point,
        0
      );
      const totalCompletionTime = quizz[indexs].completionTime;
      const maxPossibleTime = quizz[indexs].idQuizz.question.reduce(
        (accumulator, currentValue) => accumulator + currentValue.time,
        0
      );
      const totalRightAnswers = quizz[indexs].rightAnswer;
      const totalQuestions = quizz[indexs].questions.length;

      const pointPercentage = Number(
        ((totalPoints / maxPossiblePoints) * 100).toFixed(0)
      );
      const timePercentage = Number(
        ((totalCompletionTime / maxPossibleTime) * 100).toFixed(0)
      );
      const rightAnswerPercentage = Number(
        ((totalRightAnswers / totalQuestions) * 100).toFixed(0)
      );

      setPersenPoint(pointPercentage);
      setPersenCompletionTime(timePercentage);
      setPersenRightAnswer(rightAnswerPercentage);
    }
  }, [indexs]);

  return (
    <div
      className={`bg-bts-hero-2 bg-no-repeat bg-right bg-cover h-screen w-full relative`}
    >
      <div className="bg-black-shadow-2 absolute inset-0 w-full h-screen">
        <section className=" mt-4 rounded-lg h-[820px] container mx-auto grid grid-cols-12 b gap-5">
          <div
            className={`col-span-5 rounded-sm border border-stroke bg-white p-5 ${
              indexs !== -1 ? "slide-left" : " col-start-5 fade-in-05s"
            }`}
          >
            <nav>
              <div className="w-full mx-auto px-4 py-2 border rounded-lg flex items-center">
                <input
                  type="text"
                  className="max-w-full w-full focus:outline-none"
                  placeholder="Search quizz here ...."
                  onChange={handleInputChange}
                />
                <div className="bg-[#c92127] flex items-center justify-center w-20 h-10 px-5 py-[7px] rounded-md cursor-pointer">
                  <Image
                    src="/images/search(1).png"
                    width={20}
                    height={20}
                    alt="search"
                  />
                </div>
              </div>
            </nav>
            <h3 className="mt-5 text-2xl font-semibold">History</h3>
            <select className="mt-5 border p-1 w-2/6">
              <option value="today">All</option>
              <option value="yesterday">Yesterday</option>
              <option value="audi" selected>
                Today
              </option>
            </select>
            <div className="space-y-4 mt-4 p-5 border h-[600px] overflow-y-scroll">
              {filteredDataQuizz.length > 0 ? (
                filteredDataQuizz?.map((items, index) => (
                  <div
                    key={index}
                    className={`grid grid-cols-6 border cursor-pointer hover:bg-slate-200 ${
                      index === indexs &&
                      "scale-105 shadow-4 shadow-purple-600 ease-in-out duration-300"
                    }`}
                    onClick={() => handleClick(index)}
                  >
                    <img
                      src={items.idQuizz.urlThumbnail}
                      alt="Thumbnail"
                      className="w-full h-[120px] col-span-2 bg-contain"
                    />
                    <div className="col-span-4 ml-4 text-base">
                      <p className="font-medium h-10">{items.idQuizz.title}</p>
                      <div className="text-base">
                        <div className="flex gap-2 items-center">
                          <p className="font-normal">Right answer:</p>
                          <p>{items.rightAnswer}</p>
                        </div>
                        <div className="flex gap-2 items-center">
                          <p className="font-normal">Total points:</p>
                          <p>{items.totalPoints}</p>
                        </div>
                        <div className="flex gap-2 items-center">
                          <p className="font-normal">Completion time:</p>
                          <p>{items.completionTime}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-2xl">
                  You have not played any quizzes yet. Start playing now to see
                  your quiz history here.{" "}
                  <Link href="/admin" className="font-semibold text-blue-600">
                    Play quizz
                  </Link>
                </p>
              )}
            </div>
          </div>
          {indexs !== -1 && (
            <div className="fade-in-05s col-span-7 rounded-sm border border-stroke bg-white p-5 h-[840px] overflow-y-scroll">
              {filteredDataQuizz && indexs !== -1 && (
                <>
                  <div
                    className={`flex items-center justify-between mb-5 ${
                      filteredDataQuizz[indexs].idQuizz.title.length > 40 &&
                      "h-20"
                    }`}
                  >
                    <h3
                      className={`text-2xl mb-5 font-normal ${
                        filteredDataQuizz[indexs].idQuizz.title.length > 40 &&
                        "h-20"
                      }`}
                    >
                      {filteredDataQuizz[indexs].idQuizz.title}
                    </h3>

                    <Link
                      className="border px-2 py-1 shadow-2 shadow-purple-600 text-base font-medium"
                      href={`/admin/quizz/${filteredDataQuizz[indexs].idQuizz._id}`}
                    >
                      Detail quizz
                    </Link>
                  </div>
                  <div className="h-3/6 w-full">
                    <img
                      src={filteredDataQuizz[indexs].idQuizz.urlThumbnail}
                      width={300}
                      height={200}
                      alt="Thumbnail"
                      className="w-full h-full object-cover border-2"
                    />
                  </div>
                  <div className="mt-4">
                    <ChartThree data={dataPersen} />
                  </div>
                  <div>
                    <div className="">
                      <div className="grid grid-cols-4 mt-5 text-base text-center font-semibold">
                        <div className="border-y col-span-2 border-x">
                          Question
                        </div>
                        <div className="border-y border-r">Point</div>
                        <div className="border-y border-r">Time</div>
                      </div>
                      {filteredDataQuizz[indexs].idQuizz.question.map(
                        (items, index) => (
                          <div
                            className="grid grid-cols-4 text-base text-center"
                            key={index}
                          >
                            <div className="border-b col-span-2 border-x text-start font-medium p-2">
                              {items.title}
                            </div>
                            <div className="border-b border-r">
                              <p>{items.point} point</p>
                            </div>
                            <div className="border-b border-r">
                              {items.time} s
                            </div>
                          </div>
                        )
                      )}
                    </div>
                    <div className="grid grid-cols-4 text-base text-center ">
                      <div className="border-b col-span-2 border-x">
                        {filteredDataQuizz[indexs].idQuizz.question.length}{" "}
                        question
                      </div>
                      <div className="border-b border-r">
                        {filteredDataQuizz[indexs].idQuizz.question.reduce(
                          (accumulator, currentValue) =>
                            accumulator + currentValue.point,
                          0
                        )}{" "}
                        point
                      </div>
                      <div className="border-b border-r">
                        {filteredDataQuizz[indexs].idQuizz.question.reduce(
                          (accumulator, currentValue) =>
                            accumulator + currentValue.time,
                          0
                        )}{" "}
                        s
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="">
                      <div className="grid grid-cols-4 mt-5 text-base text-center font-semibold">
                        <div className="border-y border-x">Question</div>
                        <div className="border-y border-r">Point</div>
                        <div className="border-y border-r">Right answer</div>
                        <div className="border-y border-r">Time</div>
                      </div>
                      {filteredDataQuizz[indexs].questions.map((items) => (
                        <div
                          className="grid grid-cols-4 text-base text-center"
                          key={items._id}
                        >
                          <div className="border-b border-x">
                            {items.index + 1}
                          </div>
                          <div className="border-b border-r">
                            <p>{items.point} point</p>
                          </div>
                          <div className={`border-b border-r`}>
                            <span
                              className={
                                !items.rightAnswer
                                  ? "text-rose-600 font-semibold"
                                  : "text-green-500 font-semibold"
                              }
                            >
                              {String(items.rightAnswer)}
                            </span>
                          </div>
                          <div className="border-b border-r">
                            {items.time} s
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-4 text-base text-center ">
                      <div className="border-b border-x">
                        {filteredDataQuizz[indexs].questions.length} question
                      </div>
                      <div className="border-b border-r">
                        {filteredDataQuizz[indexs].totalPoints} point
                      </div>
                      <div className="border-b border-r">
                        {filteredDataQuizz[indexs].rightAnswer} right answer
                      </div>
                      <div className="border-b border-r">
                        {filteredDataQuizz[indexs].completionTime} s
                      </div>
                    </div>
                  </div>

                  <p className="text-end mt-10">
                    <span className="font-semibold">Time play: </span>
                    {filteredDataQuizz[indexs].createdAt.split("T")[0]}
                  </p>
                </>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};
export default History;
