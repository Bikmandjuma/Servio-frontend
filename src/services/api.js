import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const api = axios.create({ baseURL });

// Attach the admin token, if present, to every request automatically.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("servio_admin_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Public endpoints
export const submitContact = (payload) => api.post("/contact", payload);
export const submitQuote = (payload) => api.post("/quotes", payload);
export const submitDemoRequest = (payload) => api.post("/demo-requests", payload);
export const fetchProducts = (params) => api.get("/products", { params });
export const fetchProduct = (slug) => api.get(`/products/${slug}`);
export const createProduct = (payload) => api.post("/products", payload);
export const updateProduct = (id, payload) => api.patch(`/products/${id}`, payload);
export const deleteProduct = (id) => api.delete(`/products/${id}`);
export const fetchServices = () => api.get("/services");
export const fetchIndustries = (params) => api.get("/industries", { params });
export const fetchTestimonials = (params) => api.get("/testimonials", { params });
export const fetchCategories = () => api.get("/categories");
export const fetchBlogPosts = (params) => api.get("/blog", { params });

// Auth (shared by the public "sign in" entry point and /admin/login)
export const adminLogin = (payload) => api.post("/auth/login", payload);
export const requestPasswordReset = (email) => api.post("/auth/forgot-password", { email });
export const resetPassword = (token, password) => api.post("/auth/reset-password", { token, password });

// Live chat — guest side (identified by a guestId kept in localStorage, not a
// login). See hooks/useChatSocket.js for the realtime half of this.
export const startChat = (guestId, guestName) => api.post("/chat/start", { guestId, guestName });
export const fetchGuestChatMessages = (conversationId, guestId) =>
  api.get(`/chat/${conversationId}/messages`, { params: { guestId } });
export const sendGuestChatMessage = (conversationId, guestId, body) =>
  api.post(`/chat/${conversationId}/messages`, { guestId, body });

// Live chat — admin/agent side
export const fetchChatConversations = (params) => api.get("/chat/conversations", { params });
export const fetchAdminChatMessages = (conversationId) => api.get(`/chat/conversations/${conversationId}/messages`);
export const sendAdminChatMessage = (conversationId, body) =>
  api.post(`/chat/conversations/${conversationId}/messages`, { body });
export const closeChatConversation = (conversationId) => api.patch(`/chat/conversations/${conversationId}/close`);

// Admin endpoints
export const fetchDashboardStats = () => api.get("/admin/stats");
export const fetchAdminContacts = (params) => api.get("/contact", { params });
export const fetchAdminQuotes = (params) => api.get("/quotes", { params });
export const fetchAdminDemoRequests = (params) => api.get("/demo-requests", { params });
export const updateContactStatus = (id, status) => api.patch(`/contact/${id}`, { status });
export const updateQuoteStatus = (id, status) => api.patch(`/quotes/${id}`, { status });
export const updateDemoStatus = (id, status) => api.patch(`/demo-requests/${id}`, { status });

// Admin — catalog & content management (list views used by the admin panel;
// all read straight from the database, nothing static/mocked)
export const createCategory = (payload) => api.post("/categories", payload);
export const updateCategory = (id, payload) => api.patch(`/categories/${id}`, payload);
export const deleteCategory = (id) => api.delete(`/categories/${id}`);

export const createIndustry = (payload) => api.post("/industries", payload);
export const updateIndustry = (id, payload) => api.patch(`/industries/${id}`, payload);
export const deleteIndustry = (id) => api.delete(`/industries/${id}`);

export const createTestimonial = (payload) => api.post("/testimonials", payload);
export const updateTestimonial = (id, payload) => api.patch(`/testimonials/${id}`, payload);
export const deleteTestimonial = (id) => api.delete(`/testimonials/${id}`);

export const createBlogPost = (payload) => api.post("/blog", payload);
export const updateBlogPost = (id, payload) => api.patch(`/blog/${id}`, payload);
export const deleteBlogPost = (id) => api.delete(`/blog/${id}`);

export const fetchSettings = () => api.get("/settings");
export const updateSettings = (payload) => api.patch("/settings", payload);
