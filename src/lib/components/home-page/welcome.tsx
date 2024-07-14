import React, { useEffect, useState } from "react";
import Image from "next/image";
import ButtonDefault from "../common/buttons/buttonDefault";
import PopupDefault from "@lib/components/common/popups/popupWelcome";

const Welcome = () => {
  return (
    <PopupDefault>
      <h3 className="text-[30px] font-bold">
        Everythink is here to enjoy quiz !
      </h3>
      <p className="text-[18px] mt-2 font-bold">
        Quiz as a group or individually! Expand your circle!
      </p>
      <Image
        src="/images/welcome-popup/welcome-1.png"
        width={500}
        height={500}
        alt="welcome"
      />
      <div className="flex flex-col gap-3 mt-5">
        <ButtonDefault
          className="w-full bg-[#f6f5fa] md:p-5 p-2 rounded-full text-black border-b-[5px] border-r-[4px] border-[#b5b2c1] font-normal md:text-base text-sm hover:font-medium ease-in-out duration-300 "
          content="I have an account"
        />
        <ButtonDefault
          className="w-full bg-[#000000] md:p-5 p-2 rounded-full text-white border-b-[5px] border-r-[4px] border-[#6d5ff6] font-normal md:text-base text-sm hover:font-medium ease-in-out duration-300 "
          content="Get started"
        />
      </div>
    </PopupDefault>
  );
};
export default Welcome;
