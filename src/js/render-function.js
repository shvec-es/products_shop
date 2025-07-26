import { activeFirstBtnInCategories } from './helpers';
import { refs } from './refs';

// тут всі функції рендеру
// 1
export const renderCategories = data => {
  const markup = data
    .map(
      el => `<li class="categories__item">
   <button class="categories__btn" type="button">${el}</button>
 </li>`
    )
    .join('');

  refs.categoriesList.innerHTML = markup;

  //   додаємо активний клас на першу кнопку
  activeFirstBtnInCategories();
};

// 2, 3, 5
export const renderProducts = data => {
  const markup = data
    .map(
      ({
        id,
        thumbnail,
        title,
        brand,
        category,
        price,
      }) => `<li class="products__item" data-id="${id}">
    <img class="products__image" src="${thumbnail}" alt="${title}"/>
    <p class="products__title">${title}</p>
    <p class="products__brand"><span class="products__brand--bold">Brand:</span> ${brand}</p>
    <p class="products__category">Category: ${category}</p>
    <p class="products__price">Price: ${price}$</p>
 </li>`
    )
    .join('');

  refs.productsList.insertAdjacentHTML('beforeend', markup);
};

// (3) робимо функцію для очищення списку продуктів
export const clearProductsList = () => {
  refs.productsList.innerHTML = '';
};

// 4
export const renderProductInModal = ({
  thumbnail,
  title,
  tags,
  description,
  shippingInformation,
  returnPolicy,
  price,
}) => {
  //  окремо мапаємо тегі щоб сторити динамічно список
  const tagsInMarkup = tags
    .map(tag => `<li class="modal-product__tag">${tag}</li>`)
    .join('');

  const markup = `<img class="modal-product__img" src="${thumbnail}" alt="${title}" />
      <div class="modal-product__content">
        <p class="modal-product__title">${title}</p>
        <ul class="modal-product__tags">${tagsInMarkup}</ul>
        <p class="modal-product__description">${description}</p>
        <p class="modal-product__shipping-information">Shipping:${shippingInformation} </p>
        <p class="modal-product__return-policy">Return Policy: ${returnPolicy}</p>
        <p class="modal-product__price">Price: ${price}$</p>
        <button class="modal-product__buy-btn" type="button">Buy</button>
      </div>`;
  refs.divModalProduct.innerHTML = markup;
};

// пагінація
export const showLoadMore = () => {
  refs.loadMoreBtn.classList.remove('is-hidden');
};

export const hideLoadMore = () => {
  refs.loadMoreBtn.classList.add('is-hidden');
};

// функція для сторінки Cart -> Summary
export const countSummary = products => {
  refs.cartItemsCount.textContent = products.length;
  const totalPrice = products.reduce(
    (total, product) => total + product.price,
    0
  );
  refs.cartItemsPrice.textContent = `$${totalPrice.toFixed(2)}`;
};
