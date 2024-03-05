import { NextFunction, Request, Response } from "express";
import { ZodError, ZodSchema } from "zod";

export const validateInput = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        params: req.params,
        query: req.query,
      });

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(422).json({ success: false, message: error.errors[0].message });
      }
      next(error);
    }
  };
};
