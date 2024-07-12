import React, { useEffect, useRef, useState } from "react";
import DefaulCreateQuizer from "@lib/components/admin/createQuizer/defaulCreateQuizer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@lib/state/store";
import DefaultCreateQuestion from "@lib/components/admin/createQuizer/createQuestion/defaultCreateQuestion";
import { setTurnOffPopup, setTurnOnPopup } from "@lib/state/popup/popupSlice";
import Image from "next/image";
import { useRouter } from "next/router";
import DefaultCreateQuizerByExcel from "@lib/components/admin/createQuizer/createQuizerByExcel/defaultCreateQuizerByExcel";
import DefaultChooseCategoryQuestion from "@lib/components/admin/createQuizer/chooseCategoryQuestion/defaultChooseCategoryQuestion";

const CreateQuizerPage = () => {
  const dispatch = useDispatch();
  const { pathname } = useRouter();

  const {
    popup_choose_category_question,
    popup_create_question,
    popup_quizz_creation_mode,
    popup_create_mode_excel,
  } = useSelector((state: RootState) => state.popup);
  const [quizznMode, setQuizznMode] = useState("");

  const handleChooseMode = (mode: string) => {
    setQuizznMode(mode);
    dispatch(setTurnOffPopup("popup_quizz_creation_mode"));
  };

  useEffect(() => {
    if (quizznMode == "" && !popup_quizz_creation_mode) {
      dispatch(setTurnOnPopup("popup_quizz_creation_mode"));
    }
    if (pathname !== "/admin/quizz/create") {
      dispatch(setTurnOffPopup("popup_quizz_creation_mode"));
    }
  }, [popup_quizz_creation_mode]);

  return (
    <>
      {popup_quizz_creation_mode ? (
        <div className="bg-black-shadow-2 w-full h-screen relative">
          <div className="absolute top-0 right-0 w-full flex justify-center items-center h-full">
            <div className="bg-white w-[500px] h-[300px] rounded-xl shadow-4 shadow-graydark p-5">
              <p className="text-xl text-center font-medium my-6">
                Select quiz creation mode
              </p>
              <div className="flex gap-10 justify-center items-center w-full h-2/3 ">
                <button
                  className="w-full h-full border rounded-md bg-white hover:shadow-4 hover:shadow-purple-400"
                  onClick={() => handleChooseMode("Excel")}
                >
                  <Image
                    src="/images/xls-file.png"
                    width={60}
                    height={60}
                    alt="Excel"
                    className="mx-auto mb-3"
                  />
                  <p className="text-base font-medium">Import ecxel</p>
                </button>
                <button
                  className=" w-full h-full border rounded-md bg-white hover:shadow-4 hover:shadow-purple-400"
                  onClick={() => handleChooseMode("Normal")}
                >
                  <Image
                    src="/images/key-enterer.png"
                    width={60}
                    height={60}
                    alt="Normal"
                    className="mx-auto mb-3"
                  />
                  <p className="text-base font-medium">Normal</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-[#f2f2f2] h-full">
          {quizznMode === "Normal" ? (
            <>
              <div className="grid grid-cols-12 ">
                <div
                  className={`mx-6 pt-4 col-span-4 ${
                    !popup_choose_category_question && !popup_create_question
                      ? "col-start-5"
                      : "slide-left"
                  }`}
                >
                  <DefaulCreateQuizer mode="Normal" />
                </div>
                {popup_choose_category_question && (
                  <div className="mx-6 pt-4 col-span-4 ">
                    <DefaultChooseCategoryQuestion />{" "}
                  </div>
                )}

                {popup_create_question && (
                  <div className="mx-6 pt-4 col-span-4 ">
                    <DefaultCreateQuestion mode="Normal" />{" "}
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="grid grid-cols-12 ">
                <div
                  className={`mx-6 pt-4 col-span-4 ${
                    !popup_choose_category_question &&
                    !popup_create_question &&
                    !popup_create_mode_excel
                      ? "col-start-5"
                      : "slide-left"
                  }`}
                >
                  <DefaulCreateQuizer mode="Excel" />
                </div>
                {popup_create_mode_excel && (
                  <div className={`mx-6 pt-4 col-span-8 `}>
                    <DefaultCreateQuizerByExcel />
                  </div>
                )}
                {popup_choose_category_question && (
                  <div className="mx-6 pt-4 col-span-4 ">
                    <DefaultChooseCategoryQuestion />{" "}
                  </div>
                )}
                {popup_create_question && (
                  <div className="mx-6 pt-4 col-span-4 ">
                    <DefaultCreateQuestion mode="Excel" />{" "}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};
export default CreateQuizerPage;
