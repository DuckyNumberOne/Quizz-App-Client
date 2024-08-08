import React from "react";
import Image from "next/image";

const Contact = () => {
  return (
    <section>
      <div className="h-[746px] w-full bg-white py-18 relative">
        {/* Background Contact Top  */}
        <div className="absolute right-0 top-0 w-full h-full 2xl:px-40 px-22 py-18">
          <Image
            src="/images/backgroudContactTop.png"
            width={1235.84}
            height={596.69}
            alt="Contact backgroud"
            className="w-full h-full object-fill"
          />
        </div>
        {/* Text Contact Top  */}
        <div className="w-full h-full mt-29">
          <p className="text-lg text-center text-[#1D4645] uppercase">
            Contact Us
          </p>
          <p className="mt-3 text-[66px] font-bold text-center text-[#1D4645] leading-[66px]">
            Get In Touch
          </p>
          <div className="flex justify-center">
            <p className="mt-9 text-2xl w-[470px] text-center text-[#5F5F5F] font-normal">
              Lorem Ipsum decided to leave for the far World of Grammar
            </p>
          </div>
        </div>
        {/* Box Contact  */}
        <div className=" absolute top-[440px] w-[630px] h-[592px] bg-white shadow-lg left-1/2 transform -translate-x-1/2">
          <form action="#" className="pt-21 pb-20 px-33 space-y-5">
            <div>
              <label htmlFor="name" className="text-black text-xs font-bold">
                NAME
              </label>
              <input
                className="mt-3 h-11 p-2 w-full border-[#dadada] border"
                type="text"
                id="name"
                name="name"
              />
            </div>
            <div>
              <label htmlFor="email" className="text-black text-xs font-bold">
                EMAIL
              </label>
              <input
                className="mt-3 h-11 p-2 w-full border-[#dadada] border"
                type="text"
                id="email"
                name="name"
              />
            </div>
            <div>
              <label htmlFor="message" className="text-black text-xs font-bold">
                MESSAGE
              </label>
              <textarea
                className="mt-3 p-2 w-full border-[#dadada] border h-[120px]"
                id="message"
                name="name"
              />
            </div>
            <div className="flex justify-center items-center pt-3">
              <button className="px-[58px] py-4 text-sm font-bold bg-[#1D4645] text-white rounded-md">
                SUBMIT
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* Background Contact Bottom  */}
      <div className="pt-17 pb-11 bg-[#1d4645] h-[432px] 2xl:px-40 px-22 ">
        <Image
          src="/images/backgroudContactBottom.png"
          width={1235.84}
          height={596.69}
          alt="Contact backgroud"
          className="w-full h-full"
        />
      </div>
    </section>
  );
};

export default Contact;
