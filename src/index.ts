import http, { Server } from "http";
import express, { Express, Request, Response } from "express";
import morgan from "morgan";

const app: Express = express();

// Shows request log on terminal
// https://github.com/expressjs/morgan
app.use(morgan("dev"));

// Parses incoming requests with JSON payloads
// http://expressjs.com/es/api.html#express.json
app.use(express.json());

// Parses incoming requests with urlencoded payloads
// http://expressjs.com/es/api.html#express.urlencoded
app.use(express.urlencoded({ extended: false }));

// Routes every path
// http://expressjs.com/es/api.html#app.use
app.use("/", (req: Request, res: Response) => {
  res.json({ data: "index!" });
});

const port: string = process.env.PORT || "3000";

// Assigns setting name to value
// http://expressjs.com/es/api.html#app.set
app.set("port", port);

const server: Server = http.createServer(app);

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

interface ListeningError extends Error {
  syscall?: string;
  code?: string;
}

function onError(error: ListeningError) {
  if (error.syscall !== "listen") {
    throw error;
  }

  switch (error.code) {
    case "EACCES":
      console.error(`${port} requires elevated privileges`);
      process.exit(1);
    case "EADDRINUSE":
      console.error(`${port} is already in use`);
      process.exit(1);
    default:
      throw error;
  }
}

function onListening() {
  console.log(`Listening on ${port}`);
}
