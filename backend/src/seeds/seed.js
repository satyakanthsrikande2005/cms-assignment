const mongoose = require("mongoose");
const env = require("../config/env");
const User = require("../models/user.model");
const Page = require("../models/page.model");
const Post = require("../models/post.model");
const Category = require("../models/category.model");
const Tag = require("../models/tag.model");
const settingRepository = require("../repositories/setting.repository");
const { ROLES, CONTENT_STATUSES } = require("../constants/roles.constant");

const seedDatabase = async () => {
  await mongoose.connect(env.mongodbUri);
  console.log("Connected to MongoDB for seeding...");

  const adminEmail = process.env.SEED_ADMIN_EMAIL || "admin@cms.com";
  const adminPassword = process.env.SEED_ADMIN_PASSWORD || "Admin@123456";

  let admin = await User.findOne({ email: adminEmail });

  if (!admin) {
    admin = await User.create({
      name: "System Administrator",
      email: adminEmail,
      password: adminPassword,
      role: ROLES.ADMIN,
    });
    console.log(`Admin user created: ${adminEmail}`);
  } else {
    console.log(`Admin user already exists: ${adminEmail}`);
  }

  const editorEmail = "editor@cms.com";
  let editor = await User.findOne({ email: editorEmail });

  if (!editor) {
    editor = await User.create({
      name: "Content Editor",
      email: editorEmail,
      password: "Editor@123456",
      role: ROLES.EDITOR,
    });
    console.log(`Editor user created: ${editorEmail}`);
  }

  const authorEmail = "author@cms.com";
  let author = await User.findOne({ email: authorEmail });

  if (!author) {
    author = await User.create({
      name: "Content Author",
      email: authorEmail,
      password: "Author@123456",
      role: ROLES.AUTHOR,
    });
    console.log(`Author user created: ${authorEmail}`);
  }

  const categories = [
    { name: "Technology", slug: "technology", description: "Tech news and tutorials" },
    { name: "Business", slug: "business", description: "Business insights" },
    { name: "Lifestyle", slug: "lifestyle", description: "Lifestyle articles" },
  ];

  for (const cat of categories) {
    const exists = await Category.findOne({ slug: cat.slug });
    if (!exists) {
      await Category.create(cat);
      console.log(`Category created: ${cat.name}`);
    }
  }

  const tags = [
    { name: "JavaScript", slug: "javascript" },
    { name: "Node.js", slug: "nodejs" },
    { name: "React", slug: "react" },
    { name: "MongoDB", slug: "mongodb" },
  ];

  for (const tag of tags) {
    const exists = await Tag.findOne({ slug: tag.slug });
    if (!exists) {
      await Tag.create(tag);
      console.log(`Tag created: ${tag.name}`);
    }
  }

  const techCategory = await Category.findOne({ slug: "technology" });
  const jsTag = await Tag.findOne({ slug: "javascript" });
  const nodeTag = await Tag.findOne({ slug: "nodejs" });

  const homePage = await Page.findOne({ slug: "home" });
  if (!homePage) {
    await Page.create({
      title: "Welcome to Enterprise CMS",
      slug: "home",
      content:
        "<h1>Welcome</h1><p>This is a production-ready enterprise content management system built with Node.js, Express, MongoDB, React, and Next.js.</p>",
      excerpt: "Welcome to our enterprise CMS platform",
      status: CONTENT_STATUSES.PUBLISHED,
      author: admin._id,
      publishedAt: new Date(),
      seo: {
        metaTitle: "Home | Enterprise CMS",
        metaDescription: "Enterprise Content Management System",
      },
    });
    console.log("Home page created");
  }

  const aboutPage = await Page.findOne({ slug: "about" });
  if (!aboutPage) {
    await Page.create({
      title: "About Us",
      slug: "about",
      content:
        "<h1>About Us</h1><p>We build scalable, secure, and maintainable content management solutions for enterprise teams.</p>",
      excerpt: "Learn more about our platform",
      status: CONTENT_STATUSES.PUBLISHED,
      author: admin._id,
      publishedAt: new Date(),
      seo: {
        metaTitle: "About | Enterprise CMS",
        metaDescription: "About our enterprise CMS platform",
      },
    });
    console.log("About page created");
  }

  const samplePost = await Post.findOne({ slug: "getting-started-with-enterprise-cms" });
  if (!samplePost) {
    await Post.create({
      title: "Getting Started with Enterprise CMS",
      slug: "getting-started-with-enterprise-cms",
      content:
        "<h2>Introduction</h2><p>This guide walks you through setting up and using the Enterprise CMS platform.</p><h2>Features</h2><ul><li>JWT Authentication</li><li>Role-Based Access Control</li><li>Content Management</li><li>Media Library</li><li>SEO Tools</li></ul>",
      excerpt: "A comprehensive guide to getting started with Enterprise CMS",
      status: CONTENT_STATUSES.PUBLISHED,
      author: editor._id || admin._id,
      categories: techCategory ? [techCategory._id] : [],
      tags: [jsTag, nodeTag].filter(Boolean).map((t) => t._id),
      publishedAt: new Date(),
      seo: {
        metaTitle: "Getting Started | Enterprise CMS",
        metaDescription: "Learn how to use Enterprise CMS",
        keywords: ["cms", "enterprise", "nodejs"],
      },
    });
    console.log("Sample post created");
  }

  const defaultSettings = {
    siteName: "Enterprise CMS",
    siteDescription: "A production-ready content management system",
    siteUrl: env.publicUrl,
    contactEmail: "contact@example.com",
    postsPerPage: 10,
    defaultMetaTitle: "Enterprise CMS",
    defaultMetaDescription: "Enterprise Content Management System",
    googleAnalyticsId: "",
  };

  for (const [key, value] of Object.entries(defaultSettings)) {
    const exists = await settingRepository.findByKey(key);
    if (!exists) {
      const group = ["defaultMetaTitle", "defaultMetaDescription", "googleAnalyticsId"].includes(key)
        ? "seo"
        : "general";
      await settingRepository.upsert(key, value, group);
    }
  }
  console.log("Default settings created");

  console.log("\n=========================================");
  console.log("Database seeding completed successfully");
  console.log("=========================================");
  console.log(`Admin Login: ${adminEmail} / ${adminPassword}`);
  console.log("=========================================\n");

  await mongoose.disconnect();
};

seedDatabase().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
