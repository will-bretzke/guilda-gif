import { Request, Response } from "express";
import GetGifsUseCase from "./GetGifsUseCase";

export default class GetGifsController {
  constructor(private getGifsUseCase: GetGifsUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { authorization } = request.headers;
    let { gif } = request.body;

    if (!authorization) {
      return response.status(401).send({
        message: "Missing authorization!",
      });
    }

    // remove carácteres inválidos
    gif = gif
      .replace(
        /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
        ""
      )
      .trim();

    const gifs = await this.getGifsUseCase.execute({
      gif,
      apiKey: authorization,
    });

    if (gifs) {
      return response.json(gifs);
    }

    return response.status(404).send({
      message: "GIF not found!",
    });
  }
}
