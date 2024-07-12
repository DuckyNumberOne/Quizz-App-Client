import React from "react";
import { navbarMenu } from "@lib/config/navbar";
import Link from "next/link";
const Header = () => {
  return (
    <nav className=" fixed z-10 w-full bg-white">
      <nav className="flex justify-between max-w-screen-xl mx-auto items-center font-normal">
        <div>Logo</div>
        <div className="flex justify-between gap-5">
          {navbarMenu.map((items, index) => (
            <Link href="" key={index}>
              {items.title}
            </Link>
          ))}
        </div>
        <button className="px-4 py-3 w-[154px] my-3 border border-black border-solid rounded-md delay-150 hover:transition-all hover:delay-150 hover:scale-110 hover:bg-[#112828] hover:text-white">
          Contact
        </button>
      </nav>
    </nav>
  );
};
export default Header;
