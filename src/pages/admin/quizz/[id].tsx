import { getItemQuizz } from "@/api/quizz.api";
import { getItemQuizzResultByQuizz } from "@/api/quizzResult.api";
import ButtonDefault from "@/lib/components/common/buttons/buttonDefault";
import { initResult } from "@lib/config/initResult";
import { Quizz } from "@/lib/interface/quizz.interface";
import {
  QuizzResult,
  QuizzResultOption,
} from "@/lib/interface/quizzResult.interface";
import { setTurnOffPopup, setTurnOnPopup } from "@lib/state/popup/popupSlice";
import { AppDispatch, RootState } from "@lib/state/store";
import { scrollToTop } from "@/utils/scrollToTop";
import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DefaultLoadingPage from "@lib/components/admin/loadingPages/defaultLoadingPage";

const Play = () => {
  const path = usePathname();
  const { push, query } = useRouter();
  const splitPath = path && path.split("/");
  const params = path && splitPath[splitPath.length - 1];
  const dispatch = useDispatch<AppDispatch>();
  const [quizz, setQuizz] = useState<Quizz>();
  const [dataResult, setDataResult] = useState<QuizzResultOption[]>([
    initResult,
    initResult,
    initResult,
  ]);

  const [hidden, setHidden] = useState(true);
  // const { popup_start_game } = useSelector((state: RootState) => state.popup);
  const user = useSelector((state: RootState) => state.user);
  const checkUser = user._id === quizz?.idUser;
  const top1 = dataResult.length > 0 ? dataResult[0] : initResult;
  const top2 = dataResult.length > 1 ? dataResult[1] : initResult;
  const top3 = dataResult.length > 2 ? dataResult[2] : initResult;

  const fetchQuizz = async () => {
    const res: Quizz = await getItemQuizz(params);
    if (res) {
      setQuizz(res);
      dispatch(setTurnOffPopup("popup_loading_page_admin"));
    }
  };

  const fetchResult = async () => {
    const res = await getItemQuizzResultByQuizz(params);
    setDataResult(res);
  };

  const handleFollow = () => {};

  const handleHidden = () => {
    setHidden(!hidden);
  };

  useEffect(() => {
    if (params) {
      fetchResult();
      fetchQuizz();
    }
  }, [params]);

  const handlPlaySolo = () => {
    scrollToTop("main-content");
    push(`/admin/play/${params}`);
  };

  return (
    <DefaultLoadingPage animation="popup-dow">
      <div className="grid grid-cols-12">
        <section className="mx-6 pt-4 col-span-4 h-full">
          <div className="px-3 py-4 border md:p-4 bg-white border-[#e5e5e5]  my-4 rounded-lg h-full">
            <div className="text-xl font-bold py-4">
              <div className="w-full h-[300px]">
                <img
                  src={quizz?.urlThumbnail || "/images/image-loading.webp"}
                  width={200}
                  height={300}
                  alt="Thumbnail"
                  className="rounded-xl bg-cover bg-center w-full h-full shadow-2 shadow-black"
                />
              </div>
              <div className="mt-4">
                <h1 className="font-bold text-xl h-[120px]">
                  {quizz?.title ? quizz?.title : "Loading..."}
                </h1>
                {/* Analyst Quizer  */}
                <div className="grid grid-cols-4 mt-10 border-4 border-[#c5c3ce] p-4 rounded-xl shadow-4">
                  <div className=" text-center">
                    <h3 className="font-medium text-lg text-[#c5c3ce]">
                      Played
                    </h3>
                    <p>{quizz?.play}</p>
                  </div>
                  <div className=" text-center">
                    <h3 className="font-medium text-lg text-[#c5c3ce]">
                      Share
                    </h3>
                    <p>{quizz?.share}</p>
                  </div>
                  <div className=" text-center">
                    <h3 className="font-medium text-lg text-[#c5c3ce]">
                      Followw
                    </h3>
                    <p>12</p>
                  </div>
                  <div className=" text-center">
                    <h3 className="font-medium text-lg text-[#c5c3ce]">
                      Question
                    </h3>
                    <p>{quizz?.question.length}</p>
                  </div>
                </div>
                {/* Details Author */}
                <div className="mt-10 flex items-center justify-between">
                  <div className="flex gap-5 items-center">
                    <img
                      src={quizz?.user.urlAvatar}
                      width={100}
                      height={100}
                      alt={quizz?.user.fullName}
                      className="rounded-full border-[4px] border-[#8854c0] border-solid shadow-4"
                    />
                    <div className="">
                      <p className="text-xl font-semibold cursor-pointer text-black transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
                        {quizz?.user.fullName}
                      </p>
                      <p className="text-base text-[#c4c2ce] font-medium">
                        @{quizz?.user.username}
                      </p>
                    </div>
                  </div>
                  {!checkUser ? (
                    <ButtonDefault
                      content="Follow"
                      className="text-white bg-black rounded-full py-4 px-8 text-lg  hover:text-black hover:bg-white hover:shadow-sm hover:shadow-black ease-in-out duration-300"
                      onClick={handleFollow}
                    />
                  ) : (
                    <div></div>
                  )}
                </div>
                {/* Descripsiom  */}
                <div className="mt-12">
                  <p className="text-xl font-bold">Description</p>
                  <div className="h-[140px] overflow-y-auto mt-4">
                    <p className="text-base font-medium">
                      {quizz?.description}
                    </p>
                  </div>
                </div>
                {/* Play  */}
                <div className="flex gap-5 justify-between items-center mt-10">
                  <ButtonDefault
                    className="text-white bg-black shadow-4 shadow-[#6d5ff6] p-4 rounded-full text-sm w-[35%] transition ease-in-out hover:scale-105"
                    content="Play with friends"
                  />
                  <ButtonDefault
                    className="text-black bg-white shadow-4 shadow-[#6d5ff6] p-4 rounded-full text-sm w-[35%] transition ease-in-out hover:scale-105"
                    content="Play solo"
                    onClick={handlPlaySolo}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="mx-6 pt-4 col-span-8 h-full ">
          <div className="px-3 py-4 border md:p-4 bg-white border-[#e5e5e5] my-4 rounded-lg h-full">
            {dataResult.length > 0 && (
              <div>
                {/* More Rank  */}
                <Link href={`/admin/rank/${params}`} className="w-full">
                  <p className="text-base text-blue-700 font-medium text-end mb-2 hover:text-blue-500 cursor-pointer">
                    See more ratings
                  </p>
                </Link>
                {/* Rank  */}
                <div className=" w-full h-[10%]">
                  <div className="w-full grid grid-cols-3">
                    {/* Top 1  */}
                    <div className="flex justify-between items-center m-5 px-2 py-1 shadow-4 shadow-[#f0d321] rounded-full">
                      <div className="flex gap-5 items-center">
                        <img
                          src={top1.idUser.urlAvatar}
                          width={60}
                          height={60}
                          alt="Avatar"
                          className="rounded-full"
                        />
                        <div>
                          <p className="text-black font-medium text-base">
                            {top1.idUser.fullName}
                          </p>
                          <div className="text-xs font-medium flex gap-7">
                            <p>{top1.totalPoints} P</p>
                            <p>{top1.completionTime} s</p>
                          </div>
                        </div>
                      </div>
                      <Image
                        src="/incons/top1.webp"
                        width={70}
                        height={70}
                        alt="Top1"
                      />
                    </div>
                    {/* Top 2 */}
                    <div className="flex justify-between items-center m-5 px-2 py-1 shadow-4 shadow-[#a4a8ae] rounded-full">
                      <div className="flex gap-5 items-center">
                        <img
                          src={top2.idUser.urlAvatar}
                          width={60}
                          height={60}
                          alt="Avatar"
                          className="rounded-full"
                        />
                        <div>
                          <p className="text-black font-medium text-base">
                            {top2.idUser.fullName}
                          </p>
                          <div className="text-xs font-medium flex gap-7">
                            <p>{top2.totalPoints} P</p>
                            <p>{top2.completionTime} s</p>
                          </div>
                        </div>
                      </div>
                      <Image
                        src="/incons/top2.webp"
                        width={70}
                        height={70}
                        alt="Top2"
                      />
                    </div>
                    {/* Top 3  */}
                    <div className="flex justify-between items-center m-5 px-2 py-1 shadow-4 shadow-[#c98639] rounded-full">
                      <div className="flex gap-5 items-center">
                        <img
                          src={top3.idUser.urlAvatar}
                          width={60}
                          height={60}
                          alt="Avatar"
                          className="rounded-full"
                        />
                        <div>
                          <p className="text-black font-medium text-base">
                            {top3.idUser.fullName}
                          </p>
                          <div className="text-xs font-medium flex gap-7">
                            <p>{top3.totalPoints} P</p>
                            <p>{top3.completionTime} s</p>
                          </div>
                        </div>
                      </div>
                      <Image
                        src="/incons/top3.webp"
                        width={70}
                        height={70}
                        alt="Top3"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* Question  */}
            <div className=" py-4">
              <div className="text-xl font-bold flex items-center justify-between mb-5">
                <p className="text-2xl mb-4">
                  {quizz?.question.length} question 🙋
                </p>
                {checkUser ? (
                  <button
                    onClick={handleHidden}
                    className="w-10 h-10 rounded-full bg-white shadow-2 flex items-center justify-center border-2 shadow-purple-500"
                  >
                    <Image
                      src={
                        hidden
                          ? "/images/preview-2.webp"
                          : "/images/hidden.webp"
                      }
                      width={30}
                      height={30}
                      alt="hidden"
                    />
                  </button>
                ) : (
                  <></>
                )}
              </div>
              <div className="space-y-4 h-[900px] overflow-y-auto p-4 text-xl font-bold">
                {quizz ? (
                  quizz.question.map((items) => (
                    <div
                      className="flex gap-5 p-4 rounded-xl shadow-4 shadow-[#5c4f7ea6] hover:bg-[#e5e5e571] ease-in-out duration-300"
                      key={items._id}
                    >
                      <div className="w-[300px] h-[200px] relative rounded-lg ">
                        <img
                          src={
                            items.imgQuestion || "/images/image-loading.webp"
                          }
                          width={300}
                          height={200}
                          className="rounded-lg h-[200px] bg-cover"
                          alt={items.title}
                        />
                        {/* shadow  */}
                        {!checkUser && (
                          <div
                            className={`absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black-shadow rounded-lg`}
                          >
                            <div className="p-5 rounded-full bg-[#8854c0]">
                              <Image
                                src="/images/quizzes-question.png"
                                alt="quizzes question"
                                width={50}
                                height={50}
                              />
                            </div>
                          </div>
                        )}
                        {hidden && (
                          <div
                            className={`${
                              hidden ? "fade-in-01s " : "hidden"
                            } absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black-shadow rounded-lg`}
                          >
                            <div className="p-5 rounded-full bg-[#8854c0]">
                              <Image
                                src="/images/quizzes-question.png"
                                alt="quizzes question"
                                width={50}
                                height={50}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="h-1/3">{items.title}</p>
                        <div className="flex gap-4">
                          <div className="space-y-3">
                            <div className="px-4 py-1.5 text-lg font-semibold text-black w-[220px] shadow-4 rounded-lg ">
                              <div className="flex gap-3">
                                <Image
                                  src="/images/time-clock.webp"
                                  width={25}
                                  height={25}
                                  alt="Time clock"
                                  className="bg-cover bg-center"
                                />
                                <p>
                                  Time:{" "}
                                  <span className="text-red">
                                    {items.time} s
                                  </span>
                                </p>
                              </div>
                            </div>
                            <div className="px-4 py-1.5 text-lg  font-semibold text-black w-[220px] shadow-4 rounded-lg ">
                              <div className="flex gap-3">
                                <Image
                                  src="/images/points.webp"
                                  width={25}
                                  height={25}
                                  alt="Points"
                                  className="bg-cover bg-center"
                                />
                                <p>
                                  Points:{" "}
                                  <span className="text-red">
                                    {items.point} P
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="space-y-3">
                            <div className="px-4 py-1.5 text-lg  font-semibold text-black w-[220px] shadow-4 rounded-lg ">
                              <div className="flex gap-3">
                                <Image
                                  src="/images/right-answer.webp"
                                  width={25}
                                  height={25}
                                  alt="Right answer"
                                  className="bg-cover bg-center"
                                />
                                <p>
                                  Right answer:{" "}
                                  <span className="text-red">
                                    {
                                      items.anwsers.filter(
                                        (anwsers) => anwsers.isCorrect === true
                                      ).length
                                    }
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div>Loading ...</div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </DefaultLoadingPage>
  );
};
export default Play;
