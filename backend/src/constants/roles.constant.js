const ROLES = {
  ADMIN: "admin",
  EDITOR: "editor",
  AUTHOR: "author",
};

const ROLE_LIST = Object.values(ROLES);

const CONTENT_STATUSES = {
  DRAFT: "draft",
  PUBLISHED: "published",
  ARCHIVED: "archived",
};

const STATUS_LIST = Object.values(CONTENT_STATUSES);

module.exports = { ROLES, ROLE_LIST, CONTENT_STATUSES, STATUS_LIST };
