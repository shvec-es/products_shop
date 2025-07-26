import { LS_KEYS } from './constants';
import {
  activeFirstBtnInCategories,
  checkVisibilityLoadMoreButton,
  removeActiveBtn,
  showToastMessage,
} from './helpers';
import { openModal } from './modal';
import {
  fetchAllCategories,
  fetchAllProducts,
  fetchProductById,
  fetchProductsByName,
  fetchProductsByCategory,
  fetchProductsByIds,
} from './products-api';
import { refs } from './refs';
import {
  clearProductsList,
  countSummary,
  hideLoadMore,
  renderCategories,
  renderProductInModal,
  renderProducts,
  showLoadMore,
} from './render-function';
import {
  addToLS,
  getFromStorage,
  getSavedProducts,
  isInLS,
  removeFromLS,
  removeFromStorage,
  saveToStorage,
} from './storage';

let currentPage = 1;
let productId = null;

// 1. робимо запит за всіма категоріями
export const getCategories = async () => {
  try {
    const categories = await fetchAllCategories();
    renderCategories(['All', ...categories]);
  } catch (error) {
    console.log(error);
  }
};

// 2. робимо запит за продуктами з пагінацією
export const getProducts = async page => {
  clearProductsList();
  try {
    const { products, total } = await fetchAllProducts(page);
    renderProducts(products);
    checkVisibilityLoadMoreButton(total, currentPage);
  } catch (error) {
    console.log(error);
  }
};

// 3. при кліку на список категорій перевіряємо клік на кнопці,
// забираємо текст кнопки і робимо запит за продуктами певної категорії
export const getProductsByCategory = async ({ target }) => {
  if (target.nodeName !== 'BUTTON') return;
  clearProductsList();
  removeActiveBtn();
  hideLoadMore();

  try {
    let products = null;
    if (target.textContent.toLowerCase() === 'all') {
      const data = await fetchAllProducts();
      products = data.products;
      showLoadMore();
    } else {
      const data = await fetchProductsByCategory(target.textContent);
      products = data.products;
    }

    // якщо продуктів не знайдено, показуємо нот-фаунд і очищуємо список продуктів
    if (products.length === 0) {
      refs.divNotFound.classList.add('not-found--visible');
      return;
    }
    refs.divNotFound.classList.remove('not-found--visible');
    target.classList.add('categories__btn--active');
    renderProducts(products);
  } catch (error) {
    console.log(error);
  }
};

// 4. Реалізуємо делегування на список продуктів для запиту за детальною інфо по продукту (по ID)
export const getProductByID = async ({ target }) => {
  // оскільки при кліку на картку можна попасти на будь-який вкладений елемента,
  // а нам треба на лі, щоб взяти айді, використовуємо closest
  const li = target.closest('.products__item');
  if (!li) return;

  productId = li.dataset.id;
  try {
    const data = await fetchProductById(productId);
    // треба перевірити що написати на кнопках перш ніж відкрити модалку
    const isInCart = isInLS(LS_KEYS.CART, productId);
    const isInWishlist = isInLS(LS_KEYS.WISHLIST, productId);
    refs.addToCartBtn.textContent = isInCart
      ? 'Remove from cart'
      : 'Add to Cart';
    refs.addToWishBtn.textContent = isInWishlist
      ? 'Remove from Wishlist'
      : 'Add to Wishlist';
    renderProductInModal(data);
    openModal();
  } catch (error) {
    console.log(error);
  }
};

// 5. Реалізуємо пошук по назві продукту в формі
export const getProductsBySearchName = async event => {
  event.preventDefault();

  const inputValue = event.target.elements.searchValue.value.trim();

  if (!inputValue) {
    showToastMessage('You need to enter something for search', 'info');
    return;
  }
  clearProductsList();
  hideLoadMore();

  try {
    const { products } = await fetchProductsByName(inputValue);

    // якщо продуктів не знайдено, показуємо нот-фаунд і очищуємо список продуктів
    if (products.length === 0) {
      refs.divNotFound.classList.add('not-found--visible');
      return;
    }
    renderProducts(products);
    // робимо копію, щоб завантажити перші 12 продуктів
    // const productsFirstPage = products.slice(0, 12);
    // renderProducts(productsFirstPage);
  } catch (error) {
    console.log(error);
  }
};

