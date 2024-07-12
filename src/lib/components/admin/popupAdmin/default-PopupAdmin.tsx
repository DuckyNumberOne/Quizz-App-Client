import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import DefaultLoading from "@lib/components/common/Loading/DefaultLoading";

interface PropsPopupAdmin {
  popupDefault: boolean;
  animation: string;
}

const DefaultPopupAdmin: React.FC<PropsPopupAdmin> = ({
  popupDefault,
  animation,
}) => {
  return (
    <>
      {popupDefault && (
        <div
          className={`absolute z-10 w-full h-screen top-0 right-0 bg-white flex justify-center items-center ${animation}`}
        >
          <div className="ease-in-out duration-300">
            <Image src="/images/logo.png" width={250} height={250} alt="Logo" />
            <div className="w-full flex justify-center">
              <DefaultLoading width="48px" height="48px" color="#FF3D00" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default DefaultPopupAdmin;
