const store = {
  noCategory: []
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