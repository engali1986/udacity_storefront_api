import express, { Application } from "express";
import morgan from "morgan";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import usersRoute from "./routes/usersRoute";
import productsRoute from "./routes/productsRoute";
import ordersRoute from "./routes/ordersRoute";
import ordered from "./routes/ordered_productRoute";
import db from "./database/index";

const app: Application = express();
dotenv.config();

app.use(morgan("common")); // logging middle ware
app.use(helmet()); // security middle ware
app.use(express.json());
app.use(
  rateLimit({
    windowMs: 1 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  })
);

app.use("/api/users", usersRoute); // main users route
app.use("/api/products", productsRoute); // main products route
app.use("/api/orders", ordersRoute); // main orders route
app.use("/api/ordered", ordered); // To list all orderes
app.get("/test", (req: express.Request, res: express.Response) => {
  res.send("Test page");
});

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Test page");
});

app.use((req: express.Request, res: express.Response) => {
  res.status(404).json({
    massage: "Page not found",
  });
});
// Here i will test database connection
db.connect().then((client) => {
  return client
    .query("SELECT NOW()")
    .then((res) => {
      client.release();
      console.log("database connected");
      console.log(res.rows);
    })
    .catch((err) => {
      console.log(err);
    });
});
//----------------------------------------

app.use((err: Error, req: express.Request, res: express.Response) => {
  if (err) {
    res.send("Error");
  } else {
  }
});
app.listen(process.env.port, () => {
  console.log("Running");
});

export default app;
