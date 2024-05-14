import ButtonDefault from "@/lib/components/common/Button/ButtonDefault";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import DefaulltSlider from "@/lib/components/common/Slider/DefaulltSlider";
import { getListQuizz } from "@/api/quizz";
import { QuizzOption2 } from "@/lib/modal/quizz";
import { useRouter } from "next/router";
import DefaultLoading from "@/lib/components/common/Loading/DefaultLoading";
import DefaultPopupAdmin from "@/lib/components/admin/PopupAdmin/DefaultPopupAdmin";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/state/store";
import { setTurnOnPopup } from "@/lib/state/popup/popupSlice";
import DefaultLoadingPage from "@/lib/components/admin/LoadingPage/DefaultLoadingPage";
import { scrollToTop } from "@/utils/scrollToTop";

const Admin = () => {
  const { push } = useRouter();
  const [data, setData] = useState<QuizzOption2[]>([]);
  const dispatch = useDispatch<AppDispatch>();

  const handleFindFriend = () => {};

  const handleOpenQuizz = (id: string) => {
    scrollToTop("main-content");
    dispatch(setTurnOnPopup("popup_loading_page_admin"));
    setTimeout(() => {
      push(`admin/quizz/${id}`);
    }, 2000);
  };

  useEffect(() => {
    const fetch = async () => {
      const res = await getListQuizz();
      setData(res);
    };
    fetch();
  }, []);

  return (
    <DefaultLoadingPage animation="popup-up">
      <section className="z-1 relative border-lilac-20% bg-purple-faded-2 pt-[90px] pb-8 bg-bts-hero-search-bg">
        <div className="mx-6">
          <div className="mt-2 w-full col-span-12 flex flex-col items-center z-20">
            <h1 className="text-dark-80% font-semibold flex flex-col items-center">
              <span className="text-2xl">Welcome Home 👋</span>
              <span className="text-3xl">What will you do today?</span>
            </h1>
          </div>
          <div className="bg-white h-[400px] mt-10 rounded-2xl shadow-4 relative">
            <p className="text-2xl text-[#AF52DE] text-center pt-8 font-semibold">
              Play quiz together with your friends now!
            </p>

            <div className=" absolute bottom-20 w-full flex items-center justify-center">
              <ButtonDefault
                className="rounded-full text-white border-b-[5px] border-r-[4px] bg-black border-[#6d5ff6] w-2/5 h-14 hover:scale-105 ease-in-out duration-300"
                content="Find friends"
                onClick={handleFindFriend}
              />
            </div>
          </div>
        </div>
      </section>
      {/* Header Slider  */}
      <section className="bg-[#f2f2f2] h-fit px-6" id="welcome">
        {/* Demo Category 1*/}
        <div className="mb-4 pt-10">
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              <Image
                src="/images/admin/star.webp"
                width={30}
                height={30}
                alt="star"
              />
              <h2 className="text-sm md:text-2xl text-dark-2 ml-2 font-semibold">
                Category
              </h2>
            </div>
            <div className="flex gap-3 items-center justify-center px-3 py-1 text-xs font-semibold h-6 base text-lilac hover:text-lilac-light active:text-lilac-dark rounded-full secondary relative min-w-max ml-auto bg-lilac-faded  transition-colors duration-200 ease-in-out">
              <ButtonDefault
                className="text-black text-base"
                content="More"
                onClick={handleFindFriend}
              />
              <Image
                src="/incons/arrow-right.webp"
                width={15}
                height={15}
                alt="Arrow right"
              />
            </div>
          </div>
        </div>
        {/* Box Slider Category 1*/}
        <div className="flex max-w-full relative">
          <DefaulltSlider>
            {data.map((items) => (
              <div
                key={items._id}
                onClick={() => handleOpenQuizz(items._id)}
                className="bg-white quiz-card shadow-md rounded-lg bg-light-3 text-left cursor-pointer hover:shadow-lg max-w-56 md:max-w-72"
              >
                <div className="overflow-hidden rounded-t-lg h-full">
                  <div className="w-56 md:w-72 h-30 md:h-40 flex items-center justify-around">
                    <img
                      src={items.urlThumbnail}
                      alt="Thumbnail"
                      className="w-full h-full bg-cover bg-center"
                    />
                  </div>
                  <div className="px-2.5 pt-2.5 pb-3.5 h-30">
                    <div className="px-2 py-1 bg-[#e2e2e2] w-fit text-xs rounded-md">
                      <span>{items.idCollection.title}</span>
                    </div>
                    <p className="mt-2 mb-4 text-sm md:text-base text-dark-2 font-semibold">
                      {items.title}
                    </p>
                    <div className="flex items-center justify-between text-tn md:text-xs text-dark-4 font-semibold mt-auto">
                      <div className="mr-1.5">
                        {items.question.length} Question •{" "}
                      </div>
                      <div className="mr-1.5 ml-1.5">
                        <p>{items.play} played</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </DefaulltSlider>
        </div>
        {/* Demo Category 1*/}
        <div className="mb-4 pt-10">
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              <Image
                src="/images/admin/star.webp"
                width={30}
                height={30}
                alt="star"
              />
              <h2 className="text-sm md:text-2xl text-dark-2 ml-2 font-semibold">
                Category
              </h2>
            </div>
            <div className="flex gap-3 items-center justify-center px-3 py-1 text-xs font-semibold h-6 base text-lilac hover:text-lilac-light active:text-lilac-dark rounded-full secondary relative min-w-max ml-auto bg-lilac-faded  transition-colors duration-200 ease-in-out">
              <ButtonDefault
                className="text-black text-base"
                content="More"
                onClick={handleFindFriend}
              />
              <Image
                src="/incons/arrow-right.webp"
                width={15}
                height={15}
                alt="Arrow right"
              />
            </div>
          </div>
        </div>
        {/* Box Slider Category 1*/}
        <div className="flex max-w-full relative">
          <DefaulltSlider>
            {data.map((items) => (
              <div
                key={items._id}
                onClick={() => handleOpenQuizz(items._id)}
                className="bg-white quiz-card shadow-md rounded-lg bg-light-3 text-left cursor-pointer hover:shadow-lg max-w-56 md:max-w-72"
              >
                <div className="overflow-hidden rounded-t-lg h-full">
                  <div className="w-56 md:w-72 h-30 md:h-40 flex items-center justify-around">
                    <img
                      src={items.urlThumbnail}
                      alt="Thumbnail"
                      className="w-full h-full bg-cover bg-center"
                    />
                  </div>
                  <div className="px-2.5 pt-2.5 pb-3.5 h-30">
                    <div className="px-2 py-1 bg-[#e2e2e2] w-fit text-xs rounded-md">
                      <span>{items.idCollection.title}</span>
                    </div>
                    <p className="mt-2 mb-4 text-sm md:text-base text-dark-2 font-semibold">
                      {items.title}
                    </p>
                    <div className="flex items-center justify-between text-tn md:text-xs text-dark-4 font-semibold mt-auto">
                      <div className="mr-1.5">15 Slide • </div>
                      <div className="mr-1.5 ml-1.5">
                        <p>104 lần chơi</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </DefaulltSlider>
        </div>
        {/* Demo Category 1*/}
        <div className="mb-4 pt-10">
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              <Image
                src="/images/admin/star.webp"
                width={30}
                height={30}
                alt="star"
              />
              <h2 className="text-sm md:text-2xl text-dark-2 ml-2 font-semibold">
                Category
              </h2>
            </div>
            <div className="flex gap-3 items-center justify-center px-3 py-1 text-xs font-semibold h-6 base text-lilac hover:text-lilac-light active:text-lilac-dark rounded-full secondary relative min-w-max ml-auto bg-lilac-faded  transition-colors duration-200 ease-in-out">
              <ButtonDefault
                className="text-black text-base"
                content="More"
                onClick={handleFindFriend}
              />
              <Image
                src="/incons/arrow-right.webp"
                width={15}
                height={15}
                alt="Arrow right"
              />
            </div>
          </div>
        </div>
        {/* Box Slider Category 1*/}
        <div className="flex max-w-full relative">
          <DefaulltSlider>
            {data.map((items) => (
              <div
                key={items._id}
                onClick={() => handleOpenQuizz(items._id)}
                className="bg-white quiz-card shadow-md rounded-lg bg-light-3 text-left cursor-pointer hover:shadow-lg max-w-56 md:max-w-72"
              >
                <div className="overflow-hidden rounded-t-lg h-full">
                  <div className="w-56 md:w-72 h-30 md:h-40 flex items-center justify-around">
                    <img
                      src={items.urlThumbnail}
                      alt="Thumbnail"
                      className="w-full h-full bg-cover bg-center"
                    />
                  </div>
                  <div className="px-2.5 pt-2.5 pb-3.5 h-30">
                    <div className="px-2 py-1 bg-[#e2e2e2] w-fit text-xs rounded-md">
                      <span>{items.idCollection.title}</span>
                    </div>
                    <p className="mt-2 mb-4 text-sm md:text-base text-dark-2 font-semibold">
                      {items.title}
                    </p>
                    <div className="flex items-center justify-between text-tn md:text-xs text-dark-4 font-semibold mt-auto">
                      <div className="mr-1.5">15 Slide • </div>
                      <div className="mr-1.5 ml-1.5">
                        <p>104 lần chơi</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </DefaulltSlider>
        </div>
      </section>
    </DefaultLoadingPage>
  );
};
export default Admin;
