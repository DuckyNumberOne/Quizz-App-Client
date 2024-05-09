import { RootState } from "@/lib/state/store";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface CheckBoxAnswerProps {
  register: any;
  name: string;
  errorsOption?: any;
  onClick?: any;
  defaultValue?: boolean;
}

const DefaultCheckBoxAnswer: React.FC<CheckBoxAnswerProps> = ({
  register,
  name,
  errorsOption,
  onClick,
  defaultValue,
}) => {
  // const dispatch = useDispatch();
  const answers = useSelector((state: RootState) => state.answers);
  const isCorrectTrue = answers.filter((items) => items.isCorrect).length;
  const [isCorrect, setIsCorrect] = useState(false);

  const handleClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    if (isCorrectTrue <= 2) {
      onClick(checked);
      setIsCorrect(checked);
    }
    if (checked === false) {
      onClick(checked);
      setIsCorrect(checked);
    }
  };

  useEffect(() => {
    setIsCorrect(defaultValue || false);
  }, [defaultValue]);

  return (
    <div className="cursor-pointer">
      <div className="absolute right-3 top-5 rounded-full border-4 border-white p-1 ease-in-out duration-300 w-[40px] h-[40px]">
        <input
          id={name}
          type="checkbox"
          {...register(name)}
          checked={isCorrect}
          className="opacity-0 w-[40px] h-[40px] absolute inset-0 z-1 cursor-pointer"
          onChange={handleClick}
          defaultChecked={defaultValue}
        />
        {isCorrect && (
          <Image
            src="/images/doneLight.png"
            width={30}
            height={30}
            alt="CheckBox"
            className="absolute inset-0 z-0"
          />
        )}
      </div>
    </div>
  );
};

export default DefaultCheckBoxAnswer;
