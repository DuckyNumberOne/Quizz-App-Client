import React from "react";
import step1 from "@images/how-to-play/step1.jpg";
import step2 from "@images/how-to-play/step2.png";
import step3 from "@images/how-to-play/step3.png";
import step4 from "@images/how-to-play/step4.png";
import step5 from "@images/how-to-play/step5.png";
import step6 from "@images/how-to-play/step6.png";

import Image from "next/image";

const HowToPlay = () => {
  return (
    <>
      {/* Section 1 */}
      <section className="h-[688px] bg-[#1D4645]">
        <div className="2xl:max-w-screen-3xl xl:max-w-screen-xl mx-auto relative h-full">
          <h3 className="text-[66px] text-white font-bold pt-[100px]">
            How To Play
          </h3>
          <div className="absolute w-full h-full bottom-[-25px] left-0 ">
            <div className="relative w-full h-full grid gap-x-8 grid-cols-12">
              {/* Box Step 1  */}
              <div className="relative h-full w-full col-span-4">
                <div className="bg-white rounded-xl w-full 2xl:h-[500px] xl:h-[432px] shadow-xl absolute bottom-0 left-1/2 transform -translate-x-1/2">
                  <div className="w-[336px] h-[194px] relative mx-auto pt-6  ">
                    <Image
                      width={336}
                      height={194}
                      loading="lazy"
                      src={step1}
                      alt="Step 1"
                    />
                    <div className="border-solid border-b-2 border-[#EFEFEF] mt-3 mb-7 mx-5" />
                    <h3 className="font-bold text-black text-2xl mb-5">
                      Step 1
                    </h3>
                    <p className="text-[#333333] text-base">
                      Enter the Phone Number and Click Resigiter
                    </p>
                  </div>
                  <div className="border-black border-1 border-solid w-full" />
                </div>
              </div>
              {/* Box Step 2  */}
              <div className="relative h-full w-full col-span-4">
                <div className="bg-white rounded-xl w-full 2xl:h-[500px] xl:h-[432px] shadow-xl absolute bottom-20 left-1/2 transform -translate-x-1/2">
                  <div className="w-[336px] h-[194px] relative mx-auto pt-6  ">
                    <Image
                      width={336}
                      height={194}
                      loading="lazy"
                      src={step2}
                      alt="Step 2"
                    />
                    <div className="border-solid border-b-2 border-[#EFEFEF] mt-3 mb-7 mx-5" />
                    <h3 className="font-bold text-black text-2xl mb-5">
                      Step 2
                    </h3>
                    <p className="text-[#333333] text-base">
                      Enter the Verification Code and click Verify.
                    </p>
                  </div>
                  <div className="border-black border-1 border-solid w-full" />
                </div>
              </div>
              {/* Box Step 3  */}
              <div className="relative h-full w-full col-span-4">
                <div className="bg-white rounded-xl w-full 2xl:h-[500px] xl:h-[432px] shadow-xl absolute bottom-40 left-1/2 transform -translate-x-1/2">
                  <div className="w-[336px] h-[194px] relative mx-auto pt-6  ">
                    <Image
                      width={336}
                      height={194}
                      loading="lazy"
                      src={step3}
                      alt="Step 3"
                    />
                    <div className="border-solid border-b-2 border-[#EFEFEF] mt-3 mb-7 mx-5" />
                    <h3 className="font-bold text-black text-2xl mb-5">
                      Step 3
                    </h3>
                    <p className="text-[#333333] text-base">
                      Enter your Info and click Play Quiz .
                    </p>
                  </div>
                  <div className="border-black border-1 border-solid w-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Section 2 */}
      <section className="h-[580px] bg-white">
        <div className="2xl:max-w-screen-3xl xl:max-w-screen-xl mx-auto relative h-full">
          <div className="absolute w-full h-full top-10 left-0 ">
            <div className="relative w-full h-full grid gap-x-8 grid-cols-12">
              {/* Box Step 1  */}
              <div className="relative h-full w-full col-span-4">
                <div className="bg-white rounded-xl w-full 2xl:h-[500px] xl:h-[432px] shadow-xl absolute bottom-0 left-1/2 transform -translate-x-1/2">
                  <div className="w-[336px] h-[194px] relative mx-auto pt-6  ">
                    <Image
                      width={336}
                      height={194}
                      loading="lazy"
                      src={step4}
                      alt="Step 4"
                    />
                    <div className="border-solid border-b-2 border-[#EFEFEF] mt-3 mb-7 mx-5" />
                    <h3 className="font-bold text-black text-2xl mb-5">
                      Step 4
                    </h3>
                    <p className="text-[#333333] text-base">
                      Click on the subject
                    </p>
                  </div>
                  <div className="border-black border-1 border-solid w-full" />
                </div>
              </div>
              {/* Box Step 2  */}
              <div className="relative h-full w-full col-span-4">
                <div className="bg-white rounded-xl w-full 2xl:h-[500px] xl:h-[432px] shadow-xl absolute bottom-20 left-1/2 transform -translate-x-1/2">
                  <div className="w-[336px] h-[194px] relative mx-auto pt-6  ">
                    <Image
                      width={336}
                      height={194}
                      loading="lazy"
                      src={step5}
                      alt="Step 5"
                    />
                    <div className="border-solid border-b-2 border-[#EFEFEF] mt-3 mb-7 mx-5" />
                    <h3 className="font-bold text-black text-2xl mb-5">
                      Step 5
                    </h3>
                    <p className="text-[#333333] text-base">
                      A question will have four options
                    </p>
                  </div>
                  <div className="border-black border-1 border-solid w-full" />
                </div>
              </div>
              {/* Box Step 3  */}
              <div className="relative h-full w-full col-span-4">
                <div className="bg-white rounded-xl w-full 2xl:h-[500px] xl:h-[432px] shadow-xl absolute bottom-40 left-1/2 transform -translate-x-1/2">
                  <div className="w-[336px] h-[194px] relative mx-auto pt-6  ">
                    <Image
                      width={336}
                      height={194}
                      loading="lazy"
                      src={step6}
                      alt="Step 6"
                    />
                    <div className="border-solid border-b-2 border-[#EFEFEF] mt-3 mb-7 mx-5" />
                    <h3 className="font-bold text-black text-2xl mb-5">
                      Step 6
                    </h3>
                    <p className="text-[#333333] text-base">
                      Click right Option.
                    </p>
                  </div>
                  <div className="border-black border-1 border-solid w-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default HowToPlay;
