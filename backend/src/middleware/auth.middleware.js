const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/AppError.util");
const { verifyToken } = require("../utils/jwt.util");
const userRepository = require("../repositories/user.repository");

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new AppError("Authentication required", StatusCodes.UNAUTHORIZED);
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifyToken(token);
    const user = await userRepository.findById(decoded.id);

    if (!user || !user.isActive) {
      throw new AppError("User not found or inactive", StatusCodes.UNAUTHORIZED);
    }

    req.user = user;
    next();
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError("Invalid or expired token", StatusCodes.UNAUTHORIZED);
  }
};

module.exports = authenticate;
