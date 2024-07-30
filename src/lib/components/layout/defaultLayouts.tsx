"use client";
import React, { ReactNode, useEffect } from "react";
import Header from "../../../app/components/header/defaultHeaders";
import Footer from "../../../app/components/footer/defaultFooters";
import { usePathname, useRouter } from "next/navigation";
import AdminLayout from "./adminLayouts";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@lib/state/store";
import { setTurnOffPopup } from "@lib/state/popup/popupSlice";

interface Props {
  children?: ReactNode;
}

const Layout = ({ children }: Props) => {
  const dispatch = useDispatch();
  const path = usePathname();
  const { push } = useRouter();
  const isAdminPage = path && path.split("/")[1] === "admin";
  const { popup_quizz_creation_mode } = useSelector(
    (state: RootState) => state.popup
  );

  useEffect(() => {
    if (popup_quizz_creation_mode && path == "/admin") {
      dispatch(setTurnOffPopup("popup_quizz_creation_mode"));
    }
  }, [popup_quizz_creation_mode, path]);

  return (
    <>{isAdminPage ? <AdminLayout>{children}</AdminLayout> : <>{children}</>}</>
  );
};

export default Layout;
