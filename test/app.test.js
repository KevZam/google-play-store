const supertest = require("supertest");
const app = require("../app");
const { expect } = require("chai");

// tests
describe("GET /app", () => {
  it("should return an array of apps", () => {
    return supertest(app)
      .get("/app")
      .expect(200)
      .expect("Content-Type", /json/)
      .then(res => {
        expect(res.body).to.be.an("array"); //.that.contains({});
        expect(res.body).to.have.lengthOf.at.least(1);
      });
  });
  it("should return 400 if incorrect genre input", () => {
    return supertest(app)
      .get("/app")
      .query({ genre: "RPG" })
      .expect(400, { message: "genre not found" });
  });
  it("should return 400 if incorrect sort input", () => {
    return supertest(app)
      .get("/app")
      .query({ sort: "Price" })
      .expect(400, { message: "sort option not found" });
  });
});