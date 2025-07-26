import { refs } from './refs';

// функції для закриття модалки при кліку на Escape чи на бекдроп
const onEscKeyPress = event => {
  if (event.code === 'Escape') {
    closeModal();
  }
};

const onBackdropClick = ({ target }) => {
  if (target === refs.divModal) {
    closeModal();
  }
};

export const openModal = () => {
  refs.divModal.classList.add('modal--is-open');
  //   body-scroll-lock
  document.body.style.overflow = 'hidden';
  //   додаємо слухачів при відкритті модалки
  window.addEventListener('keydown', onEscKeyPress);
  refs.divModal.addEventListener('click', onBackdropClick);
};

export const closeModal = () => {
  refs.divModal.classList.remove('modal--is-open');
  //   body-scroll-unlock
  document.body.style.overflow = 'auto';
  //   видаляємо слухачів при закритті модалки, щоб вона не накопичувались в памʼяті
  window.removeEventListener('keydown', onEscKeyPress);
  refs.divModal.removeEventListener('click', onBackdropClick);
};
