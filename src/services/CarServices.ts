import Services, { ServiceError } from '.';
import CarModel from '../models/CarModel';
import CarSchema, { Car } from '../interfaces/CarInterface';

export default class CarServices extends Services<Car> {
  constructor(model = new CarModel()) {
    super(model);
  }

  create = async (obj:Car):Promise<Car | ServiceError | null> => {
    const parsed = CarSchema.safeParse(obj);
    if (!parsed.success) {
      return { error: parsed.error };
    }
    return this.model.create(obj);
  };

  update = async (id:string, obj:Car):Promise<Car | ServiceError | null> => {
    const parsed = CarSchema.safeParse(obj);
    if (!parsed.success) {
      return { error: parsed.error };
    }

    return this.model.update(id, obj);
  };
}