// 5.1
export const clearProductsBySearchForm = async () => {
  refs.searchForm.reset();
  getProducts();
  removeActiveBtn();
  activeFirstBtnInCategories();
};

// пагінація
export const getProductsByLoadMore = async () => {
  currentPage++;
  try {
    const { products, total } = await fetchAllProducts(currentPage);
    renderProducts(products);
    checkVisibilityLoadMoreButton(total, currentPage);
  } catch (error) {
    console.log(error);
  }
};

// 6.1 Реалізуємо додавання/видалення товару до/з кошика
export const addToCartClick = () => {
  if (!productId) return;

  // productId оголошуємо глобально, а записуємо при відкритті модалки
  const isInCart = isInLS(LS_KEYS.CART, productId);
  if (isInCart) {
    // якщо айді є в ЛС,маємо видаляти продукт з ЛС, міняти кнопку на Адд
    refs.addToCartBtn.textContent = 'Add to Cart';
    removeFromLS(LS_KEYS.CART, productId);
    refs.cartCount.textContent--;
  } else {
    // якщо немає - додаємо продукт в ЛС, міняємо кнопку на Ремув
    refs.addToCartBtn.textContent = 'Remove from cart';
    addToLS(LS_KEYS.CART, productId);
    refs.cartCount.textContent++;
  }
};
// 6.2 Реалізуємо додавання/видалення товару до/з вішліста
export const addToWishClick = () => {
  if (!productId) return;

  // productId оголошуємо глобально, а записуємо при відкритті модалки
  const isInWishlist = isInLS(LS_KEYS.WISHLIST, productId);
  if (isInWishlist) {
    // якщо айді є в ЛС,маємо видаляти продукт з ЛС, міняти кнопку на Адд
    refs.addToWishBtn.textContent = 'Add to Wishlist';
    removeFromLS(LS_KEYS.WISHLIST, productId);
    refs.wishCount.textContent--;
  } else {
    // якщо немає - додаємо продукт в ЛС, міняємо кнопку на Ремув
    refs.addToWishBtn.textContent = 'Remove from Wishlist';
    addToLS(LS_KEYS.WISHLIST, productId);
    refs.wishCount.textContent++;
  }
};

// WISHLIST-PAGE
export const getProductsInWishlist = async () => {
  const savedProducts = getSavedProducts(LS_KEYS.WISHLIST);
  clearProductsList();
  if (savedProducts.length === 0) {
    refs.divNotFound.classList.add('not-found--visible');
    return;
  }
  refs.divNotFound.classList.remove('not-found--visible');
  try {
    const data = await fetchProductsByIds(savedProducts);
    renderProducts(data);
  } catch (error) {
    console.log(error);
  }
};

// CART-PAGE
export const getProductsInCart = async () => {
  const savedProducts = getSavedProducts(LS_KEYS.CART);
  clearProductsList();
  if (savedProducts.length === 0) {
    refs.divNotFound.classList.add('not-found--visible');
    countSummary([]); // щоб очистити summary одразу коли пусто
    return;
  }
  refs.divNotFound.classList.remove('not-found--visible');
  try {
    const data = await fetchProductsByIds(savedProducts);
    countSummary(data);
    renderProducts(data);
  } catch (error) {
    console.log(error);
  }
};

export const cartBuyProductsClick = () => {
  const savedProducts = getSavedProducts(LS_KEYS.CART);
  if (savedProducts.length === 0) {
    showToastMessage('You have no products to buy', 'warning');
    return;
  }

  showToastMessage('Thank you for your order!', 'success');
  countSummary([]);
  refs.cartCount.textContent = 0;
  removeFromStorage(LS_KEYS.CART);
  clearProductsList();
  refs.divNotFound.classList.add('not-found--visible');
};
