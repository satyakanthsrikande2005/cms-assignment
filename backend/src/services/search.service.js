const pageRepository = require("../repositories/page.repository");
const postRepository = require("../repositories/post.repository");
const { getPagination, buildPaginationMeta } = require("../utils/pagination.util");
const { CONTENT_STATUSES } = require("../constants/roles.constant");

const searchService = {
  async search(query) {
    const { page, limit, skip } = getPagination(query);
    const searchTerm = query.q || query.search || "";

    if (!searchTerm.trim()) {
      return {
        results: { pages: [], posts: [] },
        pagination: buildPaginationMeta({ page, limit, total: 0 }),
      };
    }

    const [pages, posts, pageCount, postCount] = await Promise.all([
      pageRepository.search(searchTerm, { skip, limit }),
      postRepository.search(searchTerm, { skip, limit }),
      pageRepository.searchCount(searchTerm),
      postRepository.searchCount(searchTerm),
    ]);

    const publishedPages = pages.filter((p) => p.status === CONTENT_STATUSES.PUBLISHED);
    const publishedPosts = posts.filter((p) => p.status === CONTENT_STATUSES.PUBLISHED);

    return {
      results: {
        pages: publishedPages,
        posts: publishedPosts,
      },
      pagination: buildPaginationMeta({
        page,
        limit,
        total: pageCount + postCount,
      }),
    };
  },

  async adminSearch(query) {
    const { page, limit, skip } = getPagination(query);
    const searchTerm = query.q || query.search || "";

    if (!searchTerm.trim()) {
      return {
        results: { pages: [], posts: [] },
        pagination: buildPaginationMeta({ page, limit, total: 0 }),
      };
    }

    const [pages, posts, pageCount, postCount] = await Promise.all([
      pageRepository.search(searchTerm, { skip, limit }),
      postRepository.search(searchTerm, { skip, limit }),
      pageRepository.searchCount(searchTerm),
      postRepository.searchCount(searchTerm),
    ]);

    return {
      results: { pages, posts },
      pagination: buildPaginationMeta({
        page,
        limit,
        total: pageCount + postCount,
      }),
    };
  },
};

module.exports = searchService;
