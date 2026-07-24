const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/AppError.util");
const { ROLES } = require("../constants/roles.constant");

const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      throw new AppError("Authentication required", StatusCodes.UNAUTHORIZED);
    }

    if (!allowedRoles.includes(req.user.role)) {
      throw new AppError(
        "You do not have permission to perform this action",
        StatusCodes.FORBIDDEN
      );
    }

    next();
  };
};

const isAdmin = authorize(ROLES.ADMIN);
const isEditorOrAbove = authorize(ROLES.ADMIN, ROLES.EDITOR);
const isAuthorOrAbove = authorize(ROLES.ADMIN, ROLES.EDITOR, ROLES.AUTHOR);

module.exports = { authorize, isAdmin, isEditorOrAbove, isAuthorOrAbove };
