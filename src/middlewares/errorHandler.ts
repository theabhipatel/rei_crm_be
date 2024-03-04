import { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  try {
    console.log("--------------> catched Error <----------------");
    console.log(err);
    console.log("--------------> catched Error End! <----------------");

    res.status(500).json({ success: false, message: "Something went wrong." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Something went wrong." });
  }
};
