import 'dotenv/config';
import {validationErrors} from '../src/middlewares.js';
import {test} from "@playwright/test";

describe('validationErrors middleware', () => {
  test('no validation errors', async () => {
    const req = { body: {} };
    const res = {};
    const next = jest.fn();

    validationErrors(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  test('validation errors', async () => {
    const req = {
      body: {
        email: 'invalidEmail',
        password: 'short'
      }
    };
    const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
    const next = jest.fn();

    validationErrors(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith('email: Invalid value, password: Invalid value');
    expect(next).not.toHaveBeenCalled();
  });

});
