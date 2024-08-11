import ProductDetails from "../pages/ProductDetails";
import SignUP from "../pages/SignUP";

const backendDomin = process.env.REACT_APP_BACKEND_URL; //"http://localhost:8080"

const SummaryApi = {
  signUP: {
    url: `${backendDomin}/api/signup`,
    method: "post",
  },
  signIn: {
    url: `${backendDomin}/api/signin`,
    method: "post",
  },
  current_user: {
    url: `${backendDomin}/api/user-details`,
    method: "post",
  },
  logout_user: {
    url: `${backendDomin}/api/userLogout`,
    method: "post",
  },
  allUser: {
    url: `${backendDomin}/api/all-user`,
    method: "post",
  },
  userSearch: {
    url: `${backendDomin}/api/user-search`,
    method: "post",
  },
  updateUser: {
    url: `${backendDomin}/api/update-user`,
    method: "post",
  },
  updateProfile: {
    url: `${backendDomin}/api/update-profile`,
    method: "post",
  },
  deleteUser: {
    url: `${backendDomin}/api/delete-user`,
    method: "post",
  },
  uploadProduct: {
    url: `${backendDomin}/api/upload-product`,
    method: "post",
  },
  allProduct: {
    url: `${backendDomin}/api/get-product`,
    method: "get",
  },
  updateProduct: {
    url: `${backendDomin}/api/update-product`,
    method: "post",
  },
  deleteProduct: {
    url: `${backendDomin}/api/delete-product`,
    method: "post",
  },
  categoryProduct: {
    url: `${backendDomin}/api/get-categoryProduct`,
    method: "get",
  },
  categoryWiseProduct: {
    url: `${backendDomin}/api/category-product`,
    method: "post",
  },
  productDetails: {
    url: `${backendDomin}/api/product-details`,
    method: "post",
  },
  addToCartProduct: {
    url: `${backendDomin}/api/addtocart`,
    method: "post",
  },
  clearAddToCartProduct: {
    url: `${backendDomin}/api/clear-cart`,
    method: "post",
  },
  addToCartProductCount: {
    url: `${backendDomin}/api/countCartProduct`,
    method: "post",
  },
  addToCartProductView: {
    url: `${backendDomin}/api/view-cart-product`,
    method: "post",
  },
  updateCartProduct: {
    url: `${backendDomin}/api/update-cart-product`,
    method: "post",
  },
  deleteCartProduct: {
    url: `${backendDomin}/api/delete-cart-product`,
    method: "post",
  },
  searchProduct: {
    url: `${backendDomin}/api/search`,
    method: "get",
  },
  filterProduct: {
    url: `${backendDomin}/api/filter-product`,
    method: "post",
  },
  order: {
    url: `${backendDomin}/api/order`,
    method: "post",
  },
  orderList: {
    url: `${backendDomin}/api/order-list`,
    method: "post",
  },
  allOrder: {
    url: `${backendDomin}/api/all-orders`,
    method: "post",
  },
};

export default SummaryApi;
