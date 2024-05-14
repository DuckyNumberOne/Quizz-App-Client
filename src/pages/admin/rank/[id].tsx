import { getItemQuizzResultByQuizz } from "@/api/quizzResult";
import { initResult } from "@/lib/config/initResult";
import { QuizzResult, QuizzResultOption } from "@/lib/modal/quizzResult";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
const Rank = () => {
  const { query, push } = useRouter();
  const param = query.id;

  const [dataResult, setDataResult] = useState<QuizzResultOption[]>([
    initResult,
    initResult,
    initResult,
  ]);

  const top1 = dataResult.length > 0 ? dataResult[0] : initResult;
  const top2 = dataResult.length > 1 ? dataResult[1] : initResult;
  const top3 = dataResult.length > 2 ? dataResult[2] : initResult;

  useEffect(() => {
    if (param) {
      const fetchResult = async () => {
        const res = await getItemQuizzResultByQuizz(param);
        setDataResult(res);
      };
      fetchResult();
    }
  }, [param]);

  return (
    <div className="bg-bts-hero-search-bg bg-no-repeat bg-right bg-cover h-screen pt-10">
      <div className="bg-[#6d5ff6] fade-in-05s max-w-7xl mx-auto rounded-lg border p-5 shadow-2 shadow-purple-500 relative h-[800px] grid grid-cols-2">
        {/* Ranking 1 2 3 */}
        <div className="h-full relative">
          <div className="grid-cols-3 grid h-1/2 absolute bottom-0 max-w-xl w-full">
            {/* Top 2  */}
            <div className="col-span-1 w-full bg-#6d5ff6 relative">
              {top2 && (
                <div className="absolute bottom-70 w-full bg-#6d5ff6 s">
                  <div className="bg-white w-1/2 mx-auto rounded-2xl shadow-4 shadow-purple-500 px-2 py-1">
                    <p className="text-center font-medium">
                      {top2.totalPoints} P
                    </p>
                  </div>
                  <img
                    src={
                      top2.idUser.urlAvatar !== "Loading..."
                        ? top2.idUser.urlAvatar
                        : "/images/avatar-loading.png"
                    }
                    alt="avatar"
                    className="w-25 h-25 rounded-full shadow-4 shadow-whiten mx-auto object-cover"
                  />
                  <p className="text-lg font-medium text-center mt-5 text-white">
                    {top2 ? top2.idUser.fullName : ""}
                  </p>
                </div>
              )}
              {/* Collum  */}
              <div className="absolute bottom-0 bg-[#9b9b9b]  shadow-2 shadow-[#9e9e9e] w-full h-2/3">
                <p className="text-[80px] text-white font-semibold text-center">
                  2
                </p>
              </div>
            </div>
            {/* Top 1  */}
            <div className="col-span-1 w-full bg-#6d5ff6 relative">
              {top1 && (
                <div className="absolute bottom-100 w-full">
                  <div className="bg-white w-1/2 mx-auto rounded-2xl shadow-4 shadow-purple-500 px-2 py-1">
                    <p className="text-center font-medium">
                      {top1.totalPoints} P
                    </p>
                  </div>
                  <img
                    src={
                      top1.idUser.urlAvatar !== "Loading..."
                        ? top1.idUser.urlAvatar
                        : "/images/avatar-loading.png"
                    }
                    alt="avatar"
                    className="w-25 h-25 rounded-full shadow-4 shadow-whiten mx-auto object-cover"
                  />
                  <p className="text-lg font-medium text-center mt-5 text-white">
                    {top1 ? top1.idUser.fullName : ""}
                  </p>
                </div>
              )}
              {/* Collum  */}
              <div className="absolute bottom-0 bg-[#c9ba6e] shadow-2 shadow-[#cabb70]  w-full h-full">
                <p className="text-[80px] text-white font-semibold text-center">
                  1
                </p>
              </div>
            </div>
            {/* Top 3 */}
            <div className="col-span-1 w-full bg-#6d5ff6 relative">
              {top3 && (
                <div className="absolute bottom-40 w-full">
                  <div className="bg-white w-1/2 mx-auto rounded-2xl shadow-4 shadow-purple-500 px-2 py-1">
                    <p className="text-center font-medium">
                      {top3.totalPoints} P
                    </p>
                  </div>
                  <img
                    src={
                      top3.idUser.urlAvatar !== "Loading..."
                        ? top3.idUser.urlAvatar
                        : "/images/avatar-loading.png"
                    }
                    alt="avatar"
                    className="w-25 h-25 rounded-full shadow-4 shadow-whiten mx-auto object-cover"
                  />
                  <p className="text-lg font-medium text-center mt-5 text-white">
                    {top3 ? top3.idUser.fullName : ""}
                  </p>
                </div>
              )}
              {/* Collum  */}
              <div className="absolute bottom-0 bg-[#ce8d46]  shadow-2 shadow-[#ce8d46] w-full h-1/3">
                <p className="text-[80px] text-white font-semibold text-center">
                  3
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Ranking  other*/}
        <div className="w-full h-full bg-[#8a7ff8]">
          <div className="h-[760px] space-y-4 overflow-scroll p-4">
            {dataResult.length > 3 ? (
              dataResult.slice(2).map((item, index) => (
                <div key={index} className="bg-white-shadow p-4 rounded-xl">
                  <div className="flex items-center justify-between text-white font-medium text-lg relative">
                    <div className="absolute left-[-15px]  flex items-center h-full ">
                      <div className="bg-[#4c40bf] w-8 h-8 rounded-full flex items-center justify-center shadow-4 shadow-[#4c40bf]">
                        <p className="font-medium text-base text-center">
                          {index + 3}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center ml-2">
                      <img
                        src={item.idUser.urlAvatar}
                        alt="Avatar"
                        className="w-20 h-20 object-cover rounded-full border-[#8854c0] border-2 mr-4"
                      />
                      <p className="mr-2">{item.idUser.fullName}</p>
                    </div>
                    <div className="flex items-center">
                      <p className="mr-2">{item.totalPoints} P /</p>
                      <p className="mr-2">{item.completionTime} s</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div>
                <p className="text-white font-medium text-2xl text-center">
                  There is no one in the ranking yet !!!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rank;
