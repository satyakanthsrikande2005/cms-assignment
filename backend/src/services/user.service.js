const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/AppError.util");
const userRepository = require("../repositories/user.repository");
const { getPagination, buildPaginationMeta } = require("../utils/pagination.util");
const { ROLES } = require("../constants/roles.constant");

const userService = {
  async createUser(data) {
    const existing = await userRepository.findByEmail(data.email);

    if (existing) {
      throw new AppError("Email already registered", StatusCodes.CONFLICT);
    }

    return userRepository.create(data);
  },

  async getUsers(query) {
    const { page, limit, skip } = getPagination(query);
    const filter = {};

    if (query.role) filter.role = query.role;
    if (query.search) {
      filter.$or = [
        { name: { $regex: query.search, $options: "i" } },
        { email: { $regex: query.search, $options: "i" } },
      ];
    }

    const [users, total] = await Promise.all([
      userRepository.findAll({ filter, skip, limit }),
      userRepository.count(filter),
    ]);

    return {
      users,
      pagination: buildPaginationMeta({ page, limit, total }),
    };
  },

  async getUserById(id) {
    const user = await userRepository.findById(id);

    if (!user) {
      throw new AppError("User not found", StatusCodes.NOT_FOUND);
    }

    return user;
  },

  async updateUser(id, data, requester) {
    const user = await userRepository.findById(id);

    if (!user) {
      throw new AppError("User not found", StatusCodes.NOT_FOUND);
    }

    if (data.role && requester.role !== ROLES.ADMIN) {
      throw new AppError("Only admins can change roles", StatusCodes.FORBIDDEN);
    }

    if (data.email && data.email !== user.email) {
      const existing = await userRepository.findByEmail(data.email);
      if (existing) {
        throw new AppError("Email already in use", StatusCodes.CONFLICT);
      }
    }

    if (data.password) {
      const userWithPassword = await userRepository.findByIdWithPassword(id);
      userWithPassword.password = data.password;
      await userWithPassword.save();
      delete data.password;
    }

    return userRepository.updateById(id, data);
  },

  async deleteUser(id, requesterId) {
    if (id === requesterId.toString()) {
      throw new AppError("You cannot delete your own account", StatusCodes.BAD_REQUEST);
    }

    const user = await userRepository.findById(id);

    if (!user) {
      throw new AppError("User not found", StatusCodes.NOT_FOUND);
    }

    await userRepository.deleteById(id);
    return { message: "User deleted successfully" };
  },
};

module.exports = userService;
