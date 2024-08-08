import React from "react";
import Image from "next/image";

const WinnerPlayer = () => {
  return (
    <section className="bg-[#1d4645] pb-19 pt-17">
      <article className="2xl:max-w-screen-3xl xl:max-w-screen-xl mx-auto ">
        <div className="flex">
          <div className="w-1/2">
            <p className="text-white text-[66px] font-bold w-[239px] leading-[70px] mt-11">
              Winner Player
            </p>
            <p className="text-[#D2D2D2] text-xl w-[400px] mt-[42px]">
              Orci varius natoque penatibus et magnis dis parturient montes,
              nascetur ridiculus mus. Etiam placerat tortor commodo lectus
              laoreet venenatis.
            </p>
          </div>
          <div className="w-1/2">
            <Image
              width={688}
              height={748.85}
              src="/images/winner-player.png"
              alt="BCS Model Test"
              className=" object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </article>
      <article className="2xl:max-w-screen-3xl xl:max-w-screen-xl mx-auto pt-[70px]">
        <div className="flex pb-17">
          <div className="w-1/2">
            <p className="text-white text-[66px] font-bold w-[395px] leading-[70px] mt-11">
              Check Latest Articles
            </p>
          </div>
        </div>
        <div className="flex gap-[30px]">
          <div className="w-1/3">
            <Image
              src="/images/all-powerful.png"
              alt="all power full"
              width={370}
              height={273}
              className="w-full"
            />
            <p className="text-white font-bold text-2xl mt-9">
              Even the all-powerful Pointing has no control about
            </p>
            <p className="text-base text-[#FFFFFF] mt-6">16 Oct 2020</p>
          </div>
          <div className="w-1/3">
            <Image
              src="/images/unorthographic.png"
              alt="all power full"
              width={370}
              height={273}
              className="w-full"
            />
            <p className="text-white font-bold text-2xl mt-9">
              Even the all-powerful Pointing has no control about
            </p>
            <p className="text-base text-[#FFFFFF] mt-6">16 Oct 2020</p>
          </div>{" "}
          <div className="w-1/3">
            <Image
              src="/images/decided.png"
              alt="all power full"
              width={370}
              height={273}
              className="w-full"
            />
            <p className="text-white font-bold text-2xl mt-9">
              Even the all-powerful Pointing has no control about
            </p>
            <p className="text-base text-[#FFFFFF] mt-6">16 Oct 2020</p>
          </div>
        </div>
      </article>
    </section>
  );
};
export default WinnerPlayer;
