import React, { useEffect, useState } from "react";
import Image from "next/image";
import Form from "@/lib/components/common/Form";
import Input from "@/lib/components/common/Input";
import Select from "@/lib/components/common/Select/DefaultSelect";
import ButtonDefault from "@/lib/components/common/Button/ButtonDefault";
import DefaultCardAnsswer from "../../../CardAnswer/DefaultCardAnswer";
import { Anwsers, Question } from "@/lib/modal/question";
import { useDispatch, useSelector } from "react-redux";
import { addQuestion } from "@/lib/state/questions/questionSlice";
import { RootState } from "@/lib/state/store";
import { setTurnOffPopup, setTurnOnPopup } from "@/lib/state/popup/popupSlice";
import {
  addAnswer,
  addMultipleAnswers,
  clearAnswer,
} from "@/lib/state/answer/answerSlice";

interface PropsData {
  title: string;
  imgQuestion: string;
  time: number;
  point: number;
  answers: Anwsers[];
  [key: string]: string | number | Anwsers[];
}

const DefaultCreateQuestion = () => {
  const dispatch = useDispatch();
  const dataQuestion = useSelector((state: RootState) => state.question);
  console.log("🚀 ~ DefaultCreateQuestion ~ dataQuestion:", dataQuestion);
  const [popupRule, setPopupRule] = useState(true);
  const [indexs, setIndex] = useState(-1);

  const defaultAnswer = {
    number: 0,
    text: "",
    isCorrect: false,
  };

  const timeQuestion = [
    { id: 43331, title: "10s", value: 10 },
    { id: 43333, title: "12s", value: 12 },
    { id: 43332, title: "15s", value: 15 },
    { id: 43334, title: "17s", value: 17 },
  ];

  const pointQuestion = [
    { id: 33331, title: "2.000 Point", value: 2000 },
    { id: 33333, title: "1.500 Point", value: 1500 },
    { id: 33332, title: "1.000 Point", value: 1000 },
    { id: 33334, title: "500 Point", value: 500 },
  ];

  const colorCardAnser = [
    { id: 1, colorBackground: "#e35454", colorBoder: "#bf2d49" },
    { id: 2, colorBackground: "#30b0c7", colorBoder: "#0093ad" },
    { id: 3, colorBackground: "#ff9500", colorBoder: "#c27810" },
    { id: 4, colorBackground: "#3ed684", colorBoder: "#81ab8b" },
  ];

  useEffect(() => {
    if (popupRule === true) {
      const timeoutId: any = setTimeout(() => {
        if (popupRule) {
          setPopupRule(false);
        }
      }, 3000);
      return () => clearTimeout(timeoutId);
    }
  }, [popupRule]);

  const transformData = (inputData: PropsData) => {
    const answers: Anwsers[] = [];
    for (let i = 1; i <= 4; i++) {
      if (inputData[`text${i}`]) {
        answers.push({
          number: i,
          isCorrect: Boolean(inputData[`isCorrect${i}`]),
          text: String(inputData[`text${i}`]),
        });
      }
    }
    return {
      imgQuestion: String(inputData.imgQuestion),
      point: Number(inputData.point),
      time: Number(inputData.time),
      title: String(inputData.title),
      anwsers: answers as Anwsers[],
    };
  };

  const handleOpenQuestion = (index: number) => {
    setIndex(index);
  };

  const handleSubmitForm = async (data: PropsData) => {
    if (data) {
      const validatedData = transformData(data);
      dispatch(clearAnswer());
      dispatch(addQuestion(validatedData));
      dispatch(setTurnOffPopup("popup_create_question"));
      dispatch(setTurnOnPopup("popup_choose_category_question"));
    }
  };

  // useEffect(() => {
  //   if (indexs != -1) {
  //     dispatch(addMultipleAnswers(dataQuestion[indexs]));
  //   }
  // }, [indexs]);

  return (
    <div className="px-3 py-4 border md:p-4 bg-white border-[#e5e5e5] my-4 rounded-lg fade-in-1s overflow-y-auto h-[935px]">
      <div className="flex justify-between items-center relative">
        <p className="text-xl font-bold">Create question</p>
        <div className="flex items-center gap-6">
          <Image
            src="/images/preview-2.webp"
            width={40}
            height={40}
            alt="Preview"
            className="cursor-pointer"
          />
          <Image
            src="/images/about.webp"
            width={30}
            height={30}
            alt="About"
            className="cursor-pointer"
            onClick={() => setPopupRule(!popupRule)}
          />
        </div>
        {popupRule && (
          <div className="absolute right-[-6px] top-14 z-10">
            <div className="absolute right-4 top-[-10px] triangle"></div>
            <div className="bg-[#f8f8f8] border-[#e8e8e8] border-4 rounded-xl w-[250px] h-[140px] mx-2">
              <p className="text-center font-bold text-rose-600">RULE</p>
              <ul className="text-sm text-[#333] text font-semibold text-start px-2">
                <li>
                  <p>
                    - Minimum <span className="text-red">5</span> questions
                    required, maximum <span className="text-red">20</span>.
                  </p>
                </li>
                <li>
                  <p>
                    - Maximum <span className="text-red">3</span> correct
                    answers per question.
                  </p>
                </li>
                <li>
                  <p>- Unique content for each answer.</p>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
      <div>
        <Form classForm="mt-3" onSubmitForm={handleSubmitForm}>
          {(props: any) => (
            <>
              <div className="space-y-4">
                <Input
                  label="Url Thumbnail"
                  name="imgQuestion"
                  type="text"
                  register={props.registers}
                  errors={props.error}
                  placeholder="Url Thumbnail Question"
                  defaultValue={
                    indexs != -1 ? dataQuestion[indexs].imgQuestion : ""
                  }
                  errorsOption={{
                    required: {
                      value: true,
                      message: "Url Thumbnail is empty",
                    },
                  }}
                  classLabel="hidden"
                  classInput="bg-[#f6f5fa] w-full px-5 py-5 rounded-[13px]"
                />
                <div className="flex gap-4">
                  <div className="w-full">
                    <Select
                      label="Point"
                      name="point"
                      register={props.registers}
                      errors={props.error}
                      textSelect="Choose point"
                      defaultValue={
                        indexs != -1
                          ? dataQuestion[indexs].point
                          : pointQuestion[0].value
                      }
                      errorsOption={{
                        required: {
                          value: true,
                          message: "Point is empty",
                        },
                      }}
                      classLabel="hidden"
                      classSelect="bg-[#f6f5fa] w-full px-5 py-5 rounded-[13px]"
                      options={pointQuestion}
                    />
                  </div>
                  <div className="w-full">
                    <Select
                      label="Time"
                      name="time"
                      register={props.registers}
                      errors={props.error}
                      textSelect="Choose time"
                      defaultValue={
                        indexs != -1
                          ? dataQuestion[indexs].time
                          : timeQuestion[0].value
                      }
                      errorsOption={{
                        required: {
                          value: true,
                          message: "Time is empty",
                        },
                      }}
                      classLabel="hidden"
                      classSelect="bg-[#f6f5fa] w-full px-5 py-5 rounded-[13px]"
                      options={timeQuestion}
                    />
                  </div>
                </div>
                <Input
                  label="Title"
                  name="title"
                  type="text"
                  register={props.registers}
                  errors={props.error}
                  placeholder="Title question"
                  defaultValue={indexs != -1 ? dataQuestion[indexs].title : ""}
                  errorsOption={{
                    required: {
                      value: true,
                      message: "Title is empty",
                    },
                    maxLength: {
                      value: 50,
                      message: "Title cannot exceed 50 characters",
                    },
                    minLength: {
                      value: 5,
                      message: "Title must not be less than 6 characters",
                    },
                  }}
                  classLabel="hidden"
                  classInput="bg-[#f6f5fa] w-full px-5 py-5 rounded-[13px]"
                />
              </div>
              <div>
                <div className="w-full flex-row flex-wrap mt-12">
                  {/* Box */}
                  <div className="w-full border-r-[5px] border-white mb-3 grid grid-cols-2 grid-rows-2 gap-4">
                    {colorCardAnser.map((items, index) => (
                      <div key={items.id}>
                        <DefaultCardAnsswer
                          number={index}
                          register={props.registers}
                          errors={props.error}
                          placeholder="Text question"
                          errorsOptionInput={{
                            required: { value: true, message: "Text is empty" },
                            maxLength: {
                              value: 20,
                              message: "Title cannot exceed 20 characters",
                            },
                          }}
                          defaultValue={
                            dataQuestion &&
                            dataQuestion[indexs] &&
                            dataQuestion[indexs].anwsers &&
                            dataQuestion[indexs].anwsers.length > 0 &&
                            dataQuestion[indexs].anwsers[index]
                              ? dataQuestion[indexs].anwsers[index]
                              : defaultAnswer
                          }
                          classInput="text-white font-semibold text-[18px] text-center mt-12 relative"
                          backgroundColor={items.colorBackground}
                          borderShadowColor={items.colorBoder}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="border-t-2 border-[#b5b2c1] w-full mt-10" />
              <div className="flex gap-1 h-[150px]">
                <div className="h-full flex items-center gap-3 justify-between overflow-auto w-3/4">
                  <div className="h-full flex items-center gap-1">
                    {dataQuestion.map((items, index) => (
                      <div
                        className="bg-white-shadow-2 h-[100px] w-[160px] rounded-2xl cursor-pointer hover:shadow-2 hover:shadow-graydark ease-in-out duration-300"
                        key={index}
                        onClick={() => handleOpenQuestion(index)}
                      >
                        <img
                          src={items.imgQuestion}
                          width={140}
                          height={80}
                          alt="Thumbnail question"
                          className="w-full h-full rounded-2xl"
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="h-full flex justify-center items-center  w-1/4">
                  <button className="bg-[#036be5] p-5 rounded-full cursor-pointer hover:bg-[#509bf0]">
                    <Image
                      src="/images/plus.png"
                      width={40}
                      height={40}
                      alt="Plus"
                    />
                  </button>
                </div>
              </div>
            </>
          )}
        </Form>
      </div>
    </div>
  );
};
export default DefaultCreateQuestion;
