"use client";
import React, { useState, ReactNode, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@lib/state/store";
import { setTurnOffPopup } from "@lib/state/popup/popupSlice";
import { resetQuestions } from "@lib/state/questions/questionSlice";
import useLocalStorage from "@lib/hook/useLocalStorage";
import { addUser } from "@lib/state/user/userSlice";
import { userInit } from "@lib/config/initUser";
import Header from "@/lib/components/admin/headers/index";
import Sidebar from "@/lib/components/admin/sidebar/index";
import Image from "next/image";
import Link from "next/link";

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
  const idUser = useSelector((state: RootState) => state.user._id);

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
        <div className="lg:w-[11%] relative">
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
        <nav className="fixed bottom-0 w-full h-16 bg-white z-10 shadow-t shadow-lg lg:hidden block">
          <ul className="grid grid-cols-5">
            <li>
              <div className="p-2 flex justify-center items-center">
                <Link href="/admin">
                  <Image
                    src="/incons/home.png"
                    alt=""
                    height={30}
                    width={30}
                    className="mx-auto"
                  />
                  <p className="text-sm font-semibold">Home</p>
                </Link>
              </div>
            </li>
            <li>
              <div className="p-2 flex justify-center items-center">
                <Link href={`/admin/my-quizz/${idUser}`}>
                  <Image
                    src="/incons/quizz.png"
                    alt=""
                    height={30}
                    width={30}
                    className="mx-auto"
                  />
                  <p className="text-sm font-semibold">My quiz</p>
                </Link>
              </div>
            </li>
            <li>
              <div className="p-2 flex justify-center items-center bg-[#8854c0] rounded-md">
                <Link href="/admin/quizz/create">
                  <Image
                    src="/images/plus.png"
                    alt=""
                    height={30}
                    width={30}
                    className="mx-auto"
                  />
                  <p className="text-sm font-semibold text-white">Create</p>
                </Link>
              </div>
            </li>
            <li>
              <div className="p-2 flex justify-center items-center">
                <Link href={`/admin/my-friend/${idUser}`}>
                  <Image
                    src="/incons/friends.png"
                    alt=""
                    height={30}
                    width={30}
                    className="mx-auto"
                  />
                  <p className="text-sm font-semibold">My friend</p>
                </Link>
              </div>
            </li>
            <li>
              <div className="p-2 flex justify-center items-center">
                <Link href={`/admin/history/${idUser}`}>
                  <Image
                    src="/incons/history.png"
                    alt=""
                    height={30}
                    width={30}
                    className="mx-auto"
                  />
                  <p className="text-sm font-semibold">History</p>
                </Link>
              </div>
            </li>
          </ul>
        </nav>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </>
  );
}
