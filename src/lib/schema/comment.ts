import { CONTENT_LENGTH } from "@/constants"
import { z } from "zod"

export type CommentType = {
  thread?: {
    title: string;
    genre: string;
  } | undefined,
  id: number;
  threadId: number;
  author: string;
  date: string;
  content: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  isBookmarked: boolean;
};

export const createCommentSchema = z.object({
  toCommentId: z.number().int().min(1),
  threadId: z.number().int().min(1),
  content: z.string().min(1).max(CONTENT_LENGTH)
})

export type CreateCommentRequestType = z.infer<
  typeof createCommentSchema
>

export type CreateCommentResponseType = {
  commentId: number
}