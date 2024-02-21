import React from "react";
import Link from "next/link";

const linkList: {
  text: string,
  href: string,
  newTab?: boolean
}[] = 
[
  {
    text: "プライバシーポリシー",
    href: "/privacy-policy.pdf"
  },
  {
    text: "利用規約",
    href: "/terms-of-service.pdf"
  },
  // {
  //   text: "コミュニティガイドライン",
  //   href: "/community-guidelines"
  // },
  {
    text: "問い合わせ",
    href: "https://docs.google.com/forms/d/e/1FAIpQLSdz_0oJ_I2XVIqB1z_1M_JsjEvUMtjU5Bxd0Cm8QMHIACCFcA/viewform",
    newTab: true
  }
]

const Footer: React.FC = () => {
  return (
    <footer className="bg-main-blue text-white text-center mt-auto">
      <div className='max-w-2xl min-w-80 mx-auto p-4 pt-2'>
        <div className="flex flex-col gap-2 bg-main-blue text-white">
          {linkList.map((link, index) => {
            return (
              <Link 
                href={link.href} 
                key={index} 
                target={link.newTab ? "_blank" : ""} 
                rel={link.newTab ? "noopener noreferrer" : ""}>
                <div className="flex text-base p-2">{link.text}</div>
              </Link>
            )
          })}
        </div>
        <div className='pt-5'>
          © 2024 NeutroNet. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;