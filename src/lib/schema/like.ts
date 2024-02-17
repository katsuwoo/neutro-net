import { z } from "zod";

export const createLikeSchema = z.object({
  commentId: z.number(),
});

export type CreateLikeRequestType = z.infer<typeof createLikeSchema>;

export type CreateLikeResponseType = {
  likes: number;
};

export const deleteLikeSchema = createLikeSchema;

export type DeleteLikeRequestType = z.infer<typeof deleteLikeSchema>;

export type DeleteLikeResponseType = CreateLikeResponseType;