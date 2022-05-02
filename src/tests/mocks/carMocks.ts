
export const postCarsInput = {
  "model": "bmw",
  "year": 1994,
  "color": "blue",
  "buyValue": 582599,
  "doorsQty": 3,
  "seatsQty": 2
};

export const postCarsOutput = {
  _id: "4edd40c86762e0fb12000003",
  model: "bmw",
  year: 1994,
  color: "blue",
  buyValue: 582599,
  seatsQty: 3,
  doorsQty: 2
};

export const safeParseFail = {
  error: {
    issues: [
      {
        code: 'too_small',
        minimum: 3,
        type: 'string',
        inclusive: true,
        message: 'Should be at least 3 characters',
        path: ['model'],
      },
    ],
    name: 'ZodError',
  },
};