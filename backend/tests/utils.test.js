const test = require("node:test");
const assert = require("node:assert/strict");
const { sendSuccess, sendFailure } = require("../src/utils/apiResponse.util");
const AppError = require("../src/utils/AppError.util");
const { getPagination, buildPaginationMeta } = require("../src/utils/pagination.util");
const { generateSlug } = require("../src/utils/slug.util");
const { generateToken, verifyToken } = require("../src/utils/jwt.util");

test("AppError should encapsulate message and status code", () => {
  const err = new AppError("Forbidden action", 403);
  assert.equal(err.message, "Forbidden action");
  assert.equal(err.statusCode, 403);
  assert.equal(err.isOperational, true);
});

test("generateSlug should produce clean slugs", () => {
  const slug = generateSlug("Hello World! Enterprise CMS 2026");
  assert.equal(slug, "hello-world-enterprise-cms-2026");

  const uniqueSlug = generateSlug("Hello World", { unique: true });
  assert.ok(uniqueSlug.startsWith("hello-world-"));
});

test("getPagination & buildPaginationMeta should compute boundaries", () => {
  const { page, limit, skip } = getPagination({ page: "2", limit: "15" });
  assert.equal(page, 2);
  assert.equal(limit, 15);
  assert.equal(skip, 15);

  const meta = buildPaginationMeta({ page: 2, limit: 10, total: 25 });
  assert.equal(meta.totalPages, 3);
  assert.equal(meta.hasNextPage, true);
  assert.equal(meta.hasPrevPage, true);
});

test("jwt utilities should sign and verify tokens", () => {
  const payload = { id: "user123", role: "admin" };
  const token = generateToken(payload);
  assert.ok(typeof token === "string");

  const decoded = verifyToken(token);
  assert.equal(decoded.id, "user123");
  assert.equal(decoded.role, "admin");
});
