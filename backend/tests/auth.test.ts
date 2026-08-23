import request from "supertest";
import app from "../src/app";
import { UserModel } from "../src/models/user";
import bcrypt from "bcrypt";

describe("POST /api/auth/register", () => {
  it("should register a new user successfully", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Test User",
        email: "test@example.com",
        password: "Password@123",
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("User registered successfully");
    expect(response.body).toHaveProperty("user");
    expect(response.body.user.email).toBe("test@example.com");
  });

  it("should reject registration with an existing email", async () => {
    // Seed initial user
    await request(app)
      .post("/api/auth/register")
      .send({
        name: "First User",
        email: "duplicate@example.com",
        password: "Password@123",
      });

    // Attempt duplicate registration
    const response = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Second User",
        email: "duplicate@example.com",
        password: "Password@456",
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("User already exists");
  });
  
it("should not store the password as plain text", async () => {
  const response = await request(app)
    .post("/api/auth/register")
    .send({
      name: "Secure User",
      email: "secure@example.com",
      password: "Password@123",
    });

  expect(response.status).toBe(201);

  expect(response.body.user).not.toHaveProperty("password");
});
it("should save the user in MongoDB", async () => {
  await request(app)
    .post("/api/auth/register")
    .send({
      name: "Mongo User",
      email: "mongo@example.com",
      password: "Password@123",
    });

  const user = await UserModel.findOne({
    email: "mongo@example.com",
  });

  expect(user).not.toBeNull();
  expect(user?.name).toBe("Mongo User");
  expect(user?.email).toBe("mongo@example.com");
});
it("should hash the password before saving", async () => {
  await request(app)
    .post("/api/auth/register")
    .send({
      name: "Hash User",
      email: "hash@example.com",
      password: "Password@123",
    });

  const user = await UserModel.findOne({
    email: "hash@example.com",
  });

  expect(user).not.toBeNull();
  expect(user?.password).not.toBe("Password@123");

  const isPasswordValid = await bcrypt.compare(
    "Password@123",
    user!.password
  );

  expect(isPasswordValid).toBe(true);
});

});
describe("POST /api/auth/login", () => {
  it("should login with valid credentials", async () => {
    await request(app)
      .post("/api/auth/register")
      .send({
        name: "Login User",
        email: "login@example.com",
        password: "Password@123",
      });

    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: "login@example.com",
        password: "Password@123",
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Login successful");
    expect(response.body).toHaveProperty("user");
    expect(response.body.user.email).toBe("login@example.com");
  });
  it("should return a JWT token after successful login", async () => {
  await request(app)
    .post("/api/auth/register")
    .send({
      name: "JWT User",
      email: "jwt@example.com",
      password: "Password@123",
    });

  const response = await request(app)
    .post("/api/auth/login")
    .send({
      email: "jwt@example.com",
      password: "Password@123",
    });

  expect(response.status).toBe(200);
  expect(response.body).toHaveProperty("token");
  expect(typeof response.body.token).toBe("string");
  expect(response.body.token.length).toBeGreaterThan(0);
});
});