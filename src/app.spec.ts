import { app } from "./app";
import request from "supertest";

describe("/api/memes", () => {
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
