import {NextRequest, NextResponse} from 'next/server'
import { z } from 'zod'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/nextauth-options'
import { CONTENT_LENGTH } from '@/types/constants'

const createCommentSchema = z.object({
  toCommentId: z.number().int().min(1),
  content: z.string().min(1).max(CONTENT_LENGTH)
})

export type CreateCommentRequestType = z.infer<
  typeof createCommentSchema
>

export type CreateCommentResponseType = {
  commentId: number
} | {
  message: string
}

export async function POST(request: NextRequest): Promise<NextResponse<CreateCommentResponseType>> {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.salary === null) {
      return NextResponse.json({
        message: "Unauthorized"
      }, { status: 403 })
    }
    const sr = session.user.salary.sr
    const result = createCommentSchema.safeParse(await request.json());
    if (!result.success) {
      return NextResponse.json({
        message: "error"
      }, { status: 400 })
    }
    const res = await prisma.$transaction(async (prisma) => {
      const res1 = await prisma.comment.create({
        data: {
          userId: session.user.id,
          toCommentId: result.data.toCommentId,
          body: result.data.content
        }
      })
      return {
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