const test = require("node:test");
const assert = require("node:assert/strict");
const request = require("supertest");
const app = require("../src/app");

test("GET /api/health should return 200 OK with health details", async () => {
  const response = await request(app).get("/api/health");
  assert.equal(response.status, 200);
  assert.equal(response.body.success, true);
  assert.equal(response.body.message, "Production Ready CMS Backend Running");
  assert.ok(response.body.data.version);
  assert.ok(response.body.data.timestamp);
});

test("GET non-existent route should return 404 Not Found", async () => {
  const response = await request(app).get("/api/non-existent-route");
  assert.equal(response.status, 404);
  assert.equal(response.body.success, false);
  assert.equal(response.body.message, "Route not found");
});
