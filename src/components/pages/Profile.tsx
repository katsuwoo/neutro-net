import { authOptions } from "@/lib/nextauth-options";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const ProfilePageComponent: React.FC = async () => {
  const session = await getServerSession(authOptions);
  if (!session || session.user.salary === null) {
    redirect("/");
  }
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: session.user.id,
    },
  });
  const sr = await prisma.salaryRange.findUniqueOrThrow({
    where: {
      id: session.user.salary.sr,
    },
  });
  return (
    <div className="flex flex-col pb-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-xl border-b-2 p-2">プロフィール</h1>
        <div className="flex flex-col p-2 gap-3">
          <p>ID: {session.user.id}</p>
          <div>
            <p>名前</p>
            <div className="flex gap-2" >
              <input type="text" value={user.name} className="border-2 border-grzay-300 rounded-lg py-1 px-2" />
              <button className="border-2 border-blue-300 rounded-lg py-1 px-2" >
                変更
              </button>
            </div>
          </div>
          <div>
            <p>職種</p>
            <div className="flex gap-2" >
              <input type="text" value={"エンジニア"} className="border-2 border-grzay-300 rounded-lg py-1 px-2" />
              <button className="border-2 border-blue-300 rounded-lg py-1 px-2" >
                変更
              </button>
            </div>
          </div>
          <div>
            <p>Email</p>
            <p>{session.user.email}</p>
          </div>
          <div>
            <p>登録年収</p>
            <p>{`${session.user.salary.value}万円`}</p>
          </div>
          <div>
            <p>参加コミュニティ</p>
            <p>{sr.max !== null 
                ? `${sr.min} - ${sr.max}万円` 
                : `${sr.min}万円以上`}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePageComponent;