const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
  it("GET /cafes return 200 status", async () => {
    const response = await request(server).get("/cafes");
    expect(response.statusCode).toBe(200);
  });
  it("GET /cafes return correct data type with at least 1 object", async () => {
    const response = await request(server).get("/cafes");
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(1);
  });
  it("DELETE /cafes with invalid id", async () => {
    const invalidID = 100;
    const response = await request(server)
      .delete(`/cafes/${invalidID}`)
      .set("Authorization", "example");
    expect(response.statusCode).toBe(404);
  });
  it("POST new cafe", async () => {
    const payload = {
      id: 10,
      nombre: "Example1",
    };
    const response = await request(server).post("/cafes").send(payload);
    expect(response.statusCode).toBe(201);
  });
  it("PUT with mismatched ID between query and body", async () => {
    const queryID = 10;
    const bodyID = 11;
    const payload = {
      id: bodyID,
      nombre: "Example1",
    };
    const response = await request(server)
      .put(`/cafes/${queryID}`)
      .send(payload);
    expect(response.statusCode).toBe(400);
  });
});
