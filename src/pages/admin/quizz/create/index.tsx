import React, { useEffect, useRef } from "react";
import DefaulCreateQuizer from "@/lib/components/admin/Create/CreateQuizer/DefaulCreateQuizer";
import DefaultChooseCategoryQuestion from "@/lib/components/admin/Create/CreateQuizer/ChooseCategoryQuestion/DefaultChooseCategoryQuestion";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/state/store";
import DefaultCreateQuestion from "@/lib/components/admin/Create/CreateQuizer/CreateQuestion/DefaultCreateQuestion";

const CreateQuizerPage = () => {
  const { popup_choose_category_question, popup_create_question } = useSelector(
    (state: RootState) => state.popup
  );

  return (
    <div className="bg-[#f2f2f2] h-full">
      <div className="grid grid-cols-12 ">
        <div
          className={`mx-6 pt-4 col-span-4 ${
            !popup_choose_category_question && !popup_create_question
              ? "col-start-5"
              : "slide-left"
          }`}
        >
          <DefaulCreateQuizer />
        </div>
        {popup_choose_category_question && (
          <div className="mx-6 pt-4 col-span-4 ">
            <DefaultChooseCategoryQuestion />{" "}
          </div>
        )}

        {popup_create_question && (
          <div className="mx-6 pt-4 col-span-4 ">
            <DefaultCreateQuestion />{" "}
          </div>
        )}
      </div>
    </div>
  );
};
export default CreateQuizerPage;
