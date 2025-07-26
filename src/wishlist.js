//Логіка сторінки Wishlist
import { LS_KEYS } from './js/constants';
import {
  addToCartClick,
  addToWishClick,
  getProductByID,
  getProductsInWishlist,
} from './js/handlers';
import { closeModal } from './js/modal';
import { refs } from './js/refs';
import { getSavedProducts } from './js/storage';

// при оновленні сторінки записуємо кількість товарів з ЛС
refs.cartCount.textContent = getSavedProducts(LS_KEYS.CART).length;
refs.wishCount.textContent = getSavedProducts(LS_KEYS.WISHLIST).length;

getProductsInWishlist();

// 4. Додаємо слухача на список продуктів
refs.productsList.addEventListener('click', getProductByID);
// 4.1 Додаємо слухача на кнопку закриття модалки
refs.modalCloseBtn.addEventListener('click', closeModal);

// 6. Додаємо слухачів на кнопки Додавання товару у кошик і вішліст в модалці
refs.addToCartBtn.addEventListener('click', addToCartClick);
refs.addToWishBtn.addEventListener('click', async () => {
  addToWishClick();
  //   щоб при додаванні/видаленні з вішліста одразу оновлювалась сторінка
  await getProductsInWishlist();
});
