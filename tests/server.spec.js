const request = require("supertest");
const server = require("../index");
const { faker } = require("@faker-js/faker");

describe("Operaciones CRUD de cafes", () => {
  describe("Operación GET", () => {
    it("GET /cafes return 200 status", async () => {
      const response = await request(server).get("/cafes");
      expect(response.statusCode).toBe(200);
    });
    it("GET /cafes return correct data type", async () => {
      const response = await request(server).get("/cafes");
      expect(response.body).toBeInstanceOf(Array);
    });
    it("GET /cafes return with at least 1 object", async () => {
      const response = await request(server).get("/cafes");
      expect(response.body.length).toBeGreaterThan(1);
    });
    //MORE CASES: GET with an ID, valid and invalid
  });
  describe("Operación DELETE", () => {
    it("DELETE /cafes with invalid id", async () => {
      const invalidID = faker.number.int({ min: 5 });
      console.log(invalidID);
      const response = await request(server)
        .delete(`/cafes/${invalidID}`)
        .set("Authorization", "example");
      expect(response.statusCode).toBe(404);
    });
    //MORE CASES: Without token
  });
  describe("Operación POST", () => {
    it("POST new cafe", async () => {
      const newID = faker.number.int({ min: 5 });
      const newName = faker.word.sample;
      const payload = {
        id: newID,
        nombre: newName,
      };
      const response = await request(server).post("/cafes").send(payload);
      expect(response.statusCode).toBe(201);
    });
    //MORE CASES: Invalid id (there's already a cafe with that ID), invalid format of request
  });
  describe("Operación PUT", () => {
    it("PUT with mismatched ID between query and body", async () => {
      const queryID = faker.number.int({ min: 5, max: 50 });
      const bodyID = faker.number.int({ min: 51, max: 100 });
      const placeHolderName = faker.word.sample;
      const payload = {
        id: bodyID,
        nombre: placeHolderName,
      };
      const response = await request(server)
        .put(`/cafes/${queryID}`)
        .send(payload);
      expect(response.statusCode).toBe(400);
    });
    //MORE CASES: Invalid id (non existent), invalid format of request
  });
});
