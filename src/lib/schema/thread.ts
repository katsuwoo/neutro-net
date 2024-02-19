import { COMMENT_LENGTH, TITLE_LENGTH } from "@/constants";
import { z } from "zod";
import { CommentType } from "./comment";

export const listThreadsSchema = z.object({
  prevId: z.number().optional(),
  genre: z.number().int().min(1).optional(),
  bookmarked: z.boolean().optional()
})

export type ListThreadsRequestType = z.infer<
  typeof listThreadsSchema
>

export type ListThreadsResponseType = CommentType[]

export const createThreadSchema = z.object({
  title: z.string().min(1).max(TITLE_LENGTH),
  genre: z.number().int().min(0).max(999),
  content: z.string().min(1).max(COMMENT_LENGTH)
})

export type CreateThreadRequestType = z.infer<
  typeof createThreadSchema
>

export type CreateThreadResponseType = {
  threadId: number
}