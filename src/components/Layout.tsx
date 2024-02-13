import React, { PropsWithChildren } from 'react';
import HamburgerMenu from './HamburgerMenu';
import { authOptions } from '@/lib/nextauth-options';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import ReviewingPageComponent from './pages/Reviewing';

const Layout: React.FC<PropsWithChildren > = async ({ children }) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/")
  } else if (session.user.salary === null) {
    return (
      <ReviewingPageComponent />
    )
  }
  return (
    <div className='min-h-screen'>
      <header className='border-b-2'>
        <div className='max-w-3xl min-w-80 mx-auto'>
          <div className="flex justify-between px-4 py-3">
            {/* <h1 className='text-xl'>NeutroNet</h1> */}
            <Link href="/threads">
              <Image src="/bluelogo.png" alt="NeutroNet" width={150} height={30} />
            </Link>
            <div className='flex justify-end'>
              <HamburgerMenu />
            </div>
          </div>
        </div>
      </header>
      <main className='max-w-3xl min-w-80 mx-auto min-h-[calc(100vh-56px-308px)]'>
        {children}
      </main>
      <footer className="bg-main-blue text-white text-center p-4 pt-2">
        <div className='max-w-2xl min-w-80 mx-auto'>
          <div className="flex flex-col gap-2 bg-main-blue text-white">
            <div className="flex text-base p-2">プライバシーポリシー</div>
            <div className="flex text-base p-2">利用規約</div>
            <div className="flex text-base p-2">コミュニティガイドライン</div>
            <div className="flex text-base p-2">問い合わせ</div>
            <div className="flex text-base p-2">ログアウト</div>
          </div>
          <div className='pt-5'>
            © 2024 NeutroNet. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout