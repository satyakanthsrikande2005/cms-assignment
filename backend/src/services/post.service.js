const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/AppError.util");
const postRepository = require("../repositories/post.repository");
const { generateSlug } = require("../utils/slug.util");
const { getPagination, buildPaginationMeta } = require("../utils/pagination.util");
const { CONTENT_STATUSES, ROLES } = require("../constants/roles.constant");

const postService = {
  async createPost(data, authorId) {
    const slug = data.slug || generateSlug(data.title);

    const existing = await postRepository.findBySlug(slug);
    if (existing) {
      throw new AppError("A post with this slug already exists", StatusCodes.CONFLICT);
    }

    const payload = {
      ...data,
      slug,
      author: authorId,
      publishedAt:
        data.status === CONTENT_STATUSES.PUBLISHED ? new Date() : undefined,
    };

    const post = await postRepository.create(payload);
    return postRepository.findById(post._id);
  },

  async getPosts(query, user) {
    const { page, limit, skip } = getPagination(query);
    const filter = {};

    if (query.status) filter.status = query.status;
    if (query.category) filter.categories = query.category;
    if (query.tag) filter.tags = query.tag;
    if (query.search) {
      filter.title = { $regex: query.search, $options: "i" };
    }

    if (user.role === ROLES.AUTHOR) {
      filter.author = user._id;
    }

    const [posts, total] = await Promise.all([
      postRepository.findAll({ filter, skip, limit }),
      postRepository.count(filter),
    ]);

    return {
      posts,
      pagination: buildPaginationMeta({ page, limit, total }),
    };
  },

  async getPostById(id, user) {
    const post = await postRepository.findById(id);

    if (!post) {
      throw new AppError("Post not found", StatusCodes.NOT_FOUND);
    }

    if (
      user.role === ROLES.AUTHOR &&
      post.author._id.toString() !== user._id.toString()
    ) {
      throw new AppError("You can only view your own posts", StatusCodes.FORBIDDEN);
    }

    return post;
  },

  async updatePost(id, data, user) {
    const post = await postRepository.findById(id);

    if (!post) {
      throw new AppError("Post not found", StatusCodes.NOT_FOUND);
    }

    if (
      user.role === ROLES.AUTHOR &&
      post.author._id.toString() !== user._id.toString()
    ) {
      throw new AppError("You can only edit your own posts", StatusCodes.FORBIDDEN);
    }

    if (data.title && !data.slug) {
      data.slug = generateSlug(data.title);
    }

    if (data.slug && data.slug !== post.slug) {
      const existing = await postRepository.findBySlug(data.slug);
      if (existing) {
        throw new AppError("A post with this slug already exists", StatusCodes.CONFLICT);
      }
    }

    if (data.status === CONTENT_STATUSES.PUBLISHED && !post.publishedAt) {
      data.publishedAt = new Date();
    }

    return postRepository.updateById(id, data);
  },

  async deletePost(id, user) {
    const post = await postRepository.findById(id);

    if (!post) {
      throw new AppError("Post not found", StatusCodes.NOT_FOUND);
    }

    if (
      user.role === ROLES.AUTHOR &&
      post.author._id.toString() !== user._id.toString()
    ) {
      throw new AppError("You can only delete your own posts", StatusCodes.FORBIDDEN);
    }

    await postRepository.deleteById(id);
    return { message: "Post deleted successfully" };
  },

  async getPublishedPosts(query) {
    const { page, limit, skip } = getPagination(query);
    const filter = { status: CONTENT_STATUSES.PUBLISHED };

    if (query.category) filter.categories = query.category;
    if (query.tag) filter.tags = query.tag;

    const [posts, total] = await Promise.all([
      postRepository.findAll({
        filter,
        skip,
        limit,
        sort: { publishedAt: -1 },
      }),
      postRepository.count(filter),
    ]);

    return {
      posts,
      pagination: buildPaginationMeta({ page, limit, total }),
    };
  },

  async getPublishedPostBySlug(slug) {
    const post = await postRepository.findBySlug(slug);

    if (!post || post.status !== CONTENT_STATUSES.PUBLISHED) {
      throw new AppError("Post not found", StatusCodes.NOT_FOUND);
    }

    await postRepository.incrementViewCount(post._id);
    return post;
  },
};

module.exports = postService;
