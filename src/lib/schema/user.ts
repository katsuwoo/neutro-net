import { z } from "zod"
import { NAME_LEGNTH } from "@/constants"

export const patchMeSchema = z.object({
  name: z.string().min(1).max(NAME_LEGNTH).optional(),
  businessTypeId: z.number().optional().nullable(),
  jobCategoryId: z.number().optional().nullable(),
})

export type PatchMeRequestType = z.infer<typeof patchMeSchema>

export type PatchMeResponseType = {}