import React, { PropsWithChildren } from 'react';
import HamburgerMenu from './HamburgerMenu';
import { authOptions } from '@/lib/options';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import Image from 'next/image';

const Layout: React.FC<PropsWithChildren > = async ({ children }) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/")
  }
  return (
    <div className='max-w-3xl min-w-80 flex flex-col min-h-screen mx-auto'>
      <header>
        <div className="flex justify-between px-4 py-3 border-b-2">
          {/* <h1 className='text-xl'>Neutro Net</h1> */}
          <Image src="/bluelogo.png" alt="Neutro Net" width={150} height={200} />
          <div className='flex justify-end'>
            <HamburgerMenu />
          </div>
        </div>
      </header>
      <main className='h-[calc(100vh-54px)]'>
        {children}
      </main>
    </div>
  );
};

export default Layout