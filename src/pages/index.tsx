import HomePage from "@lib/components/home-page";
import { Inter } from "next/font/google";
import Head from "next/head"; // Import Head component from Next.js
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Login / Sign Up - DuckQuizz</title>
        <meta
          name="description"
          content="Join DuckQuizz to log in or sign up. Test your knowledge and challenge friends with fun and engaging quizzes!"
        />
        <meta
          name="keywords"
          content="DuckQuizz, login, sign up, quiz, challenge, knowledge test, online quiz"
        />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Login / Sign Up - DuckQuizz" />
        <meta
          property="og:description"
          content="Join DuckQuizz to log in or sign up. Test your knowledge and challenge friends with fun and engaging quizzes!"
        />
        <meta property="og:image" content="/images/thumbnail-page.png" />
        <meta property="og:url" content="https://dukquizz.vercel.app/" />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <main>
        <HomePage />
      </main>
    </>
  );
}
