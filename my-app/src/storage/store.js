const stubStoreNoCategory = [
  {name: 'Dress', price: 150, size: 'XL', brand: 'Bershka'},
  {name: 'Dress', price: 150, size: 'L', brand: 'Bershka'},
  {name: 'Dress', price: 150, size: 'M', brand: 'Bershka'},
  {name: 'Dress', price: 150, size: 'S', brand: 'Bershka'},
  {name: 'Mini Dress', price: 199, size: 'L', brand: 'Zara'},
  {name: 'Mini Dress', price: 199, size: 'M', brand: 'Zara'},
  {name: 'Mini Dress', price: 199, size: 'S', brand: 'Zara'},
  {name: 'Mini Dress', price: 199, size: 'XS', brand: 'Zara'},
];

const stubStoreShoes = [
  {name: 'Sneakers', price: 150, size: 'XL', brand: 'Nike'},
  {name: 'Sneakers', price: 150, size: 'L', brand: 'Nike'},
  {name: 'Sneakers', price: 150, size: 'M', brand: 'Nike'},
  {name: 'Sneakers', price: 150, size: 'S', brand: 'Nike'},
  {name: 'Sandals', price: 199, size: 'L', brand: 'Zara'},
  {name: 'Sandals', price: 199, size: 'M', brand: 'Zara'},
  {name: 'Sandals', price: 199, size: 'S', brand: 'Zara'},
  {name: 'Sandals', price: 199, size: 'XS', brand: 'Zara'},
];

const store = {
  noCategory: stubStoreNoCategory,
  shoes: stubStoreShoes,
};

const requiredFields = ['name', 'category', 'price', 'size', 'brand'];

function addItemToStore({category = 'noCategory', ...item}) {
  if(!store[category]) {
    store[category] = [];
  }
  store[category].push(item)
}

function getItemFromStore() {

}

function getItemsByCategory() {

}

function getFullStore() {
  return {...store};
}

function validateItem(item) {
  if(item && Object.keys(item).length === requiredFields.length) {
    const keys = Object.keys(item)
    const requiredKeysExist = keys.every((key) => {
      return requiredFields.includes(key)
    })
    if(!requiredKeysExist) {
      return false;
    }
    return keys.every((key) => Boolean(item[key]))
  }

  return false
}

export {
  addItemToStore,
  getItemFromStore,
  getItemsByCategory,
  getFullStore,
  requiredFields,
  validateItem
}