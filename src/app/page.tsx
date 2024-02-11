import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare } from "@fortawesome/free-regular-svg-icons";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { getServerSession } from "next-auth";
import SigninButton from "@/components/SigninButton";
import { authOptions } from "@/lib/options";
import Link from "next/link";
import SignOutSpan from "@/components/SignOutSpan";
import Image from "next/image";
import { NextPage } from "next";

const TopPage: NextPage = async() => {
  const session = await getServerSession(authOptions);
  return (
    <>
      <header className="bg-blue-800 relative bg-cover bg-no-repeat bg-hero" >
        <div className="absolute top-0 left-0 w-full h-full bg-main-blue/70 z-10"/>
        <div className="flex flex-col justigy-center items-center z-20 text-white relative">
          <div className="flex justify-between p-4 w-full max-w-screen-md box-border">
            {/* <span className="text-xl font-bold">Neutro Net</span> */}
            <Image src="/whitefontlogo.png" alt="Neutro Net" width={100} height={200} />
            {session ? <SignOutSpan /> : <></>}
          </div>
          <Image src="/whitelogo.png" alt="Neutro Net" width={200} height={200} className="mt-10 mb-7"/>
          <div className="flex flex-col justify-center items-center w-full max-w-screen-md p-10 pt-0">
            <p className="mb-10 text-4xl text-center">バズり目的の質の低い情報にうんざりしていませんか？</p>
            <div className="flex flex-col justify-center items-center w-4/5">
              <p>年収フィルタリングにより、質の高い対話と有意義な情報交換を実現するための新しい形のコミュニティサイト</p>
              <p>今すぐ参加して、質の高いコミュニティを体験しよう！</p>
            </div>
            <div className="flex gap-4 justify-center">
              {
                session ? <Link href="/threads" className="mt-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  コミュニティサイトへ移動
                </Link> : <>
                  <SigninButton />
                </>
              }
            </div>
          </div>
        </div>
      </header>
      <AboutAndPainSection />
      <ConcernsSection />
      <ProcessSection />
      <Feature1Section />
      <Feature2Section />
      <Feature3Section />
      {/* <section className="bg-white p-8 m-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-main-blue">ユーザーの声</h2>
          <p className="mt-4">"Neutro Netで、質の高い議論を毎日楽しんでいます。"</p>
      </section> */}
      <footer className="bg-main-blue text-white text-center p-4">
          © 2024 Neutro Net. All rights reserved.
      </footer>
    </>
  );
}

export default TopPage;

const AboutAndPainSection: React.FC = () => {
  return (
    <Container isColored>
      <div className={`flex flex-col gap-4 justify-center items-center max-w-screen-lg py-2 pb-10 px-3 w-full`}>
        <h2 className="text-3xl font-bold text-main-blue text-center">Neuro Net とは</h2>
        <div className="bg-white rounded-lg text-xl p-4 sm:mx-14 shadow-md">
          Neutro Netは、年収でフィルタリングを行うことにより、バイアスのないコミュニケーションの場を提供するSNSです。
          政治、経済、株式など様々な話題について、多角的で建設的な議論を求める方々のためのプラットフォームです。
        </div>
        {/* <ul className="pt-4 flex flex-col gap-10 sm:flex-row sm:mx-14 sm:gap-4">
          <li className="flex flex-col items-center relative">
            <h3 className="absolute top-[-14px] tracking-[1em] after:ml-[-1em] text-xl font-bold text-white bg-red-600 w-48 text-center rounded-lg">課題</h3>
            <ul className="text-left bg-white rounded-lg p-3 text-xl pt-6">
              <li>・既存のSNSでは、極端な発言や有益でないノイズ、釣り目的の発言が目立ちます。</li>
              <li>・承認欲求に溢れた低レベルなエンタメ発言が多い中、質の高い対話を求める声が高まっています。</li>
            </ul>
          </li>
          <li className="flex flex-col items-center relative">
            <h3 className="absolute top-[-14px] tracking-[1em] after:ml-[-1em] text-xl font-bold text-white bg-sub-blue w-52 text-center rounded-lg">解決策</h3>
            <ul className="text-left bg-white rounded-lg text-xl p-3 pt-6 h-full">
              <li>・Neutro Netでは、同じ生活レベルの人々との有意義な情報交換を通じて、賢いコミュニティを構築します。</li>
              <li>・多角的な視点と建設的な対話で、知的な会話の場を提供します。</li>
            </ul>
          </li>
        </ul> */}
      </div>
    </Container>
  );
}


const ConcernsSection: React.FC = () => {
  return (
    <Container>
      <div className={`flex flex-col gap-4 justify-center items-center max-w-screen-lg py-2 pb-10 px-3 w-full`}>
        <h2 className="text-3xl font-bold text-main-blue text-center">既存SNSのお悩み</h2>
        <ul className="text-xl">
          <li className="flex items-center gap-2">
            <FontAwesomeIcon icon={faCheckSquare} className="h-5"/>
            <span>インプレッション目的の極端な発言</span>
          </li>
          <li className="flex items-center gap-2">
            <FontAwesomeIcon icon={faCheckSquare} className="h-5"/>
            <span>過激・攻撃的な発言</span>
          </li>
          <li className="flex items-center gap-2">
            <FontAwesomeIcon icon={faCheckSquare} className="h-5"/>
            <span>質の低いノイズとなる情報</span>
          </li>
        </ul>
        <FontAwesomeIcon icon={faCaretDown} className="h-16 m-[-15px]" />
        <div className="text-2xl font-bold text-center">
          年収800万円以上に限定することに寄り高度なコミュニティを実現
        </div>
      </div>
    </Container>
  );
}

