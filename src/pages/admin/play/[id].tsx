import { getItemQuizz } from "@/api/quizz";
import DefaultPopupAdmin from "@/lib/components/admin/PopupAdmin/DefaultPopupAdmin";
import ButtonDefault from "@/lib/components/common/Button/ButtonDefault";
import { Quizz } from "@/lib/modal/quizz";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const Play = () => {
  const path = usePathname();
  const splitPath = path && path.split("/");
  const params = path && splitPath[splitPath.length - 1];
  const [quizz, setQuizz] = useState<Quizz>();
  const [popup, setPopup] = useState(true);

  const handleFollow = () => {};

  useEffect(() => {
    if (params) {
      const fetch = async () => {
        const res = await getItemQuizz(params);
        setQuizz(res);
      };
      fetch();
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setPopup(false);
    }, 2000);
  }, []);

  return (
    <div>
      <DefaultPopupAdmin animation="popup-dow" popupDefault={popup} />
      <div className="bg-[#f2f2f2] h-screen">
        <div className="grid grid-cols-12">
          <div className="mx-6 pt-4 col-span-4 h-full">
            <div className="px-3 py-4 border md:p-4 bg-white border-[#e5e5e5]  my-4 rounded-lg">
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
                  <h1 className="font-bold text-2xl h-1/6">
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
                    <ButtonDefault
                      content="Follow"
                      className="text-white bg-black rounded-full py-4 px-8 text-lg  hover:text-black hover:bg-white hover:shadow-sm hover:shadow-black ease-in-out duration-300"
                      onClick={handleFollow}
                    />
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
                  <div className="flex gap-5 justify-between items-center mt-8">
                    <ButtonDefault
                      className="text-white bg-black shadow-4 shadow-[#6d5ff6] p-4 rounded-full text-sm w-[30%] transition ease-in-out hover:scale-105"
                      content="Play with friends"
                    />
                    <ButtonDefault
                      className="text-black bg-white shadow-4 shadow-[#6d5ff6] p-4 rounded-full text-sm w-[30%] transition ease-in-out hover:scale-105"
                      content="Play solo"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mx-6 pt-4 col-span-8 h-full ">
            <div className="px-3 py-4 border md:p-4 bg-white border-[#e5e5e5] my-4 rounded-lg">
              <div className="text-xl font-bold py-4">
                <p className="text-2xl mb-4">
                  {quizz?.question.length} question 🙋
                </p>
                <div className="space-y-4 h-[800px] overflow-y-auto p-4">
                  {quizz ? (
                    quizz.question.map((items) => (
                      <div className="flex gap-5 p-4 rounded-xl shadow-4 shadow-[#5c4f7ea6] hover:bg-[#e5e5e571] ease-in-out duration-300">
                        <div className="w-1/3 h-[200px] relative rounded-lg ">
                          <img
                            src={
                              items.imgQuestion || "/images/image-loading.webp"
                            }
                            className="w-full h-full rounded-lg"
                            alt={items.title}
                          />
                          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black-shadow rounded-lg">
                            <div className="p-5 rounded-full bg-[#8854c0]">
                              <Image
                                src="/images/quizzes-question.png"
                                alt="quizzes question"
                                width={50}
                                height={50}
                              />
                            </div>
                          </div>
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
                                          (anwsers) =>
                                            anwsers.isCorrect === true
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
          </div>
        </div>
      </div>
    </div>
  );
};
export default Play;
