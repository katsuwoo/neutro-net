import React from 'react';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';

const ReviewingPageComponent: NextPage = () => {
  return (
    <div className='w-screen h-screen flex flex-col justify-center items-center'>
      <div className='border-main-blue border-2 rounded-xl flex flex-col justify-center items-center m-4 p-4 gap-4 max-w-3xl'>
        <Image src="/bluelogo.webp" alt="NeutroNet" width={150} height={30} />
        <p>
          以下より収入証明書（源泉徴収票等）のアップロードをお願いします。
        </p>
        <Link href="https://docs.google.com/forms/d/e/1FAIpQLSeuXqT5NkBtfiOcTAsjCBv0qagms91TjjMwu_hy5hBcVYr8RA/viewform" className='text-sub-blue underline decoration-sub-blue'>アップロード用リンク</Link>
        <p>
          収入証明書のアップロードが完了済みでした今しばらくお待ちください。審査結果が出次第、メールにてご連絡いたします。
        </p>
      </div>
    </div>
  );
};

export default ReviewingPageComponent;