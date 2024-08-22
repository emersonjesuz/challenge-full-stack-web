import request from "supertest";
import { app } from "../app";
import { poolDb } from "config/database";

const userCorrect = {
  email: "admin@email.com",
  password: "admin123",
};

const userIncorrect = {
  email: "unregistered@email.com",
  password: "admin123",
};

const userIncorrectPassword = {
  email: "admin@email.com",
  password: "admin1234",
};

afterAll(async () => {
  await poolDb.end();
});

describe("POST /signIn", () => {
  it("must be able to login", async () => {
    const response = await request(app).post("/signIn").send(userCorrect);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });

  it("It should not be possible to log in without sending the email and password fields", async () => {
    const response = await request(app).post("/signIn").send({});

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  it("It should not be possible to log in by just sending the email field", async () => {
    const response = await request(app)
      .post("/signIn")
      .send({ email: userCorrect.email });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  it("It should not be possible to log in by just sending the password field", async () => {
    const response = await request(app)
      .post("/signIn")
      .send({ password: userCorrect.password });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  it("should not be possible to log in with an unregistered user", async () => {
    const response = await request(app).post("/signIn").send(userIncorrect);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
  });

  it("should not be possible to log in with an incorrect password", async () => {
    const response = await request(app)
      .post("/signIn")
      .send(userIncorrectPassword);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });
});
