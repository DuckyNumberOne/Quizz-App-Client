"use client";
import React, { useEffect, useState } from "react";
import Login from "./login/index";
import { useRouter } from "next/router";
import useLocalStorage from "@lib/hook/useLocalStorage";
import Image from "next/image";
import ButtonDefault from "../common/button/buttonDefault";
import { typeAccount } from "@lib/config/typeAccount";
import Form from "../common/form/defaultForm";
import Select from "../common/select/defaultSelect";
import Input from "../common/input/defaultInput";
import countries from "@lib/config/countries";
import { verifyLogin } from "@/api/auth";
import { checkEmail, postUser } from "@/api/user";
import { useForm } from "react-hook-form";
import PopupDefault from "../common/popup/PopupWelcome";

interface UserInfo {
  fullName: string;
  dateBirday: string;
  phoneNumber: number;
  username: string;
  email: string;
  password: string;
  country: string;
}

interface Auth {
  email: string;
  password: string;
}

const HomePage = ({ data }: any) => {
  const { push } = useRouter();
  const [token, setToken] = useLocalStorage("token", "");
  const [inforUser, setInforUser] = useLocalStorage("user", "");
  const [mode, setMode] = useState("Start");
  const [step, setStep] = useState(1);
  const [typeAccountId, setTypeAccountId] = useState("");
  const [dataAccount, setDataAccount] = useState<UserInfo>();
  const [error, setError] = useState("");

  const arr = countries.map((items) => ({
    title: items.name,
    value: items.name,
  }));

  useEffect(() => {
    if (token != "") {
      push("/admin");
    }
  }, [token]);

  const handleSubmitForm = async (data: UserInfo) => {
    const checkExisEmail = await checkEmail(data);
    if (checkExisEmail === true) {
      // setError("This email is already registered");
      alert("This email is already registered");
    } else {
      setDataAccount(data);
      setStep((step) => step + 1);
    }
  };

  const handleContinue = async () => {
    switch (step) {
      case 1:
        if (typeAccountId !== "") {
          setStep((step) => step + 1);
        } else {
          alert("Please select an account type !");
        }
        break;
      case 3:
        if (typeAccountId !== "" && dataAccount) {
          const account = {
            ...dataAccount,
            typeAccount: typeAccountId,
            phoneNumber: String(dataAccount.phoneNumber),
          };
          try {
            const res = await postUser(account);
            if (res) {
              setTimeout(() => {
                push("/");
                setMode("Login");
              }, 1000);
            }
          } catch (error) {
            console.error(error);
          }
        }
        break;
    }
  };

  const handleChoiceTypeAccount = (value: string) => {
    setTypeAccountId(value);
  };

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
            {/* Choise type account  */}
            {/* Step 1  */}
            {step === 1 && (
              <div>
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
                      className={`bg-yellow-300 h-full rounded-xl /3 ease-in-out duration-300 fade-in-05s`}
                      style={{ width: `${1 * 33.33}%` }}
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
                      key={ac.id}
                      className={`${
                        ac.id === typeAccountId
                          ? `bg-[#ffcc00] scale-105 shadow-xl `
                          : `bg-[#f6f5fa] duration-200 hover:bg-slate-100`
                      } flex items-center p-4 gap-4 rounded-full  cursor-pointer hover:scale-105 ease-in-out `}
                      onClick={() => handleChoiceTypeAccount(ac.id)}
                    >
                      <div
                        className="w-10 h-10 rounded-full p-2 border-2 border-white"
                        style={{ backgroundColor: ac.color }}
                      >
                        <Image
                          src={ac.icon}
                          alt="Icon"
                          width={40}
                          height={40}
                        />
                      </div>
                      <p className={`text-xl font-medium`}>{ac.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* Step 2  */}
            {step === 2 && (
              <div>
                <div className="mb-3 flex justify-between items-center">
                  <button onClick={() => setStep(1)}>
                    <Image
                      src="/incons/back-arrow.png"
                      alt="Back Arrow"
                      width={30}
                      height={30}
                    />
                  </button>
                  <div className="w-3/6 bg-[#e5e5e5] h-4 rounded-xl">
                    <div
                      className={`bg-yellow-300 h-full rounded-xl w-${step}/3 ease-in-out duration-300 fade-in-05s`}
                    ></div>
                  </div>
                  <div></div>
                </div>
                <h3 className="text-[30px] font-bold">Create an account</h3>
                <p className="text-base font-semibold">
                  Please complere your profile.
                </p>
                <div className="space-y-3 mt-2">
                  <Form
                    classForm="mt-2"
                    onSubmitForm={handleSubmitForm}
                    defaultValue={dataAccount}
                  >
                    {(props: any) => (
                      <>
                        <div className="space-y-4">
                          <Input
                            label="Full name"
                            name="fullName"
                            type="text"
                            errors={props.error}
                            register={props.registers}
                            placeholder="Enter your name here"
                            errorsOption={{
                              required: {
                                value: true,
                                message: "Full name is empty",
                              },
                              maxLength: {
                                value: 50,
                                message:
                                  "Full name cannot exceed 50 characters",
                              },
                              minLength: {
                                value: 5,
                                message:
                                  "Full name must not be less than 5 characters",
                              },
                            }}
                            classLabel="hidden"
                            classInput="bg-[#f6f5fa] w-full px-5 py-5 rounded-[13px]"
                          />
                          <Input
                            label="Date of birth"
                            name="dateBirday"
                            type="text"
                            errors={props.error}
                            register={props.registers}
                            placeholder="MM/DD/YYYY"
                            errorsOption={{
                              required: {
                                value: true,
                                message: "Date of birth is empty",
                              },
                              maxLength: {
                                value: 50,
                                message:
                                  "Date of birth cannot exceed 50 characters",
                              },
                              minLength: {
                                value: 5,
                                message:
                                  "Date of birth must not be less than 5 characters",
                              },
                              pattern: {
                                value:
                                  /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/,
                                message:
                                  "Date of birth must be in MM/DD/YYYY format",
                              },
                            }}
                            classLabel="hidden"
                            classInput="bg-[#f6f5fa] w-full px-5 py-5 rounded-[13px]"
                          />
                          <Input
                            label="Phone number"
                            name="phoneNumber"
                            type="number"
                            errors={props.error}
                            register={props.registers}
                            placeholder="+(84) XXX - XXXXX"
                            errorsOption={{
                              required: {
                                value: true,
                                message: "Phone number is empty",
                              },
                              maxLength: {
                                value: 13,
                                message: "Phone number cannot exceed 13 number",
                              },
                              minLength: {
                                value: 5,
                                message:
                                  "Phone number must not be less than 5 number",
                              },
                              pattern: {
                                value: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
                                message: "Invalid phone address",
                              },
                            }}
                            classLabel="hidden"
                            classInput="bg-[#f6f5fa] w-full px-5 py-5 rounded-[13px]"
                          />
                          <Input
                            label="Username"
                            name="username"
                            type="text"
                            errors={props.error}
                            register={props.registers}
                            placeholder="example user"
                            errorsOption={{
                              required: {
                                value: true,
                                message: "Username is empty",
                              },
                              maxLength: {
                                value: 50,
                                message: "Username cannot exceed 50 number",
                              },
                              minLength: {
                                value: 5,
                                message:
                                  "Username must not be less than 5 char",
                              },
                            }}
                            classLabel="hidden"
                            classInput="bg-[#f6f5fa] w-full px-5 py-5 rounded-[13px]"
                          />
                          <Input
                            label="Email"
                            name="email"
                            type="text"
                            errors={props.error}
                            register={props.registers}
                            placeholder="someone@example.com"
                            errorsOption={{
                              required: {
                                value: true,
                                message: "Email is empty",
                              },
                              maxLength: {
                                value: 256,
                                message: "Email cannot exceed 256 char",
                              },
                              minLength: {
                                value: 8,
                                message: "Email must not be less than 8 char",
                              },
                              pattern: {
                                value:
                                  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Invalid email address",
                              },
                            }}
                            classLabel="hidden"
                            classInput="bg-[#f6f5fa] w-full px-5 py-5 rounded-[13px]"
                          />
                          <Input
                            label="Password"
                            name="password"
                            type="text"
                            errors={props.error}
                            register={props.registers}
                            placeholder="••••••••"
                            errorsOption={{
                              required: {
                                value: true,
                                message: "Password is empty",
                              },
                              maxLength: {
                                value: 128,
                                message: "Password cannot exceed 128 char",
                              },
                              minLength: {
                                value: 8,
                                message:
                                  "Password must not be less than 8 char",
                              },
                            }}
                            classLabel="hidden"
                            classInput="bg-[#f6f5fa] w-full px-5 py-5 rounded-[13px]"
                          />
                          <Select
                            options={arr}
                            textSelect="Choose country"
                            name="country"
                            errors={props.error}
                            register={props.registers}
                            errorsOption={{
                              required: {
                                value: true,
                                message: "Country is empty",
                              },
                            }}
                            classLabel="hidden"
                            classSelect="bg-[#f6f5fa] w-full px-5 py-5 rounded-[13px]"
                            label={""}
                          />
                        </div>
                        <div className="flex items-center justify-center w-full mt-6">
                          <ButtonDefault
                            className={`absolute bottom-0 font-bold w-full  p-5 rounded-full text-white border-b-[5px] border-r-[4px] text-base ease-in-out duration-300 bg-[#000000] border-[#6d5ff6]`}
                            content={"Continue"}
                            // onClick={handleContinue}
                          />
                        </div>
                      </>
                    )}
                  </Form>
                </div>
              </div>
            )}
            {/* Step 3  */}
            {step === 3 && (
              <div>
                <div className="mb-3 flex justify-between items-center">
                  <button onClick={() => setStep(2)}>
                    <Image
                      src="/incons/back-arrow.png"
                      alt="Back Arrow"
                      width={30}
                      height={30}
                    />
                  </button>
                  <div className="w-3/6 bg-[#e5e5e5] h-4 rounded-xl">
                    <div
                      className={`bg-yellow-300 h-full rounded-xl w-${step}/3 ease-in-out duration-300 fade-in-05s`}
                    ></div>
                  </div>
                  <div></div>
                </div>
                <h3 className="text-[30px] font-bold">Welcome to Quizer 😎</h3>
                <p className="text-base font-semibold">
                  You choose Personal plan.
                </p>
                <div className="mt-10 w-full h-full flex justify-center items-center">
                  <Image
                    src="/images/final-create-account.png"
                    width={420}
                    height={420}
                    alt="Banner"
                  />
                </div>
              </div>
            )}
            {(step === 1 || step === 3) && (
              <ButtonDefault
                className={`absolute bottom-0 font-bold w-full  p-5 rounded-full text-white border-b-[5px] border-r-[4px] text-base ease-in-out duration-300 bg-[#000000] border-[#6d5ff6]`}
                content={step === 1 ? "Continue" : "Create account"}
                onClick={handleContinue}
              />
            )}
          </div>
        </PopupDefault>
      )}
      {/* Login  */}
      {mode === "Login" && <Login />}
    </>
  );
};
export default HomePage;
