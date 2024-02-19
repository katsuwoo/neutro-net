import {NextRequest, NextResponse} from 'next/server'
import { ListNotificationsResponseType, listNotificationsSchema } from '@/lib/schema/notification'
import { ErrorResponseType, handleApiError } from '@/lib/errors'
import { validate } from '@/lib/validation'
import { listNotifications } from '@/lib/db/notification'

export async function GET(request: NextRequest): Promise<NextResponse<ListNotificationsResponseType | ErrorResponseType>> {
  try {
    const { user, data } = await validate(await request.nextUrl.searchParams, listNotificationsSchema)
    return NextResponse.json(
      await listNotifications({userId: user.id, prevId: data.prevId}), 
      {status: 200}
    )
  } catch (error) {
    return handleApiError({error})
  }
}