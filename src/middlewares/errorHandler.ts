import { Request, Response, NextFunction } from 'express';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack); // Log the error stack trace for debugging

  // Set appropriate status code based on the error type
  let statusCode = 500; // Internal server error by default
  if (err.name === 'ValidationError') {
    statusCode = 400; // Bad request for validation errors
  } else if (err.name === 'UnauthorizedError') {
    statusCode = 401; // Unauthorized for authorization errors
  } else if (err.name === 'NotFoundError') {
    statusCode = 404; // Not found for resource not found errors
  }

  // Send an error response with a generic message and optional details
  res.status(statusCode).json({
    message: 'An error occurred',
    errors: 'errors' in err ? err.errors : undefined, 
  });

  // Pass the error on for further handling (optional)
  // next(err);
};
