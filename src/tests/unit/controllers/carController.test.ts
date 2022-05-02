import { Request, Response } from 'express';
import sinon = require('sinon');
import chai = require('chai');

import CarController from '../../../controllers/CarControllers';
import { postCarsInput, postCarsOutput } from '../../mocks/carMocks';

const { expect } = chai;

describe('Testing CarController layer', () => {
  const carController = new CarController();

  describe('POST on /cars', async () => {
    before(() => sinon.stub(carController.service, 'create').resolves(postCarsOutput));

    const req = { body: postCarsInput };
    const res = { send: sinon.spy() };
    const result = await carController.create(req as Request, res as unknown as Response);

    it('should return the expected object', async () => {
      expect(result).to.be.an('object');
      expect(result).to.have.property('_id');
      expect(result).to.have.property('model');
      expect(result).to.have.property('year');
      expect(result).to.have.property('color');
      expect(result).to.have.property('buyValue');
    });

    after(()=> sinon.restore());
  });

  describe('GET on /cars', async () => {
    before(() => sinon.stub(carController.service, 'read').resolves([postCarsOutput]));

    const req = { body: {} };
    const res = { send: sinon.spy() };
    const result = await carController.read(req as Request, res as unknown as Response);

    it('should return a list of cars', async () => {
      expect(result).to.be.an('array');
    });

    after(()=> sinon.restore());
  });
});
