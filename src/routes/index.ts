import { Router } from "express";

const router = Router();

router.get("/", (req, res, next) => {
  try {
    res.status(200).json({ success: true, message: "Welcome  api. v1" });
  } catch (error) {
    next(error);
  }
});

export default router;
