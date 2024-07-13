"use client";
import React, { useState, ReactNode, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@lib/state/store";
import { setTurnOffPopup } from "@lib/state/popup/popupSlice";
import { resetQuestions } from "@lib/state/questions/questionSlice";
import useLocalStorage from "@lib/hook/useLocalStorage";
import { addUser } from "@lib/state/user/userSlice";
import { User } from "@/lib/interface/user.interface";
import { userInit } from "@lib/config/initUser";
// import Header from "../admin/header";
import Header from "@lib/components/admin/Header/index";

// import Sidebar from "../admin/sidebar";
import Sidebar from "@lib/components/admin/sidebars/index";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const currentPage = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const savedPathNameRef = useRef(currentPage);
  const [inforUser, setInforUser] = useLocalStorage("user", userInit);

  const handleClearState = () => {
    dispatch(setTurnOffPopup("popup_choose_category_question"));
    dispatch(setTurnOffPopup("popup_create_question"));
  };

  useEffect(() => {
    dispatch(resetQuestions());
    if (savedPathNameRef.current !== currentPage) {
      handleClearState();
      savedPathNameRef.current = currentPage;
    }
  }, [currentPage]);

  useEffect(() => {
    if (inforUser) {
      dispatch(addUser(inforUser));
    }
  }, [inforUser]);

  return (
    <>
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="flex h-screen">
        {/* <!-- ===== Sidebar Start ===== --> */}
        <div className="w-[11%] relative">
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        </div>
        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Start ===== --> */}
        <div
          className="relative flex flex-1 flex-col h-screen lg:w-[89%] w-full"
          id="main-content"
        >
          {/* <!-- ===== Header Start ===== --> */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Main Content Start ===== --> */}
          <main>
            <div className="relative">{children}</div>
          </main>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </>
  );
}
