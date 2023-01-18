import { Request, Response, Router } from "express";
import GetGifsController from "../modules/gifs/useCases/GetGifsController";
import GetGifsUseCase from "../modules/gifs/useCases/GetGifsUseCase";

const gifsRoutes = Router();

const getGifsController = new GetGifsController(new GetGifsUseCase());

gifsRoutes.post("/", (request: Request, response: Response) => {
    return getGifsController.handle(request, response);
});

export default gifsRoutes;