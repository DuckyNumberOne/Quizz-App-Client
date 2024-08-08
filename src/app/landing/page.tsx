import React, { useEffect, useState } from "react";
import Banner from "../components/banner";
import HowToPlay from "../components/howToPlay";
import Preparation from "@/app/components/preparation";
import QuizCategories from "@/app/components/quizCategories";
import WinnerPlayer from "@/app/components/winnerPlayer";
import Contact from "@/app/components/contact";

const LandingPage = () => {
  return (
    <>
      <Banner />
      <HowToPlay />
      <Preparation />
      <QuizCategories />
      <WinnerPlayer />
      <Contact />
    </>
  );
};
export default LandingPage;
