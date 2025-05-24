const request = require("supertest");
const app = require("../src/app"); // export app in app.js

describe("Auth", () => {
  it("register → login", async () => {
    const email = `u${Date.now()}@test.com`;
    await request(app)
      .post("/auth/register")
      .send({ email, password: "pass123" })
      .expect(201);
    const res = await request(app)
      .post("/auth/login")
      .send({ email, password: "pass123" });
    expect(res.body.token).toBeDefined();
  });
});
