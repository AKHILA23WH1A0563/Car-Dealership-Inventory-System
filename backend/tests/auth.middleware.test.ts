import { Request, Response, NextFunction } from "express";
import { authenticate } from "../src/middleware/auth.middleware";
import jwt from "jsonwebtoken";

describe("JWT Authentication Middleware", () => {
  it("should reject a request without a token", () => {
    const req = {
      headers: {},
    } as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as unknown as Response;

    const next = jest.fn() as NextFunction;

    authenticate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: "Authentication required",
    });

    expect(next).not.toHaveBeenCalled();
  });
  it("should reject an invalid token", () => {
  const req = {
    headers: {
      authorization: "Bearer invalid-token",
    },
  } as Request;

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  } as unknown as Response;

  const next = jest.fn() as NextFunction;

  authenticate(req, res, next);

  expect(res.status).toHaveBeenCalledWith(401);
  expect(res.json).toHaveBeenCalledWith({
    message: "Invalid token",
  });

  expect(next).not.toHaveBeenCalled();
});
it("should allow a request with a valid token", () => {
  const token = jwt.sign(
    { userId: "123" },
    process.env.JWT_SECRET || "secret"
  );

  const req = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  } as Request;

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  } as unknown as Response;

  const next = jest.fn() as NextFunction;

  authenticate(req, res, next);

  expect(next).toHaveBeenCalled();
});
it("should attach decoded user information to the request", () => {
  const token = jwt.sign(
    { userId: "123", email: "test@example.com" },
    process.env.JWT_SECRET || "secret"
  );

  const req = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  } as Request & { user?: any };

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  } as unknown as Response;

  const next = jest.fn() as NextFunction;

  authenticate(req, res, next);

  expect(req.user).toEqual(
    expect.objectContaining({
      userId: "123",
      email: "test@example.com",
    })
  );

  expect(next).toHaveBeenCalled();
});
it("should reject an invalid authorization header", () => {
  const req = {
    headers: {
      authorization: "InvalidFormat token",
    },
  } as Request;

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  } as unknown as Response;

  const next = jest.fn() as NextFunction;

  authenticate(req, res, next);

  expect(res.status).toHaveBeenCalledWith(401);
  expect(res.json).toHaveBeenCalledWith({
    message: "Authentication required",
  });

  expect(next).not.toHaveBeenCalled();
});
});