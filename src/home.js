//Логіка сторінки Home
import { LS_KEYS } from './js/constants';
import {
  getCategories,
  getProductByID,
  getProductsBySearchName,
  getProducts,
  getProductsByCategory,
  clearProductsBySearchForm,
  getProductsByLoadMore,
  addToCartClick,
  addToWishClick,
} from './js/handlers';
import { closeModal } from './js/modal';
import { refs } from './js/refs';
import { getSavedProducts } from './js/storage';

// 1, 2. при завантаженні сторінки робимо запит за всіма категоріями, продуктами (1 сторінка)
getCategories();
getProducts();

// 3. Додаємо слухача на список категорій - делегування
refs.categoriesList.addEventListener('click', getProductsByCategory);

// 4. Додаємо слухача на список продуктів
refs.productsList.addEventListener('click', getProductByID);
// 4.1 Додаємо слухача на кнопку закриття модалки
refs.modalCloseBtn.addEventListener('click', closeModal);

// 5. Додаємо слухача на форму для пошуку товарів по назві
refs.searchForm.addEventListener('submit', getProductsBySearchName);
// 5.1 Додаємо слухача для очищення від запиту в формі
refs.searchClearForm.addEventListener('click', clearProductsBySearchForm);

// пагінація
refs.loadMoreBtn.addEventListener('click', getProductsByLoadMore);

// 6. Додаємо слухачів на кнопки Додавання товару у кошик і вішліст в модалці
refs.addToCartBtn.addEventListener('click', addToCartClick);
refs.addToWishBtn.addEventListener('click', addToWishClick);

// при оновленні сторінки записуємо кількість товарів з ЛС
refs.cartCount.textContent = getSavedProducts(LS_KEYS.CART).length;
refs.wishCount.textContent = getSavedProducts(LS_KEYS.WISHLIST).length;
