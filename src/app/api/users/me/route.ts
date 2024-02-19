import {NextRequest, NextResponse} from 'next/server'
import { validate } from '@/lib/validation'
import { ErrorResponseType, handleApiError } from '@/lib/errors'
import { patchUser } from '@/lib/db/user'
import { PatchMeResponseType, patchMeSchema } from '@/lib/schema/user'

export async function PATCH(request: NextRequest): Promise<
  NextResponse<PatchMeResponseType | ErrorResponseType>
> {
  try {
    const {user, data} = await validate(await request.json(), patchMeSchema)
    const res = await patchUser({userId: user.id, ...data})
    return NextResponse.json(
      res,
      {status: 200}
    )
  } catch (error) {
    return handleApiError({error})
  }
}