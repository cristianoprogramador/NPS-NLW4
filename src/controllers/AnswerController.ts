import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";


class AnswerController {

  // http://localhost:3333/answers/9?u=994c4063-f2ad-4faf-b0c0-80a7e36af6fd

  /**
   * Route Params => Parametros que compoem a rota / 
   */

  async execute(request: Request, response: Response) {
    const { value } = request.params;
    const { u } = request.query

    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository)

    const surveyUser = await surveysUsersRepository.findOne({
      id: String(u)
    });
    if(!surveyUser) {
      throw new AppError("Survey User does not exists!")
      
    }

    surveyUser.value = Number(value)

    await surveysUsersRepository.save(surveyUser)

    return response.json(surveyUser)
  }
}

export { AnswerController }