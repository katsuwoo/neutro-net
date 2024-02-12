"use client";

import React from "react";

interface Profile {
  id: number;
  name: string;
  job: string;
  email: string;
  birthYear: number;
}

const profile: Profile = {
  id: 1,
  name: "John Doe",
  job: "ソフトウェアエンジニア",
  email: "johndoe@example.com",
  birthYear: 1990,
};

const ProfilePageComponent: React.FC = async () => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col gap-2">
        <h1 className="text-xl border-b-2 p-2">プロフィール</h1>
        <div className="flex flex-col p-2 gap-3">
          <p>ID: {profile.id}</p>
          <div>
            <p>名前</p>
            <div className="flex gap-2" >
              <input type="text" value={profile.name} className="border-2 border-grzay-300 rounded-lg py-1 px-2" />
              <button className="border-2 border-blue-300 rounded-lg py-1 px-2" 
                onClick={() => { profile.name = "Updated Name"; }}>
                変更
              </button>
            </div>
          </div>
          <div>
            <p>職種</p>
            <div className="flex gap-2" >
              <input type="text" value={profile.job} className="border-2 border-grzay-300 rounded-lg py-1 px-2" />
              <button className="border-2 border-blue-300 rounded-lg py-1 px-2" 
                onClick={() => { profile.name = "Updated Name"; }}>
                変更
              </button>
            </div>
          </div>
          <div>
            <p>Email</p>
            <p>{profile.email}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col py-4 gap-2 bg-gray-500 text-white mt-auto">
        <div className="text-base p-2">プライバシーポリシー</div>
        <div className="text-base p-2">利用規約</div>
        <div className="text-base p-2">コミュニティガイドライン</div>
        <div className="text-base p-2">問い合わせ</div>
        <div className="text-base p-2">ログアウト</div>
      </div>
    </div>
  );
};

export default ProfilePageComponent;