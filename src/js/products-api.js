// тут пишемо функції запитів на бекенд або один клас

// API ендпоінти:
// https://dummyjson.com/docs/products - документація бекенду, розділ продукти
// https://dummyjson.com/products?limit=10&skip=10 - отримати всі продукти з пагінацією
// https://dummyjson.com/products/1 - отримати один продукт по ID
// https://dummyjson.com/products/search?q=nail - пошук продукту по ключовому слову
// https://dummyjson.com/products/category-list - отримати список категорій продуктів
// https://dummyjson.com/products/category/smartphones - отримати продукти по категорії

import axios from 'axios';
import { BASE_URL, ENDPOINTS, ITEMS_PER_PAGE } from './constants';

// додаємо base url через дефолтні налаштування аксіос, щоб не додавати в кожний запит окремо
axios.defaults.baseURL = BASE_URL;

// 1. запит за всіма категоріями
export const fetchAllCategories = async () => {
  const { data } = await axios(ENDPOINTS.CATEGORIES);
  return data;
};

// 2. запит за всіма продуктами з пагінацією
// для пагінації функція приймає параметр page, по дефолту значення 1 (1 сторінка)
export const fetchAllProducts = async (page = 1) => {
  // пагінація реалізується через skip (кількість елементів, що треба пропустити)
  // тому необхідно розрахувати
  const skip = (page - 1) * ITEMS_PER_PAGE;
  const { data } = await axios(
    `${ENDPOINTS.ALL_PRODUCTS}?limit=${ITEMS_PER_PAGE}&skip=${skip}`
  );
  return data;
};

// 3. запит за продуктами певної категорії
export const fetchProductsByCategory = async category => {
  const { data } = await axios(`${ENDPOINTS.PRODUCTS_BY_CATEGORY}${category}`);
  return data;
};

// 4. запит за продуктом по айді
export const fetchProductById = async id => {
  const { data } = await axios(`${ENDPOINTS.PRODUCT_BY_ID}${id}`);
  return data;
};

// 5. запит по пошуковому слову
export const fetchProductsByName = async name => {
  const { data } = await axios(`${ENDPOINTS.SEARCH_PRODUCTS}?q=${name}`);
  return data;
};

// запит за всіма продуктами по айдішкам для сторінки Wishlist
export const fetchProductsByIds = async ids => {
  return Promise.all(ids.map(id => fetchProductById(id)));
};
