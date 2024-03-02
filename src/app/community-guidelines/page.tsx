import Footer from "@/components/Footer";
import { Metadata, NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

const title = "コミュニティガイドライン | NeutroNet（ニュートロネット）| 年収800万円以上限定SNS"
const description = "NeutroNet（ニュートロネット）は、偏った発言や強い批判の無い、多角的・建設的で有意義な情報収集や議論ができるニュートラルなSNSです。年収帯ごとにコミュニティを分けることで、生活水準の近い人同士で効率よく情報を入手できるようにしています。"

export const metadata: Metadata = {
  title: title,
  description: description,
  keywords: "NeutroNet,ニュートロネット,高収入,アッパーマス",
  openGraph: {
    type: "website",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/community-guidelines`,
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


const CommunityGuidelinesPage: NextPage = () => {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <main 
        className="flex flex-col items-center align-middle pt-5 pb-16 gap-4"
      >
        <div className="px-2">
          <Link href="/">
            <Image src="/NeutroNet_logo_googleform.webp" alt="NeutroNet" width={400} height={100} />
          </Link>
        </div>
        <div className="w-[calc(100%-40px)] max-w-3xl flex flex-col gap-12">
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold">コミュニティガイドライン</h1>
            <p>
            NeutroNetは、偏った発言や強い批判の無い、多角的・建設的で有意義な情報収集や議論ができるニュートラルな場所となることを目指して運営しています。全てのユーザーのみなさんに安心して楽しく使っていただけるよう、また、どんな意見もバイアスなく尊重されるよう、ガイドラインを作成しました。みなさまのご協力が必要となりますので、投稿する前にぜひお読みください。
            </p>
            <p>
            ガイドラインや利用規約に反するユーザーさまやコンテンツを見かけた際は、問い合わせフォームから運営者までご一報いただけますと幸いです。残念ですが、非公開や削除の対象とさせていただくことがありますので、ご理解のほど、よろしくお願いいたします。
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="text-lg font-bold">・偏った発言や根拠のない主張、強い言葉による批判はやめましょう</h1>
            <p>
            NeutroNetは、多角的で建設的な情報収集や議論ができる場所を目指しています。何事にもメリット・デメリットがあり、その見え方は立場によって変わります。<br />
            一側面のみを見て一方的に極端な発言をする行為は、有意義な情報収集や議論をしたいユーザーさまにとってのノイズとなり得るため好ましくないと考えていますので、お控えください。
            </p>
            <p>
            NG例：
            <ul className="pl-6">
              <li>全人類、絶対に〇〇するべき</li>
              <li>××するやつはバカ、無能</li>
              <li>▲▲（大きい主語）はオワコン</li>
            </ul>
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="text-lg font-bold">・間違いを非難したり、価値観・認識の違いを揶揄する表現はやめましょう</h1>
            <p>
            NeutroNetは、ユーザーの皆さまに、ポジティブなものもネガティブなものも自由に投稿・質問いただける場所です。思ったことをつぶやいていただくだけの使用ももちろんOKで、投稿スタイルは人それぞれです。
            </p>
            <p>
            その中では当然、認識の誤りや違いも生じます。そんな場面で、他者を理解しようとせずに一方的に攻撃・非難したり、誹謗中傷する表現はおやめください。
            </p>
            <p>
            思いやりのない短絡的な発言があることで、コミュニティの質が低下したり、投稿の際の心理的安全性が下がったりすることを危惧しています。
            </p>
            <p>
            どうしても価値観が合わないと思う場合は、ミュート機能を実装予定ですので、そちらをお使いください。
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="text-lg font-bold">・虚偽・なりすましは禁止です</h1>
            <p>
            NeutroNetでは、ユーザーさまの年収ごとにコミュニティを分けています（2024年2月時点では、年収800万円以上の人のコミュニティのみ）。これは年収の低い・高いの優劣をつけるためのフィルタリングではなく、生活水準の近しい人同士で情報交換できる場を作ることを目的としています。人によって「有益な情報」は異なり、有益な情報を効率よく入手するには、生活水準が近しい人同士のほうが良いのではないかと考えたためです。
            </p>
            <p>
            そのため、他人になりすますことや、収入情報を偽ることは、各コミュニティの情報の質の低下につながりますので、お控えください。
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <p>
            上記の他、いじめ・ハラスメント、差別・ヘイトスピーチ、スパム行為、プライバシーの侵害等はもちろんおやめください。
            </p>
            <p>
            NeutroNetが新たなコミュニケーションや情報収集の場となり、全ユーザーさまに楽しく過ごしていただくために、当ガイドラインおよび利用規約をご覧いただき、ご協力をよろしくお願いいたします。
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CommunityGuidelinesPage;