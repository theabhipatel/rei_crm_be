import express from "express";
import { errorHandler } from "./middlewares/errorHandler";
import router from "./routes";
import cors from "cors";
import { DB_URL, HOST_NAME, PORT } from "./config";
import { connectDb } from "./utils/connectDB";

const app = express();

/** ---> registering middlewares */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

/** ---> handling home route. */
app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "Welcome to REI-CRM home api." });
});

/** ---> TESTING  */
app.use((req, res, next) => {
  res.locals.id = req.body.id;
  next();
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
