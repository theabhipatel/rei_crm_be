import express from "express";
import { errorHandler } from "./middlewares/errorHandler";
import router from "./routes";
import cors from "cors";
import { DB_URL, HOST_NAME, PORT } from "./config";
import { connectDb } from "./utils/connectDB";
import { deserializeUser } from "./middlewares/deserializeUser";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";

const app = express();

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 10,
});

/** ---> registering middlewares */
app.use(helmet());
app.use(limiter);
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(mongoSanitize());
app.use(cors());
app.use(cookieParser());
app.use(deserializeUser);

/** ---> handling home route. */
app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "Welcome to REI-CRM home api." });
});

/** ---> handling all routes. */
app.use("/api/v1", router);

/** ---> handling not found page. */
app.use("*", (req, res) => {
  res.status(404).json({ success: false, message: "Route not found." });
});

/** ---> handling errors globally. */
app.use(errorHandler);

/** ---> listening server and making connection to database. */
app.listen(Number(PORT), HOST_NAME, () => {
  console.log(`server is runnig at http://${HOST_NAME}:${PORT}`);
  connectDb(DB_URL);
});
