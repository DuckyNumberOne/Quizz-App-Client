import React, { ReactNode } from "react";
import Header from "./header";
import Footer from "./footer";
interface Props {
  children?: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <div className="pt-[74px]">{children}</div>
      <Footer />
    </>
  );
};
export default Layout;
