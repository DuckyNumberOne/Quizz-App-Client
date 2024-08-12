import React from "react";
import Head from "next/head";
import Banner from "../components/banner";
import HowToPlay from "../components/howToPlay";
import Preparation from "@/app/components/preparation";
import QuizCategories from "@/app/components/quizCategories";
import WinnerPlayer from "@/app/components/winnerPlayer";
import Contact from "@/app/components/contact";

export const metadata = {
  title: "Welcome to DuckQuizz - Your Ultimate Quiz Experience",
  description:
    "Discover DuckQuizz, the ultimate platform for quiz enthusiasts. Explore various quiz categories, learn how to play, and challenge yourself or your friends. Join now and see if you can top the leaderboard!",
  keywords:
    "DuckQuizz, quiz, how to play, quiz categories, winners, online quiz, challenge, leaderboard",
  ogTitle: "Welcome to DuckQuizz - Your Ultimate Quiz Experience",
  ogDescription:
    "Discover DuckQuizz, the ultimate platform for quiz enthusiasts. Explore various quiz categories, learn how to play, and challenge yourself or your friends.",
  ogImage: "/images/thumbnail-page.png",
  ogUrl: "https://dukquizz.vercel.app/landing",
};

const LandingPage = () => {
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta
          name="google-site-verification"
          content="qY1qnlkWLjpxc4lP574qitxsY-JO9I8BNe8EWm7vbU0"
        />
        <meta name="keywords" content={metadata.keywords} />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={metadata.ogTitle} />
        <meta property="og:description" content={metadata.ogDescription} />
        <meta property="og:image" content={metadata.ogImage} />
        <meta property="og:url" content={metadata.ogUrl} />
      </Head>
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
