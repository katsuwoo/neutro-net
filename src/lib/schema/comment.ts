import { COMMENT_LENGTH } from "@/constants"
import { z } from "zod"

export type CommentWithTitle = {
  id: number;
  genre: string;
  title: string;
  content: string;
  author: string;
  date: string;
  likes: number;
  isLiked: boolean;
  isBookmarked: boolean;
  comments: number;
  commentList: CommentType[];
}

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

export const listCommentsSchema = z.object({
  toCommentId: z.number().int().min(1).optional(),
  prevId: z.number().int().optional(),
})

export type ListCommentsRequestType = z.infer<
  typeof listCommentsSchema
>

export type ListCommentsResponseType = CommentType[]

export const createCommentSchema = z.object({
  toCommentId: z.number().int().min(1),
  threadId: z.number().int().min(1),
  content: z.string().min(1).max(COMMENT_LENGTH)
})

export type CreateCommentRequestType = z.infer<
  typeof createCommentSchema
>

export type CreateCommentResponseType = {
  commentId: number
}