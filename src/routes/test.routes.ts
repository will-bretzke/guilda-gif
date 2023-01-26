import { Request, Response, Router } from "express";
import LoadTestController from "../modules/loadTest/useCases/LoadTestController";
import LoadTestUseCase from "../modules/loadTest/useCases/LoadTestUseCase";

const loadTestRouter = Router();

const loadTestController = new LoadTestController(new LoadTestUseCase());

loadTestRouter.get("/", (request: Request, response: Response) => {
    return loadTestController.handle(request, response);
});

export default loadTestRouter;