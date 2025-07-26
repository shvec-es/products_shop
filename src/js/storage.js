export const getFromStorage = key => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error(`Error getting data from localStorage: ${error.message}`);
    return null;
  }
};

export const saveToStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving data to localStorage: ${error.message}`);
  }
};

export const removeFromStorage = key => {
  localStorage.removeItem(key);
};

// забираємо всі продукти з ЛС по ключу
export const getSavedProducts = key => {
  return getFromStorage(key) || [];
};

// функція для перевірки чи є продукт по айді в ЛС
export const isInLS = (key, id) => {
  const savedProducts = getSavedProducts(key);
  return savedProducts.includes(id);
};

// функція для додавання продукта в ЛС
export const addToLS = (key, id) => {
  const savedProducts = getSavedProducts(key);
  savedProducts.push(id);
  saveToStorage(key, savedProducts);
};

// функція для видалення продукта з ЛС
export const removeFromLS = (key, id) => {
  const savedProducts = getSavedProducts(key);
  const updatedProductes = savedProducts.filter(prodId => prodId !== id);
  saveToStorage(key, updatedProductes);
};
