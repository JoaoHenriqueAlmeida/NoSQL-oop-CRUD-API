import { model as createModel, Document, Schema } from 'mongoose';
import { Car } from '../interfaces/CarInterface';
import MongoModel from './MongoModel';

interface CarDocument extends Car, Document {}

const carSchema = new Schema<CarDocument>({
  model: String,
  year: Number,
  color: String,
  status: { type: String, required: false },
  buyValue: Number,
  doorsQty: Number,
  seatsQty: Number,
});

export default class CarModel extends MongoModel<Car> {
  constructor(model = createModel('Car', carSchema)) {
    super(model);
  }
}
