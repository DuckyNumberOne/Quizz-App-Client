import React, { useEffect, useState } from "react";
import Input from "../../common/input";
import { Anwsers } from "@lib/modal/question";
import { useDispatch, useSelector } from "react-redux";
import { addAnswer } from "@lib/state/answer/answerSlice";
import { RootState } from "@lib/state/store";
import DefaultCheckBoxAnswer from "./checkBoxAnswer/defaultCheckBoxAnswer";
// import { debounce } from "lodash";

interface DefaultCardAnswerProps {
  placeholder?: string;
  errorsOptionCheckBox?: any;
  errorsOptionInput?: any;
  classInput: string;
  backgroundColor: string;
  borderShadowColor: string;
  defaultValue?: Anwsers;
  number: number;
  register: any;
  errors: any;
  control?: any;
  indexs?: number;
}

const DefaultCardAnswer: React.FC<DefaultCardAnswerProps> = ({
  placeholder = "Loading ...",
  control,
  errorsOptionCheckBox,
  errorsOptionInput,
  classInput,
  defaultValue,
  backgroundColor = "#f6f5fa",
  borderShadowColor = "#f6f5fa",
  number = 0,
  register,
  errors,
  indexs,
}) => {
  const dispatch = useDispatch();
  const answerShare: Anwsers = {
    number: number + 1,
    text: "",
    isCorrect: false,
  };

  const handleInputChange = (value: string) => {
    // if (indexs == -1) {
    const answer = { ...answerShare, text: value };
    dispatch(addAnswer({ answer }));
    // }
  };

  const handleCheckbox = (value: boolean) => {
    // if (indexs == -1) {
    const answer = { ...answerShare, isCorrect: value };
    dispatch(addAnswer({ answer }));
    // }
  };

  return (
    <div
      className={`border-r-4 border-b-4 py-3 px-6 rounded-2xl w-full h-[200px] flex justify-center items-center relative`}
      style={{
        backgroundColor: backgroundColor,
        borderColor: borderShadowColor,
      }}
    >
      <DefaultCheckBoxAnswer
        indexs={indexs}
        name={`isCorrect${String(number + 1)}`}
        register={register}
        onClick={handleCheckbox}
        defaultValue={defaultValue ? defaultValue.isCorrect : false}
      />
      <div className="">
        <Input
          label="Text"
          name={`text${String(number + 1)}`}
          type="text"
          register={register}
          errors={errors}
          placeholder={placeholder}
          defaultValue={defaultValue ? defaultValue?.text : ""}
          errorsOption={errorsOptionInput}
          classLabel="hidden"
          classInput="bg-transparent-2 text-center text-white w-full px-5 py-5 rounded-[13px] focus:outline-none placeholder-white"
          onInputChange={handleInputChange}
        />
      </div>
    </div>
  );
};
export default DefaultCardAnswer;
