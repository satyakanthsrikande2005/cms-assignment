const slugify = require("slugify");
const { v4: uuidv4 } = require("uuid");

const generateSlug = (text, { unique = false } = {}) => {
  const baseSlug = slugify(text, {
    lower: true,
    strict: true,
    trim: true,
  });

  if (!unique) {
    return baseSlug;
  }

  return `${baseSlug}-${uuidv4().slice(0, 8)}`;
};

module.exports = { generateSlug };
