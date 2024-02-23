import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare } from "@fortawesome/free-regular-svg-icons";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { getServerSession } from "next-auth";
import SigninButton from "@/components/SigninButton";
import { authOptions } from "@/lib/nextauth-options";
import Link from "next/link";
import SignOutSpan from "@/components/SignOutSpan";
import Image from "next/image";
import Footer from "../Footer";

const MoveToCommunityButton: React.FC = () => {
  return (
    <Link href="/threads" 
      className="bg-sub-blue hover:bg-main-blue text-white font-bold py-4 px-8 rounded-3xl" 
    >
      コミュニティサイトへ移動
    </Link>
  );
}

const TopPageComponent: React.FC = async() => {
  const session = await getServerSession(authOptions);
  return (
    <>
      <header className="bg-blue-800 relative bg-cover bg-no-repeat bg-hero" >
        <div className="absolute top-0 left-0 w-full h-full bg-main-blue/70 z-10"/>
        <div className="flex flex-col justigy-center items-center z-20 text-white relative">
          <div className="flex justify-between p-4 w-full max-w-screen-md box-border">
            {/* <span className="text-xl font-bold">NeutroNet</span> */}
            <Image src="/whitefontlogo.webp" alt="NeutroNet" width={100} height={15} />
            {/* <Image src="/whitelogo.webp" alt="NeutroNet" width={125} height={25} /> */}
            {session ? <SignOutSpan /> : <></>}
          </div>
          <Image src="/whitelogo.webp" alt="NeutroNet" width={200} height={30} className="mt-10 mb-7"/>
          <div className="flex flex-col justify-center items-center w-full max-w-screen-md p-8 pt-0">
            <div className="mb-10 text-3xl font-bold">
              <span className="underline decoration-sub-yellow decoration-4">年収800万円以上限定</span>
              <br/>
              <span>バイアスフリーSNS</span>
            </div>
            <div className="flex flex-col justify-center items-center">
              <p className="text-center">
                インプ稼ぎやバズり目的の発信が跋扈するSNSに物足りなさを感じるあなたに。<br/>
                本質的な対話を年収フィルタリングで実現。
              </p>
            </div>
            <div className="flex gap-4 justify-center mt-8">
              {
                session ? <MoveToCommunityButton /> : <>
                  {/* <SigninButton body="早速参加してみる" /> */}
                  <SigninButton body="参加登録してみる" />
                </>
              }
            </div>
          </div>
        </div>
      </header>
      <AboutAndPainSection />
      <ConcernsSection />
      <ProcessSection />
      <div className="text-3xl text-center text-main-blue font-bold  pt-6 px-6 bg-white">
        安心してお使いいただくための3つの特徴
      </div>
      <Feature1Section />
      <Feature2Section />
      <Feature3Section />
      {/* <section className="bg-white p-8 m-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-main-blue">ユーザーの声</h2>
          <p className="mt-4">"Neutro Netで、質の高い議論を毎日楽しんでいます。"</p>
      </section> */}
      <Footer />
    </>
  );
}

export default TopPageComponent;

const AboutAndPainSection: React.FC = () => {
  return (
    <Container isColored>
      <div className={`flex flex-col gap-4 justify-center items-center max-w-screen-lg py-2 pb-10 px-3 w-full`}>
        <h2 className="text-3xl font-bold text-main-blue text-center">NeutroNetとは</h2>
        <div>
          <ul className="flex flex-col gap-3 bg-white rounded-lg text-xl p-4 mt-4 sm:mx-14 shadow-md">
            <li>・偏りのない多角的な議論と信憑性が高い情報収集のための<span className="underline decoration-sub-yellow decoration-4">新しいSNS</span>です</li>
            <li>・政治/経済/投資から趣味/ペット/子育てまで、様々な話題について建設的に語り合えます</li>
            <li>・<span className="underline decoration-sub-yellow decoration-4">リテラシーや生活水準が近い人同士</span>での情報交換ができるよう、年収ごとに参加者をフィルタリングしています</li>
          </ul>
          <div className="text-xs sm:mx-14">
            ※初回は、年収800万円以上のコミュニティのみリリース。以降、段階的に年収帯ごとのコミュニティを実装予定。
          </div>
        </div>
      </div>
    </Container>
  );
}


const ConcernsSection: React.FC = async () => {
  const session = await getServerSession(authOptions);
  return (
    <Container>
      <div className={`flex flex-col gap-4 justify-center items-center max-w-screen-lg py-2 pb-10 px-3 w-full`}>
        <h2 className="text-3xl font-bold text-main-blue text-center">既存SNSのお悩み</h2>
        <ul className="flex flex-col gap-4 text-xl pt-4">
          <li className="flex items-center gap-4">
            <div><FontAwesomeIcon icon={faCheckSquare} className="h-5"/></div>
            <span>インプレッション稼ぎが目的の極端な発言の増加</span>
          </li>
          <li className="flex items-center gap-4">
            <div><FontAwesomeIcon icon={faCheckSquare} className="h-5"/></div>
            <span>視野の狭い攻撃的な投稿の拡散</span>
          </li>
          <li className="flex items-center gap-4">
            <div><FontAwesomeIcon icon={faCheckSquare} className="h-5"/></div>
            <span>PRや低品質な情報による情報収集効率の低下</span>
          </li>
        </ul>
        <FontAwesomeIcon icon={faCaretDown} className="h-16 m-[-1rem]" />
        <div className="text-2xl font-bold text-center">
          年収によるフィルタリングで、本質的な議論のできるコミュニティを実現
        </div>
        <div className="mt-6">
          {session ? <MoveToCommunityButton /> : <SigninButton body="年収800万円以上です" />}
        </div>
        {/* （なんかサクラで投稿してキャプチャ貼りたい、ここに挿絵） */}
      </div>
    </Container>
  );
}

