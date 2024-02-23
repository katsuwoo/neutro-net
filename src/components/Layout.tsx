import React, { PropsWithChildren } from 'react';
import HamburgerMenu from './HamburgerMenu';
import { authOptions } from '@/lib/nextauth-options';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import ReviewingPageComponent from './pages/Reviewing';
import prisma from '@/lib/prisma';
import NotificationBell from './NotificationBell';
import Footer from './Footer';

const Layout: React.FC<PropsWithChildren > = async ({ children }) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/")
  } else if (session.user.salary === null) {
    return (
      <ReviewingPageComponent />
    )
  }
  const notificationCount = await prisma.notification.count({
    where: {
      userId: session.user.id,
      isRead: false,
    }
  })
  return (
    <div className='min-h-screen flex flex-col'>
      <header className='border-b-2 min-w-screen'>
        <div className='max-w-3xl min-w-80 mx-auto'>
          <div className="flex justify-between px-4 py-3">
            {/* <h1 className='text-xl'>NeutroNet</h1> */}
            <Link href="/threads">
              <Image src="/bluelogo.webp" alt="NeutroNet" width={150} height={30} />
            </Link>
            <div className='flex gap-4 justify-end'>
              <NotificationBell count={notificationCount} />
              <HamburgerMenu />
            </div>
          </div>
        </div>
      </header>
      <main className='mx-auto w-screen max-w-3xl'>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout