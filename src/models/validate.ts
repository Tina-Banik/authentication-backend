import { Request, Response, NextFunction } from "express";
import { ZodError, ZodType, ZodIssue } from "zod";
import { ValidationError } from "../shared/exceptions/ApiError";

// export const validate = (schema: ZodType) => {
//   return async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       await schema.parseAsync({
//         body: req.body,
//         query: req.query,
//         params: req.params,
//       });
//       return next();
//     } catch (error) {
//       if (error instanceof ZodError) {
//         const errors = error.errors.reduce((acc: Record<string, string[]>, curr:any) => {
//           // Extract the field name from the path (removing 'body.', 'query.', etc.)
//           const pathParts = curr.path;
//           const field = pathParts.length > 1 ? pathParts.slice(1).join(".") : pathParts[0];

//           if (!acc[field]) {
//             acc[field] = [];
//           }
//           acc[field].push(curr.message);
//           return acc;
//         }, {});

//         return next(new ValidationError("Validation failed", errors));
//       }
//       return next(error);
//     }
//   };
// };

export const validate = (schema: ZodType) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors = error.issues.reduce<Record<string, string[]>>(
          (acc, issue) => {
            const field = issue.path.join(".") || "unknown";

            if (!acc[field]) {
              acc[field] = [];
            }

            acc[field].push(issue.message);
            return acc;
          },
          {},
        );

        return next(new ValidationError("Validation failed", formattedErrors));
      }

      return next(error);
    }
  };
};
