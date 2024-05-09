import 'dotenv/config';
import {authenticateToken} from '../src/middlewares.js';
import jwt from 'jsonwebtoken';
import {test} from "@playwright/test";

describe('authenticateToken middleware', () => {
  const payload = {
    userId: 1234,
    username: 'exampleUser'
  };

  test('valid token', async () => {
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    const req = { headers: { authorization: `Bearer ${token}` } };
    const res = {};
    const next = jest.fn();

    authenticateToken(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.locals.user).toEqual(payload);
  });

  test('invalid token', async () => {
    const token = jwt.sign(payload + 'invalid', process.env.JWT_SECRET);
    const req = { headers: { authorization: `Bearer ${token}` } };
    const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
    const next = jest.fn();

    authenticateToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.send).toHaveBeenCalledWith({message: 'invalid token'});
    expect(next).not.toHaveBeenCalled();
  });

  test('no token', async () => {
    const req = { headers: {} };
    const res = { sendStatus: jest.fn() };
    const next = jest.fn();

    authenticateToken(req, res, next);

    expect(res.sendStatus).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });
});
