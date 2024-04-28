import React, { useEffect, useRef, useState } from "react";
import { Controller } from "react-hook-form";
import { usePathname } from "next/navigation";
import Image from "next/image";

interface InputProps {
  label: string;
  name: string;
  register: any;
  errors: any;
  placeholder?: string;
  errorsOption?: any;
  classLabel: string;
  classInput: string;
  type: string;
  defaultValue?: string | number;
  control?: any;
}

const Input: React.FC<InputProps> = ({
  label,
  name,
  register,
  errors,
  placeholder = "Loading ...",
  errorsOption,
  classLabel,
  classInput,
  defaultValue,
  type,
  control,
}) => {
  const keys = errorsOption ? Object.keys(errorsOption) : [];
  const url = label.toLowerCase().indexOf("url") === 0;
  const [inputValue, setInputValue] = useState(defaultValue || "");

  useEffect(() => {
    if (defaultValue) {
      setInputValue(defaultValue);
    }
  }, [defaultValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const path = usePathname();
  const checkPagePosts = path.split("/").indexOf("posts") > 0;

  switch (type) {
    case "text":
      return (
        <>
          {url &&
            (inputValue != "" ? (
              <div className="h-[250px] rounded-xl border-[#dacd79] border-6 bg-[#fafaf2] relative z-1">
                <img
                  src={String(inputValue)}
                  alt="Background Thumnail"
                  className="w-full h-full rounded-xl z-0"
                />
              </div>
            ) : (
              <div className="h-[250px] rounded-xl border-[#dacd79] border-6 bg-[#fafaf2] relative">
                <div className="absolute inset-0 w-full h-full flex justify-center items-center">
                  <div>
                    <Image
                      src="/images/admin/images-add.png"
                      alt="images add"
                      width={80}
                      height={80}
                      className="mx-auto"
                    />
                    <p className="font-bold text-center text-base">
                      Add cover image
                    </p>
                  </div>
                </div>
              </div>
            ))}
          <label className={classLabel} htmlFor={name}>
            {label}
          </label>
          <input
            className={classInput}
            id={name}
            type={type}
            value={inputValue}
            placeholder={placeholder}
            {...register(name, {
              ...errorsOption,
            })}
            onChange={handleInputChange}
          />
          {errors?.[name] &&
            keys.map((items) => (
              <div key={items}>
                {errors?.[name]?.type === items && (
                  <p className="text-red-600 mt-3 text-sm">
                    {errors?.[name]?.message}
                  </p>
                )}
              </div>
            ))}
        </>
      );
    case "number":
      return (
        <>
          <label className={classLabel} htmlFor={name}>
            {label}
          </label>
          <input
            className={classInput}
            id={name}
            type={type}
            value={inputValue}
            placeholder={placeholder}
            {...register(name, {
              ...errorsOption,
              valueAsNumber: type === "number",
            })}
            onChange={handleInputChange}
          />
          {errors?.[name] &&
            keys.map((items) => (
              <div key={items}>
                {errors?.[name]?.type === items && (
                  <p className="text-red-600 mt-3 text-sm">
                    {errors?.[name]?.message}
                  </p>
                )}
              </div>
            ))}
        </>
      );
    case "password":
      return (
        <>
          <label className={classLabel} htmlFor={name}>
            {label}
          </label>
          <input
            className={classInput}
            id={name}
            type={type}
            value={inputValue}
            placeholder={placeholder}
            {...register(name, {
              ...errorsOption,
            })}
            onChange={handleInputChange}
          />
          {errors?.[name] &&
            keys.map((items) => (
              <div key={items}>
                {errors?.[name]?.type === items && (
                  <p className="text-red-600 mt-3 text-sm">
                    {errors?.[name]?.message}
                  </p>
                )}
              </div>
            ))}
        </>
      );
    case "file":
      return (
        <>
          <div>
            <div className="flex items-center justify-center w-full">
              <label className={classLabel} htmlFor={name}>
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">{label}</span> or drag and
                    drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG
                  </p>
                </div>
                <input
                  className={classInput}
                  accept=".jpg, .jpeg, .png"
                  id={name}
                  type={type}
                  placeholder={placeholder}
                  {...register(name, {
                    ...errorsOption,
                  })}
                />
                {keys.map((items) => (
                  <>
                    {errors?.[name]?.type === items && (
                      <div key={items} className="text-red-600 mt-3 text-sm">
                        {errors?.[name]?.message}
                      </div>
                    )}
                  </>
                ))}
              </label>
            </div>
          </div>
        </>
      );
  }
};
export default Input;
