import { Request, Response } from 'express';
import Controller, { RequestWithBody, ResponseError } from '.';
import CarServices from '../services/CarServices';
import { Car } from '../interfaces/CarInterface';

export default class CarController extends Controller<Car> {
  readonly _route: string;

  constructor(
    service = new CarServices(),
    route = '/cars',
  ) {
    super(service);
    this._route = route;
  }

  get route() { return this._route; }

  create = async (
    req:RequestWithBody<Car>,
    res:Response<Car | ResponseError>,
  ):Promise<typeof res> => {
    const { body } = req;
    try {
      const car = await this.service.create(body);
      if (!car) {
        return res.status(400).json({ error: this.errors.badRequest });
      }
      if ('error' in car) {
        return res.status(400).json({ error: this.errors.badRequest });
      }
      return res.status(201).json(car);
    } catch (error) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  readOne = async (
    req:Request<{ id: string }>,
    res:Response<Car | ResponseError>,
  ):Promise<typeof res> => {
    const { id } = req.params;
    if (!id || id.length < 24) {
      return res.status(400).json({ error: this.errors.requiredId });
    }
    try {
      const car = await this.service.readOne(id);
      return car
        ? res.json(car)
        : res.status(404).json({ error: this.errors.notFound });
    } catch (error) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  update = async (
    req:RequestWithBody<Car>,
    res:Response<Car | ResponseError>,
  ):Promise<typeof res> => {
    const { id } = req.params;
    const { body } = req;
    try {
      const car = await this.service.update(id, body);
      return car
        ? res.json(car)
        : res.status(404).json({ error: this.errors.notFound });
    } catch (error) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  delete = async (
    req:Request<{ id: string }>,
    res:Response<Car | ResponseError>,
  ):Promise<typeof res> => {
    const { id } = req.params;
    try {
      const car = await this.service.delete(id);
      return car
        ? res.json(car)
        : res.status(404).json({ error: this.errors.notFound });
    } catch (error) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };
}
