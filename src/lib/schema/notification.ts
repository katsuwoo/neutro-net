import { NotificationType } from "@prisma/client";
import { z } from "zod"

export type NotificationComponentType = {
  id: number;
  type: NotificationType
  message: string;
  quote: string;
  url: string;
}

export const listNotificationsSchema = z.object({
  prevId: z.number().int().min(0).optional(),
})

export type ListNotificationsRequestType = z.infer<typeof listNotificationsSchema>

export type ListNotificationsResponseType =  NotificationComponentType[]