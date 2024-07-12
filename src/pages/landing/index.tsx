import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@lib/state/store";
import Login from "@/lib/components/home-page/login";
import Banner from "@/lib/components/home-page/banner";
import HowToPlay from "@/lib/components/home-page/how-to-play";

const LandingPage = ({ data }: any) => {
  const { popup_login } = useSelector((state: RootState) => state.popup);
  return (
    <>
      {popup_login && <Login />}
      <Banner />
      <HowToPlay />
    </>
  );
};
export default LandingPage;
