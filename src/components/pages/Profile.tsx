import { authOptions } from "@/lib/nextauth-options";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import { SALARY_RANGES, JOB_CATEGORIES, BUSINESS_TYPES } from "@/constants";
import BusinessTypeDropdown from "../BusinessTypeDropdown";
import JobCategoryDropdown from "../JobCategoryDropdown";
import NameInput from "../NameInput";

const ProfilePageComponent: React.FC = async () => {
  const session = await getServerSession(authOptions);
  if (!session || session.user.salary === null) {
    redirect("/");
  }
  const sr = SALARY_RANGES.find((sr) => sr.id === session.user.salary!.sr)!;
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: session.user.id,
      salaryRangeId: session.user.salary.sr,
    },
    select: {
      name: true,
      jobCategoryId: true,
      businessTypeId: true,
      email: true,
    }
  });
  return (
    <div className="flex flex-col pb-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-xl border-b-2 p-2">プロフィール</h1>
        <div className="flex flex-col p-2 gap-5">
          <p>ID: {session.user.id}</p>
          <div>
            <p>名前</p>
            <NameInput initialValue={user.name} />
          </div>
          <div>
            <p>業種</p>
            <BusinessTypeDropdown initialSelected={user.businessTypeId} />
          </div>
          <div>
            <p>職種</p>
            <JobCategoryDropdown initialSelected={user.jobCategoryId} />
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