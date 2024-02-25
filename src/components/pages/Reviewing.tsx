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
          以下より収入証明書（源泉徴収票等）の提出をお願いします。
        </p>
        <Link 
          href="https://docs.google.com/forms/d/e/1FAIpQLSeuXqT5NkBtfiOcTAsjCBv0qagms91TjjMwu_hy5hBcVYr8RA/viewform?usp=pp_url&entry.1764115165=%E5%B9%B4%E5%8F%8E800%E4%B8%87%E5%86%86%E4%BB%A5%E4%B8%8A%E3%81%AE%E3%82%B3%E3%83%9F%E3%83%A5%E3%83%8B%E3%83%86%E3%82%A3" 
          className='text-sub-blue underline decoration-sub-blue'>
          提出用フォーム
          </Link>
        <p>
          収入証明書を提出済みの方はサイトオープン (3月中予定) までお待ちください。
          リリース予定日と審査結果はメールにて後日ご連絡いたします。
          {/* 今しばらくお待ちください。審査結果が出次第、メールにてご連絡いたします。 */}
        </p>
      </div>
    </div>
  );
};

export default ReviewingPageComponent;