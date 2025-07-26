// API ендпоінти:
// https://dummyjson.com/docs/products - документація бекенду, розділ продукти
// https://dummyjson.com/products?limit=10&skip=10 - отримати всі продукти з пагінацією
// https://dummyjson.com/products/1 - отримати один продукт по ID
// https://dummyjson.com/products/search?q=nail - пошук продукту по ключовому слову
// https://dummyjson.com/products/category-list - отримати список категорій продуктів
// https://dummyjson.com/products/category/smartphones - отримати продукти по категорії

// Виписуємо сюди константи - урл, ендпоінти, ключі локал сторадж
export const BASE_URL = 'https://dummyjson.com';

export const ENDPOINTS = {
  ALL_PRODUCTS: '/products',
  PRODUCT_BY_ID: '/products/',
  SEARCH_PRODUCTS: '/products/search',
  CATEGORIES: '/products/category-list',
  PRODUCTS_BY_CATEGORY: '/products/category/',
};

export const ITEMS_PER_PAGE = 12;

export const LS_KEYS = {
  CART: 'cart',
  WISHLIST: 'wishlist',
  THEME: 'theme',
};
