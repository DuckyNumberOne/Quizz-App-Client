import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <>
      <footer className="bg-[#1d4645] h-[464px] pt-22">
        <div className="grid grid-cols-4 2xl:max-w-screen-3xl xl:max-w-screen-xl mx-auto pb-[70px] border-b border-[#245856] ">
          {/* Logo  */}
          <div>
            <Image
              src="/images/logo-quizz.png"
              width={240}
              height={40}
              alt="Logo"
            />
          </div>
          {/* Menu  */}
          <ul>
            <li className="uppercase text-[#E8C5B0] text-lg tracking-[5px]">
              Menu
            </li>
            <li className="text-base font-normal text-[#FFFFFF] mt-[18px]">
              About
            </li>
            <li className="text-base font-normal text-[#FFFFFF] mt-2">
              Services
            </li>
            <li className="text-base font-normal text-[#FFFFFF] mt-2">Blog</li>
            <li className="text-base font-normal text-[#FFFFFF] mt-2">
              Contact
            </li>
          </ul>
          {/* Service  */}
          <ul>
            <li className="uppercase text-[#E8C5B0] text-lg tracking-[5px]">
              Service
            </li>
            <li className="text-base font-normal text-[#FFFFFF] mt-[18px]">
              Planning
            </li>
            <li className="text-base font-normal text-[#FFFFFF] mt-2">
              Managment
            </li>
            <li className="text-base font-normal text-[#FFFFFF] mt-2">
              Strategy
            </li>
            <li className="text-base font-normal text-[#FFFFFF] mt-2">
              Market
            </li>
          </ul>
          {/* Social network */}
          <div className="w-[160px] h-12 flex justify-between">
            <div className="bg-[#E8C5B0] p-4 rounded-full flex justify-center items-center w-12 h-12">
              <Image
                src="/images/facebook.png"
                alt="facebook-icon"
                width={9.33}
                height={16}
              />
            </div>
            <div className="bg-[#E8C5B0] p-4 rounded-full flex justify-center items-center w-12 h-12">
              <Image
                src="/images/twitter.png"
                alt="twitter-icon"
                width={16}
                height={13}
              />
            </div>
            <div className="bg-[#E8C5B0] p-4 rounded-full flex justify-center items-center w-12 h-12">
              <Image
                src="/images/instagram.png"
                alt="instagram-icon"
                width={16}
                height={16}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between 2xl:max-w-screen-3xl xl:max-w-screen-xl mx-auto pt-10 text-[#FFFFFF] text-base">
          <p>Copyright © 2022 Quizduk. All Rights Reserved.</p>
          <div className="flex gap-16">
            <p>Privacy Policy</p>
            <p>Terms of Use</p>
          </div>
        </div>
      </footer>
    </>
  );
};
export default Footer;
