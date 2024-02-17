import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { validate } from '@/lib/validation';
import { ErrorResponseType, handleApiError } from '@/lib/errors';
import { createBookmarkSchema, deleteBookmarkSchema } from "@/lib/schema/bookmark";
import { createBookmark, deleteBookmark } from "@/lib/db/bookmark";

export async function POST(request: NextRequest): Promise<
  NextResponse<{} | ErrorResponseType>
> {
  try {
    const { user, data} = await validate(await request.json(), createBookmarkSchema)
    await createBookmark({data, userId: user.id})

    return NextResponse.json({}, { status: 201 });
  } catch (error) {
    return handleApiError({ error });
  }
}

export async function DELETE(request: NextRequest): Promise<
  NextResponse<{} | ErrorResponseType>
> {
  try {
    const { user, data} = await validate(await request.json(), deleteBookmarkSchema)
    await deleteBookmark({data, userId: user.id})

    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    return handleApiError({ error });
  }
}