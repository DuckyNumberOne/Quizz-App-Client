import React, { useEffect, useState } from "react";
import { verifyLogin } from "@/api/auth.api";
import PopupDefault from "@lib/components/common/popups/popupWelcome";
import Form from "../common/form/defaultForm";
import Input from "../common/input/defaultInput";
import ButtonDefault from "../common/buttons/buttonDefault";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@lib/state/store";
import { setTurnOffPopup } from "@lib/state/popup/popupSlice";
import useLocalStorage from "@lib/hook/useLocalStorage";
import Image from "next/image";
interface PropSubmit {
  email: string;
  password: string;
}

interface PropsLogin {
  setMode: React.Dispatch<React.SetStateAction<string>>;
}

const Login: React.FC<PropsLogin> = ({ setMode }) => {
  const { push } = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [inforUser, setInforUser] = useLocalStorage("user", "");
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleSubmitForm = async (
    data: PropSubmit,
    setError: any,
    reset: any
  ) => {
    try {
      const result = await verifyLogin(data);
      if (result !== undefined) {
        setLoginSuccess(true);
        setInforUser(result.userFilter);
        setTimeout(() => {
          setLoginSuccess(false);
          dispatch(setTurnOffPopup("popup_login"));
          push("/admin");
        }, 1500);
      }
    } catch (error: any) {
      if (error?.response?.data) {
        setError("errorSubmit", {
          type: "manual",
          message: `${error?.response?.data}`,
        });
        setTimeout(() => {
          reset();
        }, 1500);
      }
    }
  };

  return (
    <PopupDefault>
      <div className="flex justify-between">
        <button onClick={() => setMode("Start")}>
          <Image
            src="/incons/back-arrow.png"
            alt="Back Arrow"
            width={30}
            height={30}
          />
        </button>
        <h3 className="xl:text-[30px] text-2xl font-bold">Hello there 👋</h3>
        <div />
      </div>
      <Form
        classForm="space-y-4 md:space-y-6 mt-6"
        onSubmitForm={handleSubmitForm}
      >
        {(props: any) => (
          <>
            {/* Email */}
            <div className="relative">
              <Input
                label="Email"
                name="email"
                type="text"
                register={props.registers}
                errors={props.error}
                placeholder="name@company.com"
                errorsOption={{
                  required: { value: true, message: "Email is empty" },
                  maxLength: {
                    value: 50,
                    message: "Email cannot exceed 50 characters",
                  },
                  minLength: {
                    value: 5,
                    message: "Email must not be less than 6 characters",
                  },
                }}
                classLabel="absolute text-sm pl-4 pt-1 text-[#c9c7d3] top-0"
                classInput="bg-[#f6f5fa] w-full px-4 pb-4 pt-6 rounded-[13px]"
              />
            </div>
            {/* Password */}
            <div className="relative">
              <Input
                label="Password"
                name="password"
                type="password"
                register={props.registers}
                errors={props.error}
                placeholder="••••••••"
                errorsOption={{
                  required: { value: true, message: "Password is empty" },
                  maxLength: {
                    value: 50,
                    message: "Password cannot exceed 50 characters",
                  },
                  minLength: {
                    value: 5,
                    message: "Password must not be less than 6 characters",
                  },
                }}
                classLabel="absolute text-sm pl-4 pt-1 text-[#c9c7d3] top-0"
                classInput="bg-[#f6f5fa] w-full px-4 pb-4 pt-6 rounded-[13px]"
              />
            </div>
            <div className="flex items-center justify-between mx-4">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    aria-describedby="remember"
                    type="checkbox"
                    className="xl:w-5 xl:h-5 h-3 w-3 border border-gray-300 rounded bg-gray-50"
                  />
                </div>
                <div className="ml-3 xl:text-sm text-xs font-medium">
                  <label htmlFor="remember" className="text-black ">
                    Remember me
                  </label>
                </div>
              </div>
              <a
                href="#"
                className="xl:text-sm text-xs font-medium text-[#66a6ef] hover:underline "
              >
                Forgot password?
              </a>
            </div>
            <ButtonDefault
              className={`w-full xl:p-5 md:p-4 p-3 rounded-full text-white border-b-[5px] border-r-[4px] font-medium text-base hover:font-medium ease-in-out duration-300 ${
                loginSuccess === true
                  ? "bg-[#3ed684]"
                  : props?.error?.errorSubmit?.message
                  ? `bg-rose-600 border-rose-800`
                  : `bg-[#000000] border-[#6d5ff6]`
              }`}
              content={
                loginSuccess === true
                  ? "Successfully !"
                  : props?.error?.errorSubmit?.message
                  ? `${props?.error?.errorSubmit?.message}`
                  : "Sign in"
              }
            />
          </>
        )}
      </Form>
    </PopupDefault>
  );
};
export default Login;
