import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const publicApi = {
  getPages: async (params?: Record<string, any>) => {
    const res = await api.get("/public/pages", { params });
    return res.data.data;
  },

  getPageBySlug: async (slug: string) => {
    const res = await api.get(`/public/pages/${slug}`);
    return res.data.data.page;
  },

  getPosts: async (params?: Record<string, any>) => {
    const res = await api.get("/public/posts", { params });
    return res.data.data;
  },

  getPostBySlug: async (slug: string) => {
    const res = await api.get(`/public/posts/${slug}`);
    return res.data.data.post;
  },

  getCategories: async (params?: Record<string, any>) => {
    const res = await api.get("/public/categories", { params });
    return res.data.data;
  },

  getTags: async (params?: Record<string, any>) => {
    const res = await api.get("/public/tags", { params });
    return res.data.data;
  },

  search: async (params?: Record<string, any>) => {
    const res = await api.get("/public/search", { params });
    return res.data.data;
  },

  getSettings: async () => {
    const res = await api.get("/public/settings");
    return res.data.data.settings;
  },
};

export default api;
