import api from "./axios";

export const authApi = {
  login: (data) => api.post("/auth/login", data),
  getProfile: () => api.get("/auth/me"),
  changePassword: (data) => api.put("/auth/change-password", data),
};

export const userApi = {
  getAll: (params) => api.get("/users", { params }),
  getById: (id) => api.get(`/users/${id}`),
  create: (data) => api.post("/users", data),
  update: (id, data) => api.put(`/users/${id}`, data),
  delete: (id) => api.delete(`/users/${id}`),
};

export const pageApi = {
  getAll: (params) => api.get("/pages", { params }),
  getById: (id) => api.get(`/pages/${id}`),
  create: (data) => api.post("/pages", data),
  update: (id, data) => api.put(`/pages/${id}`, data),
  delete: (id) => api.delete(`/pages/${id}`),
};

export const postApi = {
  getAll: (params) => api.get("/posts", { params }),
  getById: (id) => api.get(`/posts/${id}`),
  create: (data) => api.post("/posts", data),
  update: (id, data) => api.put(`/posts/${id}`, data),
  delete: (id) => api.delete(`/posts/${id}`),
};

export const categoryApi = {
  getAll: (params) => api.get("/categories", { params }),
  create: (data) => api.post("/categories", data),
  update: (id, data) => api.put(`/categories/${id}`, data),
  delete: (id) => api.delete(`/categories/${id}`),
};

export const tagApi = {
  getAll: (params) => api.get("/tags", { params }),
  create: (data) => api.post("/tags", data),
  update: (id, data) => api.put(`/tags/${id}`, data),
  delete: (id) => api.delete(`/tags/${id}`),
};

export const mediaApi = {
  getAll: (params) => api.get("/media", { params }),
  upload: (formData) =>
    api.post("/media/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  update: (id, data) => api.put(`/media/${id}`, data),
  delete: (id) => api.delete(`/media/${id}`),
};

export const searchApi = {
  search: (params) => api.get("/search", { params }),
};

export const settingApi = {
  getAll: () => api.get("/settings"),
  update: (data) => api.put("/settings", data),
};
