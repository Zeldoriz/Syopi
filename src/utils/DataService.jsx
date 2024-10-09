import http from "./HttpCommon.jsx";

const login = (body) => {
  return http.post("/auth/login", body);
};

const getAllUsers = () => {
  return http.get("/users");
};

const getAllProducts = () => {
  return http.get("/products");
};

const getCategories = () => {
  return http.get("/products/categories");
};

const getByCategory = (category) => {
  return http.get(`/products/category/${category}`);
};

const getAllCarts = () => {
  return http.get("/carts");
};

const DataService = {
  login,
  getAllUsers,
  getAllProducts,
  getCategories,
  getByCategory,
  getAllCarts
};

export default DataService;
