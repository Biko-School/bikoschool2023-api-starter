import express, { Express, Request, Response } from "express";
import morgan from "morgan";
import { createRoutes } from "./routes";
import { LowdbSync } from "lowdb";
import { DatabaseSchema } from "./DatabaseSchema";

export function createApp(db: LowdbSync<DatabaseSchema>) {
  const app: Express = express();
  // Shows request log on terminal
  // https://github.com/expressjs/morgan
  if (process.env.NODE_ENV !== "test") {
    app.use(morgan("dev"));
  }
  // Parses incoming requests with JSON payloads
  // http://expressjs.com/es/api.html#express.json
  app.use(express.json());
  // Parses incoming requests with urlencoded payloads
  // http://expressjs.com/es/api.html#express.urlencoded
  app.use(express.urlencoded({ extended: false }));

  app.use("/api", createRoutes(db));

  return app;
}