const ProcessSection: React.FC = async() => {
  const session = await getServerSession(authOptions);
  return (
    <Container isColored>
      <div className={`flex flex-col gap-4 justify-center items-center max-w-screen-lg py-2 pb-10 px-3 w-full`}>
        <h2 className="text-3xl font-bold text-main-blue text-center">ご利用の流れ</h2>
        <ul className="pt-8 flex flex-col gap-10 sm:flex-row sm:mx-14 sm:gap-4">
          <li className="flex flex-col items-center relative sm:flex-1">
            <h3 className="absolute top-[-14px] tracking-[0.2em] after:ml-[-0.2em] text-xl font-bold text-white bg-main-blue w-24 text-center rounded-lg">Step1</h3>
            <div className="text-left bg-white rounded-lg text-xl p-3 pt-6 h-full w-full">
              アカウントを作成。<br/>
              必須入力項目はメールアドレス・年収のみ！
            </div>
          </li>
          <li className="flex flex-col items-center relative sm:flex-1">
            <h3 className="absolute top-[-14px] tracking-[0.2em] after:ml-[-0.2em] text-xl font-bold text-white bg-main-blue w-24 text-center rounded-lg">Step2</h3>
            <div className="text-left bg-white rounded-lg text-xl p-3 pt-6 h-full w-full">
              総所得がわかる画像をアップロード。<br/>
              収入証明書（源泉徴収票等）の金額部分のみでOK！
            </div>
          </li>
          <li className="flex flex-col items-center relative sm:flex-1">
            <h3 className="absolute top-[-14px] tracking-[0.2em] after:ml-[-0.2em] text-xl font-bold text-white bg-main-blue w-24 text-center rounded-lg">Step3</h3>
            <div className="text-left bg-white rounded-lg text-xl p-3 pt-6 h-full w-full">
              運営者が確認後、2日以内に承認メールを送信。<br/>
              コミュニティへ参加！
            </div>
          </li>
        </ul>
        <div className="mt-6">
          {session ? <MoveToCommunityButton /> : <SigninButton body="早速アカウントを作成" />}
        </div>
      </div>
    </Container>
  );
}


const Feature1Section: React.FC = () => {
  return (
    <Container>
      <div className={`flex flex-col sm:flex-row max-w-screen-lg gap-2 mx-auto w-full`}>
      {/* <div className={`flex flex-col sm:flex-row-reverse max-w-screen-lg gap-2 mx-auto w-full`}> */}
        <div className="flex flex-col justify-center  min-w-[50%] py-4 box-border sm:mx-14">
          <h2 className="text-2xl font-bold underline pb-2 decoration-sub-yellow decoration-4">①匿名性</h2>
          <div className="flex flex-col gap-2 pt-4">
            <div>・収入証明書等は、収入がわかる部分のみお送りいただきます</div>
            <div>・名前や会社名等、収入以外の個人情報が分かる部分を管理者が閲覧・確認することはありません</div>
          </div>
        </div>
        {/* <div className="flex flex-col justify-center items-center box-border p-10">
          <img src="/lpimage.webp" alt="Discussion" className="p-4" />
        </div> */}
      </div>
    </Container>
  );
};

const Feature2Section: React.FC = () => {
  return (
    <Container isColored>
      <div className={`flex flex-col sm:flex-row max-w-screen-lg gap-2 mx-auto w-full sm:mx-10`}>
        <div className="flex flex-col justify-center  min-w-[50%] py-4 box-border sm:mx-14">
          <h2 className="text-2xl font-bold underline pb-2 decoration-sub-yellow decoration-4">②安全性</h2>
          <div className="flex flex-col gap-2 pt-4">
            <div>・お送りいただいた収入証明書等のデータは、コミュニティ参加の認証のみに使用し、認証後は即物理削除いたします</div>
            <div>・コミュニティ参加後は、自分の年収が他のユーザに公開されることはありません</div>
          </div>
        </div>
        {/* <div className="flex flex-col justify-center items-center box-border p-10">
          <img src="/lpimage.webp" alt="Discussion" className="p-4" />
        </div> */}
      </div>
    </Container>
  );
};

const Feature3Section: React.FC = async () => {
  const session = await getServerSession(authOptions);
  return (
    <Container>
      <div className={`flex flex-col sm:flex-row max-w-screen-lg gap-2 mx-auto w-full`}>
      {/* <div className={`flex flex-col sm:flex-row-reverse max-w-screen-lg gap-2 mx-auto w-full mb-10`}> */}
        <div className="flex flex-col justify-center  min-w-[50%] py-4 box-border sm:mx-14">
          <h2 className="text-2xl font-bold underline pb-2 decoration-sub-yellow decoration-4">③信頼性</h2>
          <div className="flex flex-col gap-2 pt-4">
            <div>・収入証明書を提示し、コミュニティごとの基準を満たしたユーザのみが参加できます</div>
          </div>
        </div>
        {/* <div className="flex flex-col justify-center items-center box-border p-10">
          <img src="/lpimage.webp" alt="Discussion" className="p-4" />
        </div> */}
      </div>
      {
        session ? <MoveToCommunityButton /> : <>
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