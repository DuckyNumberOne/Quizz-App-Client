"use client";
import React, { useState, ReactNode, useRef, useEffect } from "react";
import Sidebar from "../admin/Sidebar";
import Header from "../admin/Header";
import { usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/state/store";
import { setTurnOffPopup } from "@/lib/state/popup/popupSlice";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const currentPage = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const savedPathNameRef = useRef(currentPage);

  const handleClearState = () => {
    dispatch(setTurnOffPopup("popup_choose_category_question"));
    dispatch(setTurnOffPopup("popup_create_question"));
  };

  useEffect(() => {
    if (savedPathNameRef.current !== currentPage) {
      handleClearState();
      savedPathNameRef.current = currentPage;
    }
  }, [currentPage]);

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
