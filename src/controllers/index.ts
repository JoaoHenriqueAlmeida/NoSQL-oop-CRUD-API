import { Request, Response } from 'express';
import Services from '../services';

export type ResponseError = {
  error:unknown;
};

export interface RequestWithBody<T> extends Request {
  body: T;
}

enum ControllerErrors {
  internal = 'Internal Server Error',
  notFound = 'Object not found',
  requiredId = 'Id must have 24 hexadecimal characters',
  badRequest = 'Bad request',
}

export default abstract class Controller<T> {
  abstract route: string;

  protected errors = ControllerErrors;

  constructor(readonly service: Services<T>) { }

  abstract create(
    req: RequestWithBody<T>,
    res: Response<T | ResponseError>,
  ): Promise<typeof res>;

  read = async (
    _req: Request,
    res: Response<T[] | ResponseError>,
  ):Promise<typeof res> => {
    try {
      const objs = await this.service.read();
      return res.json(objs);
    } catch (error) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  abstract readOne(
    req:Request<{ id:string }>,
    res:Response<T | ResponseError>
  ):Promise<typeof res>;

  abstract update(
    req: RequestWithBody<T>,
    res:Response<T | ResponseError>,
  ):Promise<typeof res>;

  abstract delete(
    req: RequestWithBody<T>,
    res:Response<T | ResponseError>,
  ):Promise<typeof res>;
}
