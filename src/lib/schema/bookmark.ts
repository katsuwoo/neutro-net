import { z } from "zod";
import { createLikeSchema } from "./like";

export const createBookmarkSchema = createLikeSchema

export type CreateBookmarkRequestType = z.infer<typeof createBookmarkSchema>;

export const deleteBookmarkSchema = createBookmarkSchema

export type DeleteBookmarkRequestType = z.infer<typeof deleteBookmarkSchema>;