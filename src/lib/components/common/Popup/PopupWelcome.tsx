import React, { ReactNode, useEffect } from "react";
import Image from "next/image";
import close from "../../../../../public/incons/close.png";

import { setTurnOffPopup } from "@/lib/state/popup/popupSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/state/store";

interface PropsPopupWelcome {
  children?: ReactNode;
}

const PopupDefault: React.FC<PropsPopupWelcome> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();
  const handleClose = () => {
    dispatch(setTurnOffPopup());
  };

  return (
    <div className="absolute inset-0 z-10 bg-black-shadow justify-center flex items-center">
      <div className="bg-white min-w-[500px] min-h-[800px] rounded-xl shadow-lg shadow-black p-4 relative popup-up">
        <Image
          src={close}
          width={48}
          height={48}
          alt="close"
          className="cursor-pointer"
          onClick={handleClose}
        />
        {children}
      </div>
    </div>
  );
};
export default PopupDefault;
