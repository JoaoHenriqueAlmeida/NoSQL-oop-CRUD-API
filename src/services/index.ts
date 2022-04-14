import { ZodError } from 'zod';
import MongoModel from '../models/MongoModel';

export interface ServiceError {
  error: ZodError;
}

export default abstract class Services<T> {
  constructor(protected model: MongoModel<T>) {}

  public async create(object:T): Promise<T | null | ServiceError> {
    return this.model.create(object);
  }

  public async read(): Promise<T[]> {
    return this.model.read();
  }

  public async readOne(id:string): Promise<T | null | ServiceError> {
    return this.model.readOne(id);
  }

  public async update(id:string): Promise<T | null | ServiceError> {
    return this.model.readOne(id);
  }

  public async delete(id:string):Promise<T | null | ServiceError> {
    return this.model.delete(id);
  }
}
