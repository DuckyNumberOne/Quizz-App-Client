import ChartOne from "@/lib/components/common/Charts/ChartOne";
import ChartThree from "@/lib/components/common/Charts/ChartThree";
import ChartTwo from "@/lib/components/common/Charts/ChartTwo";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { QuizzOption2 } from "@/lib/modal/quizz";
import { initQuizzOption2 } from "@/lib/config/initQuizz";
import { useRouter } from "next/router";
import { getItemQuizzByUser, getListQuizz } from "@/api/quizz";
import { getQuestionPercentagesByQuizzId } from "@/api/quizzResult";

interface SeriesData {
  name: string;
  data: number[];
}

const MyQuizz = () => {
  const analyticalDataQuizzs = [
    {
      name: "Sales",
      data: [44, 55, 41, 67, 22, 43, 65],
    },
    {
      name: "Revenue",
      data: [13, 23, 20, 8, 13, 27, 15],
    },
  ];

  const { push, pathname, query } = useRouter();
  const [idQuizz, setIdQuizz] = useState("");
  const [analyticalDataQuizz, setAnalyticalDataQuizz] =
    useState<SeriesData[]>(analyticalDataQuizzs);
  const [dataQuizz, setDataQuizz] = useState<QuizzOption2[]>([
    initQuizzOption2,
  ]);

  const fetchDataQuiz = async () => {
    const res = await getItemQuizzByUser(String(query.id));
    setDataQuizz(res);
  };

  const handleClickQuizz = (id: string) => {
    setIdQuizz(id);
  };

  useEffect(() => {
    const fetch = async () => {
      const res = await getQuestionPercentagesByQuizzId(idQuizz);
      setAnalyticalDataQuizz(res);
    };
    if (idQuizz !== "") {
      fetch();
    }
  }, [idQuizz]);

  useEffect(() => {
    if (query.id !== undefined) {
      fetchDataQuiz();
    }
  }, [query.id]);

  return (
    <div
      className={`bg-bts-hero-2 bg-no-repeat bg-right bg-cover h-screen w-full relative`}
    >
      <div className="bg-black-shadow-2 absolute inset-0 w-full h-screen">
        <section className=" mt-4 rounded-lg h-[820px] container mx-auto grid grid-cols-12 b gap-5">
          {/* Analytics */}
          <div className="col-span-5">
            {/* <ChartThree /> */}
            {analyticalDataQuizz.length > 0 && (
              <ChartTwo data={analyticalDataQuizz} />
            )}
          </div>
          {/* List Quizz  */}
          <div className="col-span-7 rounded-sm border border-stroke bg-white p-5">
            <nav>
              <div className="w-full mx-auto px-4 py-2 border rounded-lg flex items-center">
                <input
                  type="text"
                  className="max-w-full w-full focus:outline-none"
                  placeholder="Search quizz here ...."
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
            <div className="space-y-4 mt-5 h-[730px] overflow-y-scroll">
              {dataQuizz.map((qz, index) => (
                <div
                  key={index}
                  className="border rounded-lg grid grid-cols-8 gap-2 cursor-pointer hover:bg-whiter "
                  onClick={() => handleClickQuizz(qz._id)}
                >
                  <div className="p-2 col-span-2">
                    <img
                      src={qz.urlThumbnail}
                      width={300}
                      height={200}
                      alt="Thumbnail"
                      className="h-[140px] w-[200px] bg-contain object-cover rounded-lg"
                    />
                  </div>
                  <div className="col-span-6">
                    <p className="font-medium text-lg h-14">
                      {qz.title.length > 60
                        ? qz.title.substring(0, 60) + "..."
                        : qz.title}
                    </p>

                    <div className="grid grid-cols-3 p-1 h-fit gap-2">
                      <div className="flex justify-start gap-5 items-center border p-1 bg-white">
                        <Image
                          src="/incons/play.png"
                          width={30}
                          height={30}
                          alt="Play"
                        />
                        <p className="font-medium text-base text-start ">
                          {qz.play}
                        </p>
                      </div>
                      <div className="flex justify-start gap-5 items-center border p-1 bg-white">
                        <Image
                          src="/incons/add-event.png"
                          width={30}
                          height={30}
                          alt="Play"
                        />
                        <p className="font-medium text-base text-start ">
                          {qz.createdAt?.split("T")[0]}
                        </p>
                      </div>
                      <div className="flex justify-start gap-5 items-center border p-1 bg-white">
                        <Image
                          src="/incons/categories.png"
                          width={30}
                          height={30}
                          alt="Play"
                        />
                        <p className="font-medium text-base text-start ">
                          {qz.idCollection.title}
                        </p>
                      </div>
                      <div className="flex justify-start gap-5 items-center border p-1 bg-white">
                        <Image
                          src="/incons/conversation.png"
                          width={30}
                          height={30}
                          alt="Play"
                        />
                        <p className="font-medium text-base text-start ">
                          {qz.question.length}
                        </p>
                      </div>
                      <div className="flex justify-start gap-5 items-center border p-1 bg-white">
                        <Image
                          src="/incons/update.png"
                          width={30}
                          height={30}
                          alt="Play"
                        />
                        <p className="font-medium text-base text-start ">
                          {qz.updatedAt?.split("T")[0]}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
export default MyQuizz;
