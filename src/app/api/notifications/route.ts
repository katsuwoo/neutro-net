import {NextRequest, NextResponse} from 'next/server'
import { ListNotificationsResponseType, listNotificationsSchema } from '@/lib/schema/notification'
import { ErrorResponseType, handleApiError } from '@/lib/errors'
import { validate } from '@/lib/validation'
import { listNotifications } from '@/lib/db/notification'

export async function GET(request: NextRequest): Promise<NextResponse<ListNotificationsResponseType | ErrorResponseType>> {
  try {
    const params = Object.fromEntries(request.nextUrl.searchParams)
    const { user, data } = await validate(params, listNotificationsSchema)
    return NextResponse.json(
      await listNotifications({userId: user.id, prevId: data.prevId}), 
      {status: 200}
    )
  } catch (error) {
    return handleApiError({error})
  }
}