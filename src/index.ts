import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import routes from "./routes/";
import "express-async-errors";

const app = express();

app.use(express.json());
app.use(routes);

app.use(
  (
    err: Error,
    request: Request,
    response: Response,
    // eslint-disable-next-line
    next: NextFunction
  ) => {
    return response.status(500).json({
      status: "error",
      message: `[Internal server error] ${err.message}`,
    });
  }
);

const PORT = process.env.PORT || 3000;

console.log(PORT);

console.log(process.env);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
