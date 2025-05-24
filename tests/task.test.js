// tests/task.test.js
const request = require("supertest");
const app = require("../src/app");
const { sequelize } = require("../src/models");

let token, projectId;

beforeAll(async () => {
  // Use a unique email so repeated test runs don’t collide
  const email = `u${Date.now()}@test.com`;
  await request(app)
    .post("/auth/register")
    .send({ email, password: "p" })
    .expect(201);

  const res = await request(app)
    .post("/auth/login")
    .send({ email, password: "p" })
    .expect(200);

  token = res.body.token;

  const proj = await request(app)
    .post("/projects")
    .set("Authorization", `Bearer ${token}`)
    .send({ name: "X", description: "Y" })
    .expect(201);

  projectId = proj.body.id;
});

afterAll(async () => {
  // Close Sequelize connection so Jest can exit cleanly
  await sequelize.close();
});

test("create & update task", async () => {
  // 1) Create a task
  const taskRes = await request(app)
    .post(`/projects/${projectId}/tasks`)
    .set("Authorization", `Bearer ${token}`)
    .send({ title: "Test Task", dueDate: new Date().toISOString() })
    .expect(201);

  const taskId = taskRes.body.id;

  // 2) Update status to 'done'
  const updateRes = await request(app)
    .patch(`/tasks/${taskId}`)
    .set("Authorization", `Bearer ${token}`)
    .send({ status: "done" })
    .expect(200);

  // 3) Assert that the body contains the updated status
  expect(updateRes.body).toEqual(expect.objectContaining({ status: "done" }));
});
