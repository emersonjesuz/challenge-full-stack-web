import request from "supertest";
import { app } from "../app";
import { poolDb } from "config/database";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzI0MzM2OTAwLCJleHAiOjE3MjQ0MjMzMDB9.I1ihIGm2kSCbAHrizeymcYMwSNM1ffNJ7Vk0bct3iow";

const student = {
  name: "José",
  email: "jose@email.com",
  registrationNumber: 1136542,
  cpf: "123.456.719-01",
};

afterAll(async () => {
  await poolDb.end();
});

describe("POST /students", () => {
  it("must be able to register a student", async () => {
    const response = await request(app)
      .post("/students")
      .set("Authorization", `Bearer ${token}`)
      .send(student);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("registrationNumber");
  });

  it("should not be possible to register a student without sending the email, cpf, name, registrationNumber fields", async () => {
    const response = await request(app)
      .post("/students")
      .set("Authorization", `Bearer ${token}`)
      .send({});

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  it("should not be possible to register a student without sending the name field", async () => {
    const response = await request(app)
      .post("/students")
      .set("Authorization", `Bearer ${token}`)
      .send({ ...student, name: "" });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  it("should not be possible to register a student without sending the email field", async () => {
    const response = await request(app)
      .post("/students")
      .set("Authorization", `Bearer ${token}`)
      .send({ ...student, email: "" });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  it("should not be possible to register a student without sending the registrationNumber field", async () => {
    const response = await request(app)
      .post("/students")
      .set("Authorization", `Bearer ${token}`)
      .send({ ...student, registrationNumber: "" });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  it("should not be possible to register a student without sending the cpf field", async () => {
    const response = await request(app)
      .post("/students")
      .set("Authorization", `Bearer ${token}`)
      .send({ ...student, cpf: "" });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  it("should not be possible to register a student whose registration number is already saved in the bank", async () => {
    const response = await request(app)
      .post("/students")
      .set("Authorization", `Bearer ${token}`)
      .send({ ...student, cpf: "123.456.719-20" });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  it("should not be possible to register a student whose cpf is already saved in the bank", async () => {
    const response = await request(app)
      .post("/students")
      .set("Authorization", `Bearer ${token}`)
      .send({ ...student, registrationNumber: "123456" });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });
});

describe("GET /students", () => {
  it("must be able to list all students sorted by registration number and ASC", async () => {
    const response = await request(app)
      .get("/students?by=registrationNumber&type=ASC")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("must be able to list all students sorted by name and ASC", async () => {
    const response = await request(app)
      .get("/students?by=name&type=ASC")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("must be able to list all students sorted by cpf and ASC", async () => {
    const response = await request(app)
      .get("/students?by=cpf&type=ASC")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("should not be possible to bring a list of students if you do not inform the query (by) is different from name, email, registrationNumber or empty", async () => {
    const response = await request(app)
      .get("/students?by=Number&type=DESC")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  it("should not be possible to bring a list of students if you do not inform the query (type) is different from ASC or DESC", async () => {
    const response = await request(app)
      .get("/students?by=name&type=")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  it("must be possible to bring a list of students by searching by name, CPF and registration number", async () => {
    const response = await request(app)
      .get("/students?search=1136542")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe("GET /students/:registrationNumber", () => {
  it("must be able to list a student", async () => {
    const response = await request(app)
      .get(`/students/${student.registrationNumber}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("registrationNumber");
  });

  it("should not be possible to list a student that does not exist", async () => {
    const response = await request(app)
      .get(`/students/100000`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
  });

  it("should not be possible to list a student without sending the registration number", async () => {
    const response = await request(app)
      .get(`/students/`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });
});

describe("PUT /students/:registrationNumber", () => {
  it("must be able to update a student", async () => {
    const response = await request(app)
      .put(`/students/${student.registrationNumber}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ email: "gustavo@email.com", name: "gustavo" });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("registrationNumber");
  });

  it("should not be possible to update a student that does not exist", async () => {
    const response = await request(app)
      .put(`/students/100000`)
      .set("Authorization", `Bearer ${token}`)
      .send({ email: "gustavo@email.com", name: "gustavo" });

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
  });

  it("should not be possible to update a student without sending the name", async () => {
    const response = await request(app)
      .put(`/students/${student.registrationNumber}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ email: "gustavo@email.com" });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  it("should not be possible to update a student without sending the email", async () => {
    const response = await request(app)
      .put(`/students/${student.registrationNumber}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "gustavo" });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });
});

describe("DELETE /students", () => {
  it("must be able to delete a student", async () => {
    const response = await request(app)
      .delete(`/students/${student.registrationNumber}`)
      .set("Authorization", `Bearer ${token}`)
      .send(student);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("registrationNumber");
  });

  it("should not be possible to delete a student that does not exist", async () => {
    const response = await request(app)
      .delete(`/students/100000`)
      .set("Authorization", `Bearer ${token}`)
      .send(student);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
  });
});
