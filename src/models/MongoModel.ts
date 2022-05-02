import { Model as M, Document } from 'mongoose';
import { Model } from '../interfaces/ModelInterface';

export default class MongoModel<T> implements Model<T> {
  constructor(protected model: M<T & Document>) {}

  create = async (object: T): Promise<T> => this.model.create({ ...object });

  read = async (): Promise<T[]> => this.model.find();

  readOne = async (id:string): Promise<T | null> =>
    this.model.findOne({ _id: id });

  update = async (id:string, obj:T): Promise<T | null> =>
    this.model.findOneAndUpdate({ _id: id }, { ...obj });

  delete = async (id:string): Promise<T | null> =>
    this.model.findOneAndDelete({ _id: id });
}
