"use client";
import React, { useEffect, useState } from "react";
import Login from "@/lib/components/home-page/Login";
import { useRouter } from "next/router";
import useLocalStorage from "@/lib/hook/useLocalStorage";
import PopupDefault from "../common/Popup/PopupWelcome";
import Image from "next/image";
import ButtonDefault from "../common/Button/ButtonDefault";
import { typeAccount } from "@/lib/config/typeAccount";

const HomePage = ({ data }: any) => {
  const { push } = useRouter();
  const [token, setToken] = useLocalStorage("token", "");
  const [mode, setMode] = useState("Start");

  useEffect(() => {
    if (token != "") {
      push("/admin");
    }
  }, [token]);

  return (
    <>
      {/* Start  */}
      {mode === "Start" && (
        <PopupDefault>
          <h3 className="text-[30px] font-bold">
            Everything is here to enjoy quiz!
          </h3>
          <p className="text-base font-semibold">
            Quiz as a group or individually! Expand your circle !
          </p>
          <div className="mt-10 w-full flex justify-center items-center">
            <Image
              src="/images/banner-start-1.png"
              width={420}
              height={420}
              alt="Banner"
            />
          </div>
          <ButtonDefault
            className={`font-bold mb-5 w-full p-5 rounded-full text-black border-b-[5px] border-r-[4px] text-base ease-in-out duration-300 bg-[#f6f5fa] border-[#b5b2c1]`}
            content={"I have a account"}
            onClick={() => setMode("Login")}
          />
          <ButtonDefault
            className={`font-bold w-full p-5 rounded-full text-white border-b-[5px] border-r-[4px] text-base ease-in-out duration-300 bg-[#000000] border-[#6d5ff6]`}
            content={"Get started"}
            onClick={() => setMode("Register")}
          />
        </PopupDefault>
      )}
      {mode === "Register" && (
        <PopupDefault>
          <div className="relative h-full">
            <div className="mb-3 flex justify-between items-center">
              <button onClick={() => setMode("Start")}>
                <Image
                  src="/incons/back-arrow.png"
                  alt="Back Arrow"
                  width={30}
                  height={30}
                />
              </button>
              <div className="w-3/6 bg-[#e5e5e5] h-4 rounded-xl">
                <div
                  className={`bg-yellow-300 h-full rounded-xl w-1/5 ease-in-out duration-300`}
                ></div>
              </div>
              <div></div>
            </div>
            <h3 className="text-[30px] font-bold">
              What type of account will you open?
            </h3>
            <p className="text-base font-semibold">
              You can skip it if you're not sure.
            </p>
            <div className="space-y-3 my-10">
              {typeAccount.map((ac, index) => (
                <div
                  key={index}
                  className="bg-[#f6f5fa] flex items-center p-4 gap-4 rounded-full hover:bg-slate-100 cursor-pointer hover:scale-105 ease-in-out duration-200"
                >
                  <div
                    className="w-10 h-10 rounded-full p-2"
                    style={{ backgroundColor: ac.color }}
                  >
                    <img src={ac.icon} alt="Icon" width={40} height={40} />
                  </div>
                  <p className="text-xl font-medium">{ac.title}</p>
                </div>
              ))}
            </div>
            <ButtonDefault
              className={`absolute font-bold w-full  p-5 rounded-full text-white border-b-[5px] border-r-[4px] text-base ease-in-out duration-300 bg-[#000000] border-[#6d5ff6]`}
              content={"Continue"}
              onClick={() => setMode("Register")}
            />
          </div>
        </PopupDefault>
      )}
      {/* Login  */}
      {mode === "Login" && <Login />}
    </>
  );
};
export default HomePage;
