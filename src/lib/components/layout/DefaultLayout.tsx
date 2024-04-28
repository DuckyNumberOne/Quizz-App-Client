import React, { ReactNode } from "react";
import Header from "./header/DefaultHeader";
import Footer from "./footer/DefaultFooter";
import { usePathname, useRouter } from "next/navigation";
import AdminLayout from "./AdminLayout";
import useLocalStorage from "@/lib/hook/useLocalStorage";
interface Props {
  children?: ReactNode;
}

const Layout = ({ children }: Props) => {
  const patch = usePathname();
  const checkPageAdmin =
    patch && patch.split("/")[1] === "admin" ? true : false;
  const [storedValue, setStoredValue] = useLocalStorage("token", "");
  const admin = checkPageAdmin && storedValue != "" && storedValue != " ";
  return (
    <>
      {admin ? (
        <>
          <AdminLayout>{children}</AdminLayout>
        </>
      ) : (
        <>
          <Header />
          <div className=" pt-[74px] py-10">{children}</div>
          <Footer />
        </>
      )}
    </>
  );
};
export default Layout;
