/* eslint-disable */
const request = require("supertest");
const app = require("../app/index");
const { faker } = require("@faker-js/faker");
require("dotenv").config();

describe("API Register", () => {
  it("success register", async () => {
    const user = {
      email: "imamtaufiq133@gmail.com",
      password: "12345678",
      name: "imam",
      phoneNumber: "01234567",
      country: "Indonesia",
      city: "Bandung"
    };
    const response = await request(app).post("/api/v1/auth/member/register").send(user);
    expect(response.statusCode).toBe(200);
  });
  it("Failed register because user password minimum not match", async () => {
    const user = {
      email: "imamtaufiq333@gmail.com",
      password: "123",
      name: "imam",
      phoneNumber: "01234567",
      country: "Indonesia",
      city: "Bandung"
    };
    const response = await request(app).post("/api/v1/auth/member/register").send(user);
    expect(response.statusCode).toBe(400);
    expect(response.message).toBe('Minimum password must be 8 characters')
  });
  it("Failed register because email already exist", async () => {
    const user = {
      email: "imamtaufiq133@gmail.com",
      password: "1234567890",
      name: "imam",
      phoneNumber: "01234567",
      country: "Indonesia",
      city: "Bandung"
    };
    const response = await request(app).post("/api/v1/auth/member/register").send(user);
    expect(response.statusCode).toBe(400);
    expect(response.message).toBe('User email already taken')
  });
});
