import React from "react";
import Image from "next/image";

const QuizCategories = () => {
  return (
    <section className="2xl:max-w-screen-3xl xl:max-w-screen-xl mx-auto mt-[154px] mb-[298px]">
      {/* Title  */}
      <article className="flex justify-between items-center mb-[88px]">
        <p className="text-tiber text-[64px] font-bold w-[519px] leading-[68px]">
          Explore Our Quiz Categories
        </p>
        <button className="border-tiber border text-tiber w-[170px] h-12 font-bold text-sm ">
          Explore All
        </button>
      </article>
      {/* Categories */}
      <article className="w-full flex gap-[30px] items-start">
        {/* Box LEFT  */}
        <div className="w-[38%]">
          <div className="p-8 bg-seashell shadow-md w-full h-[352px]">
            <div className="bg-white w-fit h-fit p-3 rounded-full">
              <Image
                width={76}
                height={76}
                src="/images/math.png"
                alt="BCS Model Test"
                className=" object-cover"
                loading="lazy"
              />
            </div>
            <div className="mt-[18px]">
              <p className="font-bold text-2xl">Math</p>
              <p className="text-base text-[#999999] mt-5">
                Sky was cloudless and of a deep dark blue spectacle before us
                was indeed
              </p>
            </div>
          </div>
          <div className="mt-8 flex w-full h-[352px]">
            <div className="w-1/2" />
            <div className="p-8 bg-white shadow-md w-1/2 h-full">
              <div className="bg-seashell w-fit h-fit p-3 rounded-full">
                <Image
                  width={76}
                  height={76}
                  src="/images/science.png"
                  alt="BCS Model Test"
                  className=" object-cover"
                  loading="lazy"
                />
              </div>
              <div className="mt-[18px]">
                <p className="font-bold text-2xl">Science</p>
                <p className="text-base text-[#999999] mt-5">
                  Unorthographic life One day however a small line of blind
                  text.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Box RIGHT  */}
        <div className="w-[62%] relative">
          <div className="absolute top-26 left-0 w-full">
            <div className="p-8 bg-seashell shadow-md w-1/2 h-[352px]">
              <div className="bg-white w-fit h-fit p-3 rounded-full">
                <Image
                  width={76}
                  height={76}
                  src="/images/english.png"
                  alt="BCS Model Test"
                  className=" object-cover"
                  loading="lazy"
                />
              </div>
              <div className="mt-[18px]">
                <p className="font-bold text-2xl">English</p>
                <p className="text-base text-[#999999] mt-5">
                  Even the all-powerful Pointing has no control about the blind
                  texts.
                </p>
              </div>
            </div>
            <div className="flex mt-8 gap-[30px]">
              <div className="p-8 bg-seashell shadow-md h-[320px] w-1/3">
                <div className="bg-white w-fit h-fit p-3 rounded-full">
                  <Image
                    width={76}
                    height={76}
                    src="/images/bangla.png"
                    alt="BCS Model Test"
                    className=" object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="mt-[18px]">
                  <p className="font-bold text-2xl">Bangla</p>
                  <p className="text-base text-[#999999] mt-5">
                    However a small line of blind text by the name.
                  </p>
                </div>
              </div>
              <div className="p-8 bg-white shadow-md h-[352px] w-2/3">
                <div className="bg-seashell w-fit h-fit p-3 rounded-full">
                  <Image
                    width={76}
                    height={76}
                    src="/images/general-knowledge.png"
                    alt="BCS Model Test"
                    className=" object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="mt-[18px]">
                  <p className="font-bold text-2xl">General Knowledge</p>
                  <p className="text-base text-[#999999] mt-5 ">
                    Text by the name of Lorem Ipsum decided to leave for the far
                    World of Grammar.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
};
export default QuizCategories;
