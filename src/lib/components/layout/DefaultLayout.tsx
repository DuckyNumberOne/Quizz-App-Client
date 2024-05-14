"use client";
import React, { ReactNode, useEffect } from "react";
import Header from "./header/DefaultHeader";
import Footer from "./footer/DefaultFooter";
import { usePathname, useRouter } from "next/navigation";
import AdminLayout from "./AdminLayout";
import useLocalStorage from "@/lib/hook/useLocalStorage";

interface Props {
  children?: ReactNode;
}

const Layout = ({ children }: Props) => {
  const path = usePathname();
  const { push } = useRouter();
  const isAdminPage = path && path.split("/")[1] === "admin";
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (isAdminPage && !token) {
      push("/");
    }
  }, [path]);

  return (
    <>
      {isAdminPage ? (
        <AdminLayout>{children}</AdminLayout>
      ) : (
        <>
          <Header />
          <div className="pt-[74px] py-10">{children}</div>
          <Footer />
        </>
      )}
    </>
  );
};

export default Layout;
