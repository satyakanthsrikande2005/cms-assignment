const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/AppError.util");
const pageRepository = require("../repositories/page.repository");
const { generateSlug } = require("../utils/slug.util");
const { getPagination, buildPaginationMeta } = require("../utils/pagination.util");
const { CONTENT_STATUSES, ROLES } = require("../constants/roles.constant");

const pageService = {
  async createPage(data, authorId) {
    const slug = data.slug || generateSlug(data.title);

    const existing = await pageRepository.findBySlug(slug);
    if (existing) {
      throw new AppError("A page with this slug already exists", StatusCodes.CONFLICT);
    }

    const payload = {
      ...data,
      slug,
      author: authorId,
      publishedAt:
        data.status === CONTENT_STATUSES.PUBLISHED ? new Date() : undefined,
    };

    return pageRepository.create(payload);
  },

  async getPages(query, user) {
    const { page, limit, skip } = getPagination(query);
    const filter = {};

    if (query.status) filter.status = query.status;
    if (query.search) {
      filter.title = { $regex: query.search, $options: "i" };
    }

    const [pages, total] = await Promise.all([
      pageRepository.findAll({ filter, skip, limit }),
      pageRepository.count(filter),
    ]);

    return {
      pages,
      pagination: buildPaginationMeta({ page, limit, total }),
    };
  },

  async getPageById(id) {
    const page = await pageRepository.findById(id);

    if (!page) {
      throw new AppError("Page not found", StatusCodes.NOT_FOUND);
    }

    return page;
  },

  async updatePage(id, data, user) {
    const page = await pageRepository.findById(id);

    if (!page) {
      throw new AppError("Page not found", StatusCodes.NOT_FOUND);
    }

    if (
      user.role === ROLES.AUTHOR &&
      page.author._id.toString() !== user._id.toString()
    ) {
      throw new AppError("You can only edit your own pages", StatusCodes.FORBIDDEN);
    }

    if (data.title && !data.slug) {
      data.slug = generateSlug(data.title);
    }

    if (data.slug && data.slug !== page.slug) {
      const existing = await pageRepository.findBySlug(data.slug);
      if (existing) {
        throw new AppError("A page with this slug already exists", StatusCodes.CONFLICT);
      }
    }

    if (data.status === CONTENT_STATUSES.PUBLISHED && !page.publishedAt) {
      data.publishedAt = new Date();
    }

    return pageRepository.updateById(id, data);
  },

  async deletePage(id, user) {
    const page = await pageRepository.findById(id);

    if (!page) {
      throw new AppError("Page not found", StatusCodes.NOT_FOUND);
    }

    if (
      user.role === ROLES.AUTHOR &&
      page.author._id.toString() !== user._id.toString()
    ) {
      throw new AppError("You can only delete your own pages", StatusCodes.FORBIDDEN);
    }

    await pageRepository.deleteById(id);
    return { message: "Page deleted successfully" };
  },

  async getPublishedPages(query) {
    const { page, limit, skip } = getPagination(query);
    const filter = { status: CONTENT_STATUSES.PUBLISHED };

    const [pages, total] = await Promise.all([
      pageRepository.findAll({
        filter,
        skip,
        limit,
        sort: { publishedAt: -1 },
      }),
      pageRepository.count(filter),
    ]);

    return {
      pages,
      pagination: buildPaginationMeta({ page, limit, total }),
    };
  },

  async getPublishedPageBySlug(slug) {
    const page = await pageRepository.findBySlug(slug);

    if (!page || page.status !== CONTENT_STATUSES.PUBLISHED) {
      throw new AppError("Page not found", StatusCodes.NOT_FOUND);
    }

    return page;
  },
};

module.exports = pageService;
