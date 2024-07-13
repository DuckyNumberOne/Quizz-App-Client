import ChartTwo from "@/lib/components/common/charts/chartTwo";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { getItemQuizzByUser, getListQuizz } from "@/api/quizz.api";
import { getQuestionPercentagesByQuizzId } from "@/api/quizzResult.api";
import ButtonDefault from "@/lib/components/common/buttons/buttonDefault";
import Link from "next/link";
import { debounce } from "@/utils/debounce";
import { Anwsers } from "@/lib/interface/question.interface";

interface SeriesData {
  name: string;
  data: number[];
}

interface Question {
  title: string;
  imgQuestion: string;
  time: number;
  point: number;
  anwsers: Anwsers[];
  _id: string;
}

interface Collection {
  _id: string;
  title: string;
}

interface Quizz {
  _id: string;
  idUser: string;
  urlThumbnail: string;
  title: string;
  description: string;
  idCollection: Collection;
  visibility: string;
  keyword: string;
  play: number;
  share: number;
  question: Question[];
  createdAt: string;
  updatedAt: string;
  __v: number;
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
  const [filteredDataQuizz, setFilteredDataQuizz] = useState<Quizz[]>([]);
  const [titleQuizz, setTitleQuizz] = useState("");
  const [analyticalDataQuizz, setAnalyticalDataQuizz] =
    useState<SeriesData[]>(analyticalDataQuizzs);
  const [dataQuizz, setDataQuizz] = useState<Quizz[]>([]);

  const filterDataQuizz = () => {
    const filteredQuizz = dataQuizz.filter((qz) =>
      qz.title.toLowerCase().includes(titleQuizz.toLowerCase())
    );
    setFilteredDataQuizz(filteredQuizz);
  };

  const fetchDataQuiz = async () => {
    const res = await getItemQuizzByUser(String(query.id));
    setDataQuizz(res);
  };

  const handleClickQuizz = (id: string) => {
    setIdQuizz(id);
  };

  const handleClickQuizzDetails = (mode: string) => {
    switch (mode) {
      case "details":
        push(`/admin/quizz/${idQuizz}`);
        break;
      case "edit":
        push(`/admin/quizz/${idQuizz}`);
        break;
      case "delete":
        push(`/admin/quizz/${idQuizz}`);
        break;
      default:
        break;
    }
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

  useEffect(() => {
    filterDataQuizz();
  }, [titleQuizz, dataQuizz]);
  return (
    <div
      className={`bg-bts-hero-2 bg-no-repeat bg-right bg-cover h-screen w-full relative`}
    >
      <div className="bg-black-shadow-2 absolute inset-0 w-full h-screen">
        <section className=" mt-4 rounded-lg h-[820px] container mx-auto grid grid-cols-12 b gap-5">
          {/* List Quizz  */}
          <div
            className={`col-span-7 rounded-sm border border-stroke bg-white p-5 ${
              idQuizz === "" ? "fade-in-05s col-start-4" : "slide-left"
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
            <div className="space-y-4 mt-5 h-[730px] overflow-y-scroll p-5">
              {filteredDataQuizz.length > 0 ? (
                filteredDataQuizz.map((qz, index) => (
                  <div
                    key={index}
                    className={`border rounded-lg grid grid-cols-8 gap-2 cursor-pointer hover:bg-whiter ${
                      idQuizz === qz._id &&
                      "scale-105 shadow-4 shadow-purple-600 ease-in-out duration-300"
                    }`}
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
                            {qz.play} <span className="">played</span>
                          </p>
                        </div>
                        <div className="flex justify-start gap-5 items-center border p-1 bg-white">
                          <Image
                            src="/incons/add-event.png"
                            width={30}
                            height={30}
                            alt="add-even"
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
                            alt="categories"
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
                            alt="conversation"
                          />
                          <p className="font-medium text-base text-start ">
                            {qz.question.length} question
                          </p>
                        </div>
                        <div className="flex justify-start gap-5 items-center border p-1 bg-white">
                          <Image
                            src="/incons/update.png"
                            width={30}
                            height={30}
                            alt="update"
                          />
                          <p className="font-medium text-base text-start ">
                            {qz.updatedAt?.split("T")[0]}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <>
                  <p className="text-2xl">
                    You don't have any quizzes yet ... !{" "}
                    <Link
                      href="/admin/quizz/create"
                      className="font-semibold text-blue-600"
                    >
                      Create quizz
                    </Link>
                  </p>
                </>
              )}
            </div>
          </div>
          {/* Analytics */}
          <div className="col-span-5">
            <div className={`${idQuizz !== "" ? "fade-in-1s" : "hidden"}`}>
              <div className="rounded-sm border border-stroke bg-white p-5 w-full h-fit mb-4 flex justify-between items-center">
                <ButtonDefault
                  className="px-4 py-2 bg-[#8854c0] font-medium text-white rounded-2xl shadow-4 shadow-graydark"
                  content="Detail quizz"
                  onClick={() => handleClickQuizzDetails("details")}
                />
                <ButtonDefault
                  className="px-4 py-2 bg-[#00a3e2] font-medium text-white rounded-2xl shadow-4 shadow-graydark"
                  content="Edit quizz"
                  onClick={() => handleClickQuizzDetails("edit")}
                />
                <ButtonDefault
                  className="px-4 py-2 bg-rose-600 font-medium text-white rounded-2xl shadow-4 shadow-graydark"
                  content="Delete quizz"
                  onClick={() => handleClickQuizzDetails("delete")}
                />
              </div>
              {/* <ChartThree /> */}
              {analyticalDataQuizz.length > 0 && (
                <ChartTwo
                  data={analyticalDataQuizz}
                  title="Questionnaire Results"
                />
              )}
            </div>

            {/* <div className="rounded-sm border border-stroke bg-white p-5 w-full h-[400px] mt-4">
            
            </div> */}
          </div>
        </section>
      </div>
    </div>
  );
};
export default MyQuizz;
