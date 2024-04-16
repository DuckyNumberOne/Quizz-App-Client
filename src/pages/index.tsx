import { Inter } from "next/font/google";
import React from "react";
import HomePage from "@/pages/home-page/index";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ data }: any) {
  return (
    <main>
      <HomePage data={data} />
    </main>
  );
}
export async function getServerSideProps() {
  const data = [1, 2, 3, 4, 5];
  return {
    props: {
      data,
    },
  };
}
