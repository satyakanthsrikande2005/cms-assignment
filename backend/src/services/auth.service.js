const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/AppError.util");
const { signToken } = require("../utils/jwt.util");
const userRepository = require("../repositories/user.repository");

const authService = {
  async login({ email, password }) {
    const user = await userRepository.findByEmailWithPassword(email);

    if (!user || !user.isActive) {
      throw new AppError("Invalid email or password", StatusCodes.UNAUTHORIZED);
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      throw new AppError("Invalid email or password", StatusCodes.UNAUTHORIZED);
    }

    await userRepository.updateById(user._id, { lastLogin: new Date() });

    const token = signToken({ id: user._id, role: user.role });

    return {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
    };
  },

  async getProfile(userId) {
    const user = await userRepository.findById(userId);

    if (!user) {
      throw new AppError("User not found", StatusCodes.NOT_FOUND);
    }

    return user;
  },

  async changePassword(userId, { currentPassword, newPassword }) {
    const user = await userRepository.findByIdWithPassword(userId);

    if (!user) {
      throw new AppError("User not found", StatusCodes.NOT_FOUND);
    }

    const isMatch = await user.comparePassword(currentPassword);

    if (!isMatch) {
      throw new AppError("Current password is incorrect", StatusCodes.BAD_REQUEST);
    }

    user.password = newPassword;
    await user.save();

    return { message: "Password updated successfully" };
  },
};

module.exports = authService;
