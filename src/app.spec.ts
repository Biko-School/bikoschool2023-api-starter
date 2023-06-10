import { createApp } from "./app";
import { Express } from "express";
import request from "supertest";
import FileSync from "lowdb/adapters/FileSync";
import lowdb from "lowdb";
import { DatabaseSchema } from "./DatabaseSchema";

const adapter = new FileSync<DatabaseSchema>("./data/db.json");
const db = lowdb(adapter);

describe("/api/memes", () => {
  let app: Express;

  beforeEach(() => {
    app = createApp(db);
  });

  it("endpoint exists", (done) => {
    request(app).get("/api/memes").expect(200, done);
  });

  it("returns a list", (done) => {
    request(app)
      .get("/api/memes")
      .expect(200)
      .then((response) => {
        expect(response.body).toBeInstanceOf(Array);
        done();
      });
  });

  it("returns a list of 50 memes", (done) => {
    request(app)
      .get("/api/memes")
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveLength(50);
        done();
      });
  });
});
