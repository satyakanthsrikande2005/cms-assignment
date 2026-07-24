const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/AppError.util");
const categoryRepository = require("../repositories/category.repository");
const { generateSlug } = require("../utils/slug.util");
const { getPagination, buildPaginationMeta } = require("../utils/pagination.util");

const categoryService = {
  async createCategory(data) {
    const slug = data.slug || generateSlug(data.name);

    const existing = await categoryRepository.findBySlug(slug);
    if (existing) {
      throw new AppError("Category already exists", StatusCodes.CONFLICT);
    }

    return categoryRepository.create({ ...data, slug });
  },

  async getCategories(query) {
    const { page, limit, skip } = getPagination(query);
    const filter = {};

    if (query.search) {
      filter.name = { $regex: query.search, $options: "i" };
    }
    if (query.isActive !== undefined) {
      filter.isActive = query.isActive === "true";
    }

    const [categories, total] = await Promise.all([
      categoryRepository.findAll({ filter, skip, limit }),
      categoryRepository.count(filter),
    ]);

    return {
      categories,
      pagination: buildPaginationMeta({ page, limit, total }),
    };
  },

  async getCategoryById(id) {
    const category = await categoryRepository.findById(id);

    if (!category) {
      throw new AppError("Category not found", StatusCodes.NOT_FOUND);
    }

    return category;
  },

  async updateCategory(id, data) {
    const category = await categoryRepository.findById(id);

    if (!category) {
      throw new AppError("Category not found", StatusCodes.NOT_FOUND);
    }

    if (data.name && !data.slug) {
      data.slug = generateSlug(data.name);
    }

    if (data.slug && data.slug !== category.slug) {
      const existing = await categoryRepository.findBySlug(data.slug);
      if (existing) {
        throw new AppError("Category slug already exists", StatusCodes.CONFLICT);
      }
    }

    return categoryRepository.updateById(id, data);
  },

  async deleteCategory(id) {
    const category = await categoryRepository.findById(id);

    if (!category) {
      throw new AppError("Category not found", StatusCodes.NOT_FOUND);
    }

    await categoryRepository.deleteById(id);
    return { message: "Category deleted successfully" };
  },
};

module.exports = categoryService;
