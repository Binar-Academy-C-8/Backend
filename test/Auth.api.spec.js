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
    expect(response.text.status).toBe('Register successful');
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
    
    await request(app).post("/api/v1/auth/member/register").send(user).then(res => {
      expect(res.statusCode).toEqual(200);
      expect(res.body.status).toEqual('Register successful');
      expect(res.body).not.toBeFalsy();
      done();
    })
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
  });
});
