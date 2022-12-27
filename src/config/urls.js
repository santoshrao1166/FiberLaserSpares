export const API_BASE_URL = "https://api.nayabazaar.store/"
export const getApiUrl = (endpoint) => API_BASE_URL + endpoint

export const LOGIN = getApiUrl('auth/login')
export const SIGNUP = getApiUrl('auth/register');
export const SENTOTP = getApiUrl('auth/resend_otp');
export const VERIFYOTP = getApiUrl('auth/verify_otp');
export const GET_ALL_SUB_CATEGORIES = getApiUrl('sub_category/all/');
export const GET_ALL_PRODUCTS_BY_SUB_CATEGORIES = getApiUrl('product?sub_category_id=');
export const GET_SINGLE_PRODUCT = 'products/';
export const SEARCH_PRODUCT = getApiUrl('product?title=');
export const ADDRESS = getApiUrl('address');
export const GET_ALL_CITY = getApiUrl('cityandpin');
export const GET_USER = getApiUrl('profile');
export const CREATE_GUEST_USER = getApiUrl('guest-user/create');
export const ADDRESS_GUEST = getApiUrl('guest-address');
export const GET_ADDRESS_GUEST = getApiUrl('guest-address?guest_user_id=');


//cart
export const CART = getApiUrl('cart');
export const CHANGE_CART_QUANTITY = getApiUrl('cart/quantity');
export const GET_RAZOR_PAY = getApiUrl('order/razorpay_order');

//Guest

export const GUEST_CART = getApiUrl('guest-cart');
export const CHANGE_GUEST_CART_QUANTITY = getApiUrl('guest-cart/quantity');
export const GET_GUEST_CART= getApiUrl('guest-cart?guest_user_id=');

//order
export const CREATE_ORDER = getApiUrl('order/place_order');
export const ALL_ORDERS = getApiUrl('order');
export const GET_INDIVIDUAL_ORDER = getApiUrl('order/');

////cart apis
export const GET_PRODUCTS = 'products';
export const GET_ALL_CATEGORIES = 'products/categories';
export const GET_ALL_ATTRIBUTETERMS = 'products/attributes/1/terms';
export const GET_ALL_ORDERS = 'orders';
export const GET_CUTOMER_DATA = 'customers/';



