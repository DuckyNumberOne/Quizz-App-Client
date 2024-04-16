import React from "react";
import step1 from "../../../../../public/images/how-to-play/step1.jpg";
import Image from "next/image";

const HowToPlay = () => {
  return (
    <section className="h-[688px] bg-[#1D4645]">
      <div className="container mx-auto relative h-full">
        <h3 className="text-[66px] text-white font-bold pt-[100px]">
          How To Play
        </h3>
        <div className="absolute w-full h-full bottom-[-25px] left-0 ">
          <div className="relative w-full h-full grid gap-x-8 grid-cols-[repeat(auto-fill,minmax(370px,1fr))]">
            {/* Box Step 1  */}
            <div className="relative h-full">
              <div className="bg-white rounded-xl w-[370px] h-[432px] shadow-xl absolute bottom-0 left-0">
                <div className="w-[336px] h-[194px] relative mx-auto pt-6  ">
                  <Image
                    width={336}
                    height={194}
                    loading="lazy"
                    src={step1}
                    alt="Step 1"
                  />
                  <div className="border-solid border-b-2 border-[#EFEFEF] mt-3 mb-7 mx-5" />
                  <h3 className="font-bold text-black text-2xl mb-5">Step 1</h3>
                  <p className="text-[#333333] text-base">
                    Enter the Phone Number and Click Resigiter
                  </p>
                </div>
                <div className="border-black border-1 border-solid w-full" />
              </div>
            </div>
            {/* Box Step 2  */}
            <div className="relative h-full">
              <div className="bg-white rounded-xl w-[370px] h-[432px] shadow-xl absolute bottom-10 left-0">
                <div className="w-[336px] h-[194px] relative mx-auto pt-6  ">
                  <Image
                    width={336}
                    height={194}
                    loading="lazy"
                    src={step1}
                    alt="Step 2"
                  />
                  <div className="border-solid border-b-2 border-[#EFEFEF] mt-3 mb-7 mx-5" />
                  <h3 className="font-bold text-black text-2xl mb-5">Step 2</h3>
                  <p className="text-[#333333] text-base">
                    Enter the Phone Number and Click Resigiter
                  </p>
                </div>
                <div className="border-black border-1 border-solid w-full" />
              </div>
            </div>
            {/* Box Step 3  */}
            <div className="relative h-full">
              <div className="bg-white rounded-xl w-[370px] h-[432px] shadow-xl absolute bottom-20">
                <div className="w-[336px] h-[194px] relative mx-auto pt-6  ">
                  <Image
                    width={336}
                    height={194}
                    loading="lazy"
                    src={step1}
                    alt="Step 3"
                  />
                  <div className="border-solid border-b-2 border-[#EFEFEF] mt-3 mb-7 mx-5" />
                  <h3 className="font-bold text-black text-2xl mb-5">Step 3</h3>
                  <p className="text-[#333333] text-base">
                    Enter the Phone Number and Click Resigiter
                  </p>
                </div>
                <div className="border-black border-1 border-solid w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default HowToPlay;
