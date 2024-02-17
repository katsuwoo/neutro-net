import prisma from "../prisma"
import { CreateThreadRequestType, CreateThreadResponseType } from "../schema/thread"

export const createThread = async (req: {
  data: CreateThreadRequestType, 
  userId: string, 
  salaryRangeId: string
}): Promise<CreateThreadResponseType> => {
  const { data, userId, salaryRangeId } = req
  const res = await prisma.$transaction(async (prisma) => {
    return await prisma.thread.create({
      data: {
        title: data.title,
        salaryRangeId: salaryRangeId,
        genreId: data.genre,
        comments: {
          create: {
            userId: userId,
            body: data.content,
          }
        },
      }
    })
  })
  return { threadId: res.id }
}