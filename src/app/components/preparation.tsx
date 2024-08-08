import React from "react";
import Image from "next/image";
const Preparation = () => {
  return (
    <section className="2xl:max-w-screen-3xl xl:max-w-screen-xl mx-auto mt-[167px]">
      {/* Title  */}
      <article className="flex justify-between items-center mb-12">
        <p className="text-tiber text-[64px] font-bold w-[519px] leading-[68px]">
          Lets Sharp Your Preparation
        </p>
        <button className="border-tiber border text-tiber w-[170px] h-12 font-bold text-sm ">
          Explore All
        </button>
      </article>
      <article className="relative h-[17px]">
        <p className="text-sm font-bold absolute top-0 left-20 mb-2">
          LET&apos;s START !
        </p>
      </article>
      {/* BCS Model Test Top */}
      <article className="h-[416px] flex mb-8 w-full gap-[30px]">
        <div className="flex w-2/3">
          <div className="bg-tiber flex px-[21px] py-12 w-[58%]">
            <div>
              <p className="text-white text-[40px] mb-6 font-bold">
                BCS Model Test
              </p>
              <p className="text-[#D2D2D2] text-xl leading-10 tracking-widest">
                Orci varius natoque penatibus et magnis dis parturient montes,
                nascetur ridiculus mus. Etiam placerat tortor commodo lectus
                laoreet venenatis.
              </p>
            </div>
          </div>
          <div className="bg-white w-[42%]">
            <Image
              width={311}
              height={417}
              src="/images/rectangle.png"
              alt="BCS Model Test"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
        <div className="bg-seashell w-1/3 p-12 relative">
          <div className="flex justify-end">
            <Image
              width={206}
              height={206}
              src="/images/primary_exam.png"
              className=""
              alt="Primary Exam"
              loading="lazy"
            />
          </div>
          <p className="mt-[51px] text-tiber text-[40px] font-bold text-end">
            Primary Exam
          </p>
        </div>
      </article>
      {/* BCS Model Test Bottom */}
      <div className="h-[416px] flex gap-[30px] w-full">
        <div className="bg-tiber w-1/3 p-12 relative">
          <div className="flex justify-end">
            <Image
              width={206}
              height={206}
              src="/images/bank_exam.png"
              alt="Bank Exam"
              loading="lazy"
            />
          </div>
          <p className="mt-[51px] text-white text-[40px] font-bold text-start">
            Bank Exam
          </p>
        </div>
        <div className="bg-seashell w-1/3 p-12 relative">
          <div className="flex justify-end">
            <Image
              width={206}
              height={206}
              src="/images/nsi_exam.png"
              alt="NSI Exam"
              loading="lazy"
            />
          </div>
          <p className="mt-[51px] text-tiber text-[40px] font-bold text-start">
            NSI Exam
          </p>
        </div>
        <div className="bg-tiber w-1/3 p-12 relative">
          <div className="flex justify-end">
            <Image
              width={206}
              height={206}
              src="/images/railway_exam.png"
              alt="Railway Exam"
              loading="lazy"
            />
          </div>
          <p className="mt-[51px] text-white text-[40px] font-bold text-end">
            Railway Exam
          </p>
        </div>
      </div>
    </section>
  );
};
export default Preparation;
