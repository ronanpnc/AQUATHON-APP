import { Error } from "mongoose";
import { StatusError } from "../types/common";

export const handleMongooseError = (error): StatusError => {
  console.log(error);
  if (error instanceof Error.ValidationError) {
    return new StatusError('Validation error',400, { errors: error.errors });
  } else if (error instanceof Error.CastError) {
    return new StatusError('Invalid ID format', 400);
  } else if (error.code === 11000) { // Duplicate key error
    return new StatusError('Duplicate key error', 409);
  } else {
    return new StatusError('Database operation failed', 500,{ error });
  }
};
