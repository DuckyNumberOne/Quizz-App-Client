import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Form from "@/lib/components/common/form";
import Input from "@/lib/components/common/input";
import Select from "@/lib/components/common/select/DefaultSelect";
import ButtonDefault from "@/lib/components/common/button/ButtonDefault";
import DefaultCardAnsswer from "../../../cardAnswer/DefaultCardAnswer";
import { Anwsers, Question } from "@lib/modal/question";
import { useDispatch, useSelector } from "react-redux";
import {
  addQuestion,
  deleteQuestionByIndex,
  resetQuestions,
  updateQuestion,
} from "@lib/state/questions/questionSlice";
import { RootState } from "@lib/state/store";
import { setTurnOffPopup, setTurnOnPopup } from "@lib/state/popup/popupSlice";
import {
  addAnswer,
  addMultipleAnswers,
  clearAnswer,
} from "@lib/state/answer/answerSlice";
import { useRouter } from "next/router";
import { postQuizz } from "@/api/quizz";
import { colorCardAnswer } from "@lib/config/colorCardAnswer";
import { generateUniqueId } from "@/utils/generateUniqueId";

interface PropsData {
  title: string;
  imgQuestion: string;
  time: number;
  point: number;
  answers: Anwsers[];
  [key: string]: string | number | Anwsers[];
}

interface PropsDefaultCreateQuestion {
  mode: string;
}

