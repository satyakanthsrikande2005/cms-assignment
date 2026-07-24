const test = require("node:test");
const assert = require("node:assert/strict");
const { authorize, isAdmin, isEditorOrAbove, isAuthorOrAbove } = require("../src/middleware/role.middleware");
const { ROLES } = require("../src/constants/roles.constant");

test("authorize middleware should allow authorized user roles", () => {
  const req = { user: { role: ROLES.ADMIN } };
  let nextCalled = false;
  const next = () => { nextCalled = true; };

  isAdmin(req, {}, next);
  assert.equal(nextCalled, true);
});

test("authorize middleware should block unauthorized user roles", () => {
  const req = { user: { role: ROLES.AUTHOR } };
  const next = () => {};

  assert.throws(
    () => isEditorOrAbove(req, {}, next),
    (err) => err.statusCode === 403
  );
});

test("authorize middleware should require authenticated user", () => {
  const req = {};
  const next = () => {};

  assert.throws(
    () => isAuthorOrAbove(req, {}, next),
    (err) => err.statusCode === 401
  );
});
