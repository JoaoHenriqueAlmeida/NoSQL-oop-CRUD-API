import { z } from 'zod';
import VehicleSchema from './VehicleInterface';

const CarSchema = VehicleSchema.extend({
  doorsQty: z.number().gte(2).lte(4),
  seatsQty: z.number().gte(2).lte(7),
});

export default CarSchema;
export type Car = z.infer<typeof CarSchema>;
