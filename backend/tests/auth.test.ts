import request from "supertest";
import app from "../src/app";

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
  it("should reject registration with an existing email", async () => {
  await request(app)
    .post("/api/auth/register")
    .send({
      name: "First User",
      email: "duplicate@example.com",
      password: "Password@123",
    });

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
});