const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/AppError.util");
const tagRepository = require("../repositories/tag.repository");
const { generateSlug } = require("../utils/slug.util");
const { getPagination, buildPaginationMeta } = require("../utils/pagination.util");

const tagService = {
  async createTag(data) {
    const slug = data.slug || generateSlug(data.name);

    const existing = await tagRepository.findBySlug(slug);
    if (existing) {
      throw new AppError("Tag already exists", StatusCodes.CONFLICT);
    }

    return tagRepository.create({ ...data, slug });
  },

  async getTags(query) {
    const { page, limit, skip } = getPagination(query);
    const filter = {};

    if (query.search) {
      filter.name = { $regex: query.search, $options: "i" };
    }

    const [tags, total] = await Promise.all([
      tagRepository.findAll({ filter, skip, limit }),
      tagRepository.count(filter),
    ]);

    return {
      tags,
      pagination: buildPaginationMeta({ page, limit, total }),
    };
  },

  async getTagById(id) {
    const tag = await tagRepository.findById(id);

    if (!tag) {
      throw new AppError("Tag not found", StatusCodes.NOT_FOUND);
    }

    return tag;
  },

  async updateTag(id, data) {
    const tag = await tagRepository.findById(id);

    if (!tag) {
      throw new AppError("Tag not found", StatusCodes.NOT_FOUND);
    }

    if (data.name && !data.slug) {
      data.slug = generateSlug(data.name);
    }

    if (data.slug && data.slug !== tag.slug) {
      const existing = await tagRepository.findBySlug(data.slug);
      if (existing) {
        throw new AppError("Tag slug already exists", StatusCodes.CONFLICT);
      }
    }

    return tagRepository.updateById(id, data);
  },

  async deleteTag(id) {
    const tag = await tagRepository.findById(id);

    if (!tag) {
      throw new AppError("Tag not found", StatusCodes.NOT_FOUND);
    }

    await tagRepository.deleteById(id);
    return { message: "Tag deleted successfully" };
  },
};

module.exports = tagService;
