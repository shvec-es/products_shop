import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { ITEMS_PER_PAGE } from './constants';
import { refs } from './refs';
import { hideLoadMore, showLoadMore } from './render-function';

// функція для сповіщень ізітоаст
export const showToastMessage = (message, type) => {
  const options = {
    message,
    position: 'topRight',
  };

  switch (type) {
    case 'success':
      iziToast.success(options);
      break;

    case 'info':
      iziToast.info(options);
      break;

    case 'warning':
      iziToast.warning(options);
      break;

    case 'error':
      iziToast.error(options);
      break;

    default:
      iziToast.error({
        message: 'Invalid type of toast',
        position: 'topRight',
        timeout: 5000,
      });
  }
};

// функція для видалення класу активної кнопки категорій
export const removeActiveBtn = () => {
  // 1 варінат - перебираємо всі кнопки і видаляємо активний клас
  // + масштабовано, - даремно перебираємо кнопки оскільки активна тільки 1
  //   const allBtns = document.querySelectorAll('.categories__btn');
  //   allBtns.forEach(btn => btn.classList.remove('categories__btn--active'));

  // 2 варіант - шукаємо тільки активну кнопку і видаляємо з неї клас
  // + швидно, бо кнопка завжди одна, - не можна масштабувати
  const activeBtn = document.querySelector('.categories__btn--active');
  if (activeBtn) {
    activeBtn.classList.remove('categories__btn--active');
  }
};

// виносимо функцію активації першої кнопки категорій окремо, бо вона потрібна не один раз
export const activeFirstBtnInCategories = () => {
  const firstBtn = refs.categoriesList.querySelector('.categories__btn');
  if (firstBtn) {
    firstBtn.classList.add('categories__btn--active');
  }
};

// функція для перевірки чи потрібно показувати кнопку Лоад мо
export const checkVisibilityLoadMoreButton = (total, currentPage) => {
  if (Math.ceil(total / ITEMS_PER_PAGE) === currentPage) {
    hideLoadMore();
    showToastMessage('No more products to load', 'info');
  } else {
    showLoadMore();
  }
};
