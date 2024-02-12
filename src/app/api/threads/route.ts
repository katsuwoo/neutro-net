import {NextRequest, NextResponse} from 'next/server'
import { z } from 'zod'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/nextauth-options'
import { TITLE_LENGTH, CONTENT_LENGTH } from '@/types/constants'

const createThreadSchema = z.object({
  title: z.string().min(1).max(TITLE_LENGTH),
  genre: z.number().int().min(0).max(999),
  content: z.string().min(1).max(CONTENT_LENGTH)
})

export type CreateThreadRequestType = z.infer<
  typeof createThreadSchema
>

export type CreateThreadResponseType = {
  threadId: number
  commentId: number
} | {
  message: string
}

export async function POST(request: NextRequest): Promise<NextResponse<CreateThreadResponseType>> {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.salary === null) {
      return NextResponse.json({
        message: "Unauthorized"
      }, { status: 403 })
    }
    const sr = session.user.salary.sr
    const result = createThreadSchema.safeParse(await request.json());
    if (!result.success) {
      return NextResponse.json({
        message: "error"
      }, { status: 400 })
    }
    const res = await prisma.$transaction(async (prisma) => {
      const res1 = await prisma.comment.create({
        data: {
          userId: session.user.id,
          body: result.data.content
        }
      })
      const res2 = await prisma.thread.create({
        data: {
          title: result.data.title,
          salaryRangeId: sr /* add the value for salaryRange */,
          genreId: result.data.genre,
          initialCommentId: res1.id
        }
      })
      return {
        threadId: res2.id,
        commentId: res1.id,
      }
    })
    return NextResponse.json(res, {status: 201})

  } catch (error) {
    console.log(error)
    return NextResponse.json({
      message: "error"
    }, { status: 500 })
  }
}