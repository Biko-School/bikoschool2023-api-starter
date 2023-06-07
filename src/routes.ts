import { Request, Response, Router } from "express";

export const routes = Router();

routes.get("/memes", (req: Request, res: Response) => {
    res.sendStatus(200);
});