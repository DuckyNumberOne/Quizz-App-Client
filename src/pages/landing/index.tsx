import React, { useEffect, useState } from "react";
import Banner from "@lib/components/home-page/Banner";
import HowToPlay from "@lib/components/home-page/How-to-play";
import Welcome from "@lib/components/home-page/Welcome";
import { useSelector } from "react-redux";
import { RootState } from "@lib/state/store";
import Login from "@lib/components/home-page/Login";

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