const DefaultCreateQuestion: React.FC<PropsDefaultCreateQuestion> = ({
  mode,
}) => {
  const previousIndex = useRef(-1);
  const dispatch = useDispatch();
  const dataQuestion = useSelector((state: RootState) => state.question);
  const dataQuizz = useSelector((state: RootState) => state.quizz);
  const dataUser = useSelector((state: RootState) => state.user);
  const { push, pathname } = useRouter();
  const [popupRule, setPopupRule] = useState(true);
  const [indexs, setIndex] = useState(-1);
  const [error, setError] = useState("");
  const { popup_error_question } = useSelector(
    (state: RootState) => state.popup
  );
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
      _id: String(inputData._id),
      imgQuestion: String(inputData.imgQuestion),
      point: Number(inputData.point),
      time: Number(inputData.time),
      title: String(inputData.title),
      anwsers: answers as Anwsers[],
    };
  };

  function convertQuestionFormat(question: Question) {
    let newQuestion = {
      _id: String(question._id),
      imgQuestion: String(question.imgQuestion),
      point: Number(question.point),
      time: Number(question.time),
      title: String(question.title),
    } as { [key: string]: any };
    for (let i = 0; i < question.anwsers.length; i++) {
      newQuestion["isCorrect" + (i + 1)] = question.anwsers[i].isCorrect;
      newQuestion["text" + (i + 1)] = question.anwsers[i].text;
    }

    return newQuestion;
  }

  const handleScrollToTop = () => {
    const content = document.getElementById("main-content");
    if (content) {
      window.scrollTo({
        top: content?.offsetTop - 90,
        behavior: "instant",
      });
    }
  };

  const defaultValue =
    indexs != -1
      ? convertQuestionFormat(dataQuestion[indexs])
      : dataQuestion[indexs];

  const handleOpenQuestion = (index: number) => {
    if (error != "" && indexs != -1) {
      handleScrollToTop();
      dispatch(setTurnOnPopup("popup_error_question"));
    } else {
      setIndex(index);
    }
  };

  const handleStayQuestionIndex = () => {
    dispatch(setTurnOffPopup("popup_error_question"));
  };

  const handleDeleteQuestion = () => {
    if (indexs !== -1) {
      dispatch(deleteQuestionByIndex(indexs));
      setIndex(-1); // Đặt lại giá trị của indexs sau khi xóa thành -1
      if (mode == "Normal") {
        dispatch(setTurnOffPopup("popup_create_question"));
        dispatch(setTurnOnPopup("popup_choose_category_question"));
      }
      if (mode == "Excel") {
        // dispatch(setTurnOffPopup("popup_create_question"));
        // dispatch(setTurnOnPopup("popup_choose_category_question"));
      }
    }
  };

  const valueId = indexs != -1 ? dataQuestion[indexs]._id : generateUniqueId();

  const handleSubmitForm = async (data: PropsData) => {
    if (!data) return;
    const validatedData = transformData(data);
    const isCorrectTrue = validatedData.anwsers.filter(
      (item) => item.isCorrect
    ).length;
    const existsId = dataQuestion.some(
      (question) => question._id === validatedData._id
    );
    const existingQuestion = dataQuestion.find(
      (question) => question._id === validatedData._id
    );
    const titleChanged = existingQuestion
      ? existingQuestion.title !== validatedData.title
      : true;

    // Kiểm tra xem có các text giống nhau không
    const uniqueTexts = new Set(
      validatedData.anwsers.map((answer) => answer.text)
    );
    const isTextsUnique = uniqueTexts.size === validatedData.anwsers.length;

    if (!isTextsUnique) {
      setError("Answers should have unique text!");
      return;
    }

    if (isCorrectTrue === 0 && validatedData.anwsers.length > 0) {
      dispatch(updateQuestion(validatedData));
      setError("Please choose 1 correct answer !");
    } else {
      if (existsId) {
        dispatch(clearAnswer());
        if (!titleChanged) {
          // Title is not changed, continue without checking existence
          dispatch(updateQuestion(validatedData));
          // if (mode === "Normal") {
          dispatch(setTurnOffPopup("popup_create_question"));
          dispatch(setTurnOnPopup("popup_choose_category_question"));
          // }
        } else {
          // Title is changed, check existence
          const existsTitle = dataQuestion.some(
            (question) => question.title === validatedData.title
          );
          if (existsTitle) {
            setError("This title question already exists !");
          } else {
            dispatch(updateQuestion(validatedData));
            // if (mode === "Normal") {
            dispatch(setTurnOffPopup("popup_create_question"));
            dispatch(setTurnOnPopup("popup_choose_category_question"));
            // }
          }
        }
      } else {
        const existsTitle = dataQuestion.some(
          (question) => question.title === validatedData.title
        );
        if (existsTitle) {
          setError("This title question already exists !");
        } else {
          dispatch(clearAnswer());
          dispatch(addQuestion(validatedData));
          // if (mode === "Normal") {
          dispatch(setTurnOffPopup("popup_create_question"));
          dispatch(setTurnOnPopup("popup_choose_category_question"));
          // }
        }
      }
    }
  };

  const handCreateQuizz = async () => {
    try {
      const questionsWithoutId = dataQuestion.map((question) => {
        const { _id, ...rest } = question;
        return rest;
      });
      const dataQuizzConvert = {
        ...dataQuizz,
        idUser: String(dataUser._id),
        question: questionsWithoutId,
      };
      const res = await postQuizz(dataQuizzConvert);
      if (res) {
        push(`/admin/quizz/${res._id}`);
      }
    } catch (error: any) {
      setError(error.response.data);
    }
  };

  useEffect(() => {
    if (indexs != -1) {
      const anwsers = dataQuestion[indexs].anwsers;
      dispatch(clearAnswer());
      dispatch(addMultipleAnswers({ anwsers }));
    }
  }, [indexs]);

  useEffect(() => {
    if (pathname !== "/admin/quizz/create") {
      dispatch(clearAnswer());
      dispatch(resetQuestions());
      dispatch(resetQuizz());
    }
  }, [pathname]);
  return (
    <div
      className={`px-3 py-4 border md:p-4 bg-white border-[#e5e5e5] my-4 rounded-lg fade-in-1s h-[935px] relative ${
        !popup_error_question && "overflow-y-auto"
      }`}
    >
      {popup_error_question && (
        <div className="absolute top-0 right-0 w-full h-screen bg-black-shadow z-10 rounded-lg flex items-center justify-center">
          <div className="bg-white shadow-2 shadow-purple-500 w-[300px] h-[220px] rounded-2xl p-4">
            <p className="text-base font-normal">
              Cannot move another question because the question is experiencing
              an
              <span className="text-[#cc0000] font-semibold"> error </span>!
            </p>
            <div className=" mt-6 space-y-2">
              <button
                className="block w-full bg-white text-black font-medium shadow-2 shadow-graydark rounded-md hover:bg-whiten"
                onClick={handleStayQuestionIndex}
              >
                Stay
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-between items-center relative">
        <p className="text-xl font-bold">
          {indexs != -1 ? `Question ${indexs + 1}` : "Create question"}
        </p>
        <div className="flex items-center gap-6">
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
        <Form
          classForm="mt-3"
          onSubmitForm={handleSubmitForm}
          defaultValue={defaultValue}
        >
          {(props: any) => (
            <>
              <div className="space-y-4">
                <Input
                  label="_id"
                  name="_id"
                  type="text"
                  register={props.registers}
                  errors={props.error}
                  errorsOption={{
                    required: {
                      value: true,
                      message: "_id is empty",
                    },
                  }}
                  defaultValue={valueId}
                  classLabel="hidden"
                  classInput="hidden"
                />
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
                  errorsOption={{
                    required: {
                      value: true,
                      message: "Title is empty",
                    },
                    maxLength: {
                      value: 500,
                      message: "Title cannot exceed 500 characters",
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
                    {colorCardAnswer.map((items, index) => (
                      <div key={items.id}>
                        <DefaultCardAnsswer
                          indexs={indexs}
                          number={index}
                          register={props.registers}
                          errors={props.error}
                          placeholder="Text question"
                          defaultValue={
                            dataQuestion &&
                            dataQuestion[indexs] &&
                            dataQuestion[indexs].anwsers &&
                            dataQuestion[indexs].anwsers.length > 0 &&
                            dataQuestion[indexs].anwsers[index]
                              ? dataQuestion[indexs].anwsers[index]
                              : defaultAnswer
                          }
                          errorsOptionInput={{
                            required: { value: true, message: "Text is empty" },
                            maxLength: {
                              value: 70,
                              message: "Title cannot exceed 70 characters",
                            },
                          }}
                          classInput="text-white font-semibold text-[18px] text-center mt-12 relative"
                          backgroundColor={items.colorBackground}
                          borderShadowColor={items.colorBoder}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="h-6">
                {error != "" && (
                  <p className="text-rose-600 text-center font-medium">
                    {error}
                  </p>
                )}
              </div>
              <div className="border-t-2 border-[#b5b2c1] w-full mt-10" />
              <div className="flex gap-1 h-[150px]">
                <div
                  className={`h-full flex items-center gap-3 justify-between overflow-auto w-3/4`}
                >
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
                <div className="h-full flex justify-center items-center  w-1/4 relative">
                  {indexs !== -1 ? (
                    <div className="w-full space-y-2 ease-in-out duration-300 ml-4">
                      <button className="bg-yellow-300 w-full rounded-md flex justify-center items-center p-2">
                        <Image
                          src={"/images/edit.png"}
                          width={40}
                          height={40}
                          alt={"Edit"}
                        />
                      </button>
                      <div
                        className="bg-red w-full rounded-md cursor-pointer flex justify-center items-center p-2"
                        onClick={handleDeleteQuestion}
                      >
                        <Image
                          src={"/images/delete.png"}
                          width={40}
                          height={40}
                          alt={"Trash"}
                        />
                      </div>
                    </div>
                  ) : (
                    <button className="bg-[#036be5] hover:bg-[#509bf0] p-5 rounded-full cursor-pointer">
                      <Image
                        src={"/images/plus.png"}
                        width={40}
                        height={40}
                        alt={"Plus"}
                      />
                    </button>
                  )}
                </div>
              </div>
            </>
          )}
        </Form>
        <div className="border-t-2 border-[#b5b2c1] w-full mt-5" />
        {dataQuestion.length >= 5 && (
          <div className="pb-10">
            <button className="shadow-2 shadow-purple-600 flex items-center justify-center gap-4 mt-8 font-bold  hover:bg-slate-50 rounded-full py-3 px-8 text-lg  text-black bg-white hover:shadow-sm hover:shadow-black ease-in-out duration-300 w-full">
              <p className="">Preview quizz</p>
            </button>
            <ButtonDefault
              content="Create"
              className="mt-8 font-bold text-white bg-black rounded-full py-3 px-8 text-lg  hover:text-black hover:bg-white hover:shadow-sm hover:shadow-black ease-in-out duration-300 w-full"
              onClick={handCreateQuizz}
            />
          </div>
        )}
      </div>
    </div>
  );
};
export default DefaultCreateQuestion;
function resetQuizz(): any {
  throw new Error("Function not implemented.");
}
