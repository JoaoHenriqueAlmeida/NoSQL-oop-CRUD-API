import * as sinon from 'sinon';
import { expect } from 'chai';

import CarService from '../../../services/CarService';
import { CarSchema } from '../../../interfaces/CarInterface';

import { postCarsInput, postCarsOutput, safeParseFail } from '../mocks/carMocks';

describe('Testing CarService layer', () => {
  const carService = new CarService();

  describe('POST on /cars with bad data', () => {
    before(() => sinon.stub(CarSchema, 'safeParse').returns(safeParseFail as any));

    it('should fail safeParse and return a ZodError', async () => {
      const result = await carService.create(postCarsInput);

      expect(result).to.be.an('object');
      expect(result).not.to.be.deep.equal(postCarsOutput);
    });

    after(() => sinon.restore());
  });

  describe('POST on /cars', () => {
    before(() => sinon.stub(carService, 'create').resolves(postCarsOutput));

    it('should return a new car object', async () => {
      const result = await carService.create(postCarsInput);

      expect(result).to.be.an('object');
      expect(result).to.be.deep.equal(postCarsOutput);
    });

    after(() => sinon.restore());
  });

  describe('GET on /cars', () => {
    before(() => sinon.stub(carService, 'read').resolves([postCarsOutput]));

    it('should return a list of cars', async () => {
      const result = await carService.read();

      expect(result).to.be.an('array');
    });

    after(() => sinon.restore());
  });
});