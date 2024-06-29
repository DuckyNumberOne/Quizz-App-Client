import React, { ReactNode, useEffect } from "react";
import Image from "next/image";
import close from "../../../../../public/incons/close.png";

import { setTurnOffPopup } from "@/lib/state/popup/popupSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/state/store";
import { useRouter } from "next/router";

interface PropsPopupWelcome {
  children?: ReactNode;
}

const PopupDefault: React.FC<PropsPopupWelcome> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();
  const handleClose = () => {
    dispatch(setTurnOffPopup("popup_login"));
  };
  const { pathname } = useRouter();

  return (
    <div className="absolute inset-0 z-10 bg-bts-hero-2 bg-cover bg-no-repeat justify-center flex items-center">
      <div className="bg-white lg:w-[500px] w-[300px] lg:h-[800px] h-[600px] rounded-xl shadow-lg shadow-black p-4 relative popup-up">
        {pathname !== "/" && (
          <Image
            src={close}
            width={48}
            height={48}
            alt="close"
            className="cursor-pointer"
            onClick={handleClose}
          />
        )}
        {children}
      </div>
    </div>
  );
};
export default PopupDefault;
