import React from "react";
import { NextPage } from "next";
import TopPageComponent from "@/components/pages/Top";
import { Metadata } from "next";

const title = "NeutroNet（ニュートロネット）| 年収800万円以上限定SNS"
const description = "NeutroNet（ニュートロネット）は、偏った発言や強い批判の無い、多角的・建設的で有意義な情報収集や議論ができるニュートラルなSNSです。年収帯ごとにコミュニティを分けることで、生活水準の近い人同士で効率よく情報を入手できるようにしています。"

export const metadata: Metadata = {
  title: title,
  description: description,
  keywords: "NeutroNet,ニュートロネット,高収入,アッパーマス",
  openGraph: {
    type: "website",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    title: title,
    siteName: title,
    description: description,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/ogp.png`,
        alt: "NeutroNet",
      },
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: title,
    description: description,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/ogp.png`,
        alt: "NeutroNet",
      },
    ],
  },
};

const TopPage: NextPage = async() => {
  return (
    <TopPageComponent />
  );
}

export default TopPage;