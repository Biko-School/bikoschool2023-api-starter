import { Router } from "express";
import lowdb from "lowdb";
import FileSync from "lowdb/adapters/FileSync";

interface DatabaseSchema {
  memes: Meme[];
}

interface Meme {}

const adapter = new FileSync<DatabaseSchema>("./data/db.json");
const db = lowdb(adapter);

export const routes = Router();

routes.get("/memes", (req, res) => {
  const memes = db.get("memes").take(50).value();
  res.status(200).json(memes);
});
