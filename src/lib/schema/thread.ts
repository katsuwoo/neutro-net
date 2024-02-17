import { CONTENT_LENGTH, TITLE_LENGTH } from "@/constants";
import { z } from "zod";
import { CommentType } from "./comment";

export type Thread = {
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

export const createThreadSchema = z.object({
  title: z.string().min(1).max(TITLE_LENGTH),
  genre: z.number().int().min(0).max(999),
  content: z.string().min(1).max(CONTENT_LENGTH)
})

export type CreateThreadRequestType = z.infer<
  typeof createThreadSchema
>

export type CreateThreadResponseType = {
  threadId: number
}