import React, { useEffect, useState } from "react";
import Banner from "@/lib/components/home-page/banner";
import HowToPlay from "@/lib/components/home-page/how-to-play";
import Welcome from "@/lib/components/home-page/welcome";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/state/store";
import Login from "@/lib/components/home-page/login";

const HomePage = ({ data }: any) => {
  const { statusPopup } = useSelector((state: RootState) => state.popup);
  return (
    <>
      {statusPopup && <Login />}
      <Banner />
      <HowToPlay />
    </>
  );
};
export default HomePage;
