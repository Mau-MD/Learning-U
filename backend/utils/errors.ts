export class ExpressError extends Error {
  status = 400;

  constructor(message: string, status: number) {
    super();
    this.message = message;
    this.status = status;
  }
}

export class BadRequestError extends ExpressError {
  constructor(message = "Bad request") {
    super(message, 400);
  }
}

export class NotFoundError extends ExpressError {
  constructor(message = "Not found") {
    super(message, 404);
  }
}
