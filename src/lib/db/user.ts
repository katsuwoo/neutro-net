import prisma from "../prisma";
import { PatchMeRequestType } from "../schema/user";

export const patchUser = async (req: {
  userId: string,
} & PatchMeRequestType) => {
  const { userId, name, businessTypeId, jobCategoryId } = req
  console.log(req)
  await prisma.user.update({
    where: { id: userId },
    data: {
      name,
      businessTypeId,
      jobCategoryId,
    },
  })
  return {}
}