const ProcessSection: React.FC = () => {
  return (
    <Container isColored>
      <div className={`flex flex-col gap-4 justify-center items-center max-w-screen-lg py-2 pb-10 px-3 w-full`}>
        <h2 className="text-3xl font-bold text-main-blue text-center">参加申請の流れ</h2>
        <ul className="pt-4 flex flex-col gap-10 sm:flex-row sm:mx-14 sm:gap-4">
          <li className="flex flex-col items-center relative sm:flex-1">
            <h3 className="absolute top-[-14px] tracking-[0.2em] after:ml-[-0.2em] text-xl font-bold text-white bg-main-blue w-24 text-center rounded-lg">手順.1</h3>
            <div className="text-left bg-white rounded-lg text-xl p-3 pt-6 h-full w-full">
              アカウントを作成します
            </div>
          </li>
          <li className="flex flex-col items-center relative sm:flex-1">
            <h3 className="absolute top-[-14px] tracking-[0.2em] after:ml-[-0.2em] text-xl font-bold text-white bg-main-blue w-24 text-center rounded-lg">手順.2</h3>
            <div className="text-left bg-white rounded-lg text-xl p-3 pt-6 h-full w-full">
              収入証明書（源泉徴収票等）をアップロード
            </div>
          </li>
          <li className="flex flex-col items-center relative sm:flex-1">
            <h3 className="absolute top-[-14px] tracking-[0.2em] after:ml-[-0.2em] text-xl font-bold text-white bg-main-blue w-24 text-center rounded-lg">手順.3</h3>
            <div className="text-left bg-white rounded-lg text-xl p-3 pt-6 h-full w-full">
              収入情報が記録されたらコミュニティへ参加！
            </div>
          </li>
        </ul>
      </div>
    </Container>
  );
}


const Feature1Section: React.FC = () => {
  return (
    <Container>
      <div className={`flex flex-col sm:flex-row-reverse max-w-screen-lg gap-2 mx-auto w-full`}>
        <div className="flex flex-col justify-center  min-w-[50%] py-4 box-border">
          <h2 className="text-xl font-bold underline pb-2 decoration-sub-yellow decoration-4">特徴 1</h2>
          <h3 className="text-3xl font-bold text-main-blue">話題をジャンルごとに選択可能</h3>
          <div className="pt-4">
            話題をジャンルごとに選択が可能です。雑談や仕事、キャリアの話、資産運用の話などができます。
          </div>
        </div>
        <div className="flex flex-col justify-center items-center box-border p-10">
          <img src="/lpimage.webp" alt="Discussion" className="p-4" />
        </div>
      </div>
    </Container>
  );
};

const Feature2Section: React.FC = () => {
  return (
    <Container isColored>
      <div className={`flex flex-col sm:flex-row max-w-screen-lg gap-2 mx-auto w-full`}>
        <div className="flex flex-col justify-center  min-w-[50%] py-4 box-border">
          <h2 className="text-xl font-bold underline pb-2 decoration-sub-yellow decoration-4">特徴 2</h2>
          <h3 className="text-3xl font-bold text-main-blue">年収フィルタリング</h3>
          <div className="pt-4">
            年収800万円以上に限定することにより、
            Neutro Netでは、同じ生活レベルの人々との有意義な情報交換を通じて、賢いコミュニティを構築します。
          </div>
        </div>
        <div className="flex flex-col justify-center items-center box-border p-10">
          <img src="/lpimage.webp" alt="Discussion" className="p-4" />
        </div>
      </div>
    </Container>
  );
};

const Feature3Section: React.FC = async () => {
  const session = await getServerSession(authOptions);
  return (
    <Container>
      <div className={`flex flex-col sm:flex-row-reverse max-w-screen-lg gap-2 mx-auto w-full`}>
        <div className="flex flex-col justify-center  min-w-[50%] py-4 box-border">
          <h2 className="text-xl font-bold underline pb-2 decoration-sub-yellow decoration-4">特徴 3</h2>
          <h3 className="text-3xl font-bold text-main-blue">高度で知的な会話</h3>
          <div className="pt-4">
            多角的な視点と建設的な対話で、知的な会話の場を提供します。
          </div>
        </div>
        <div className="flex flex-col justify-center items-center box-border p-10">
          <img src="/lpimage.webp" alt="Discussion" className="p-4" />
        </div>
      </div>
      {
        session ? <Link href="/threads" className="mt-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          コミュニティサイトへ移動
        </Link> : <>
          <SigninButton />
        </>
      }
    </Container>
  );
};


const Container: React.FC<{ isColored?: boolean, children: React.ReactNode }> = ({ isColored, children }) => {
  return (
    <section className={`p-8 flex flex-col justify-center items-center ${isColored ? "bg-slate-200" : ""}`}>
        {children}
    </section>
  );
}