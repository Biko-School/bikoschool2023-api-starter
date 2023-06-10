import { Router } from "express";
import { LowdbSync } from "lowdb";
import { DatabaseSchema } from "./DatabaseSchema";

export function createRoutes(db: LowdbSync<DatabaseSchema>) {
  const routes = Router();

  routes.get("/memes", (req, res) => {
    const memes = db.get("memes").take(50).value();
    res.status(200).json(memes);
  });

  return routes;
}
