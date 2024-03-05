import { NextFunction, Request, Response } from "express";

export const authorize = (persons: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = res.locals.userId;
      const role = res.locals.role;
      if (!userId) return res.status(401).json({ success: false, message: "Please signin first." });
      if (!persons.includes(role))
        return res.status(403).json({ success: false, message: "You cannot access this route." });

      next();
    } catch (error) {
      next(error);
    }
  };
};

// export const isAgentRoutes: RequestHandler = async (req, res, next) => {
//   try {
//     const userId = res.locals.userId;
//     const role = res.locals.role;
//     if (!userId) return res.status(401).json({ success: false, message: "Please signin first." });

//     if (!agent)
//       return res.status(404).json({ success: false, message: "Your are not agent you cannot access this route." });

//     next();
//   } catch (error) {
//     next(error);
//   }
// };
