import { Request, Response } from "express";
import LoadTestUseCase from "./LoadTestUseCase";

export default class LoadTestController {
    constructor(private loadTestUseCase: LoadTestUseCase) {}

    handle(request: Request, response: Response): Response {
        const json = this.loadTestUseCase.execute();

        if (json) {
            return response.json(json);
        }

        return response.status(400).send({
            message: "Error!"
        });
    }
}
