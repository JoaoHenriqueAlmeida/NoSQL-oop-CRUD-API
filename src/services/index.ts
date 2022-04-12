import { ZodError } from 'zod';
import MongoModel from '../models/MongoModel';

export default abstract class Services<T> {
  constructor(protected model: MongoModel<T>) {}

  public async create(object:T): Promise<T | null | ZodError> {
    return this.model.create(object);
  }

  read = async (): Promise<T[]> => this.model.read();

  readOne = async (id:string): Promise<T | null> =>
    this.model.readOne(id);

  update = async (id:string): Promise<T | null> =>
    this.model.readOne(id);

  delete = async (id:string): Promise<T | null> =>
    this.model.delete(id);
}
