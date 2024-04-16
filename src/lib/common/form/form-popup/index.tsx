import React, { useState } from "react";
import Form from "..";
import Confirm from "@components/confirm";
import { Product } from "@/src/lib/modal/product";
import { User } from "@/src/lib/modal/user";
import { useDispatch } from "react-redux";
import { popup } from "@/src/lib/redux/selector/selector";
import { setPopup } from "@/src/lib/redux/action/popup";

interface PropsDefaultValue {
  functionApi: (data: any, id?: string) => Promise<Product[] | User[]>;
  className: string;
  children: (props: any) => React.JSX.Element;
}

const FormPopup: React.FC<PropsDefaultValue> = ({ functionApi, children }) => {
  const dispatch = useDispatch();
  const [confirm, setConfirm] = useState(false);
  const [dataPopup, setDataPopup] = useState({});
  const handleFormData = (data: any) => {
    console.log("Received data in parent component:", data);
    setDataPopup(data);
  };

  const handleClose = () => {
    dispatch(setPopup(false));
  };
  return (
    <>
      {popups && (
        <>
          {confirm ? (
            <Confirm
              className="absolute w-full h-full top-0 bg-black-shadow"
              classPositionBox="top-28"
              functionApi={functionApi}
              setConfirm={setConfirm}
              data={dataPopup}
            />
          ) : (
            <div className="absolute w-full h-full top-0 left-0 bg-black-shadow">
              <div className="w-full max-w-6xl mx-auto relative top-28">
                <div className="w-full relative">
                  <button
                    className="flex absolute right-0 p-4"
                    onClick={handleClose}
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        stroke-linejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                  </button>
                </div>
                <Form
                  // setConfirm={setConfirm}
                  // setData={handleFormData}
                  functionApi={functionApi}
                  className=""
                >
                  {children}
                </Form>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};
export default FormPopup;
