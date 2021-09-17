function setItem(k, i) {
  localStorage.setItem(k, JSON.stringify(i))
}

function getItem(k) {
  return JSON.parse(localStorage.getItem(k))
}

export {
  setItem,
  getItem
}