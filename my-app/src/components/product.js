import React from 'react';

function Product({name, price, size, brand}) {
  return (
    <div className="product">
      <div>Имя товара {name}</div>
      <div>Цена товара {price}</div>
      <div>Размер {size}</div>
      <div>Бренд {brand}</div>
    </div>
  )
}

export {
  Product
}