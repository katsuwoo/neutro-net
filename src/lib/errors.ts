import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

import { ZodError } from "zod";

/* eslint-disable max-classes-per-file */
export const errors = {
  400: { message: "Bad Request" },
  401: { message: "Unauthorized" },
  403: { message: "Forbidden" },
  404: { message: "Not Found" },
  500: { message: "Internal Server Error" },
} as const;

export type ErrorType = keyof typeof errors;
export type Errors = typeof errors;
export type ErrorsMessage = {
  [T in ErrorType]: Errors[T]["message"];
}[ErrorType];

export type Error = {
  status: ErrorType;
  message: ErrorsMessage;
};

export type ErrorResponseType = {
  message: ErrorsMessage
};

export class HttpError extends Error {
  message: ErrorsMessage;

  constructor(public status: ErrorType) {
    super();
    this.message = errors[status].message;
    this.status = status;
  }

  throwMessage() {
    return { message: this.message, status: this.status };
  }
}

export class BadRequestError extends HttpError {
  constructor() {
    super(400);
  }
}

export class UnauthorizedError extends HttpError {
  constructor() {
    super(401);
  }
}

export class ForbiddenError extends HttpError {
  constructor() {
    super(403);
  }
}

export class NotFoundError extends HttpError {
  constructor() {
    super(404);
  }
}

export class InternalServerError extends HttpError {
  constructor() {
    super(500);
  }
}

export const throwHttpErrorFromStatus = (status: ErrorType): never => {
  switch (status) {
    case 400:
      throw new BadRequestError();
    case 401:
      throw new UnauthorizedError();
    case 403:
      throw new ForbiddenError();
    case 404:
      throw new NotFoundError();
    case 500:
      throw new InternalServerError();
    default:
      throw new InternalServerError();
  }
};

export const handleApiError = ({ error }: { error: unknown }): NextResponse<ErrorResponseType> => {
  if (error instanceof ZodError) {
    const status = 400;
    const { message } = errors[status];

    return NextResponse.json({ message }, { status });
  }

  if (error instanceof UnauthorizedError) {
    const status = 401;
    const { message } = errors[status];

    return NextResponse.json({ message }, { status });
  }

  if (error instanceof ForbiddenError) {
    const status = 403;
    const { message } = errors[status];

    return NextResponse.json({ message }, { status });
  }

  if (error instanceof HttpError) {
    const { status, message } = error.throwMessage();

    return NextResponse.json({ message }, { status });
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    const status = 404;
    const { message } = errors[status];

    return NextResponse.json({ message }, { status });
  }

  if (error instanceof Prisma.PrismaClientValidationError) {
    const status = 404;
    const { message } = errors[status];

    return NextResponse.json({ message }, { status });
  }

  const status = 500;

  const { message } = errors[status];

  return NextResponse.json({ message }, { status });
};