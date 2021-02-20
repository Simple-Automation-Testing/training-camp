import React, {Component} from 'react';
import {addItemToStore, getItemFromStore, getItemsByCategory, getFullStore, validateItem } from './storage';
import './App.css';

class App extends Component {

  state = null;

  fillNewItemToStore = (fieldName) => {
    return (event) => {
      this.setState({[fieldName]: event.target.value})
    }
  }

  addItem = () => {
    if(validateItem(this.state)) {
      addItemToStore(this.state)

      this.setState(null)

      document.querySelector('[name="name"]').value = ''
      document.querySelector('[name="price"]').value = ''
      document.querySelector('[name="category"]').value = ''
      document.querySelector('[name="size"]').value = ''
    } else {
      console.log('ERROR This item does not iclude required fields')
    }
  }

  render() {
    console.log('Store', getFullStore())
    console.log('State', this.state)
    return (
      <div className="App">
       <div>Введите имя товара          <input name="name" onChange={this.fillNewItemToStore('name')}/></div>
       <div>Введите цену товара         <input name="price" onChange={this.fillNewItemToStore('price')}/></div>
       <div>Введите категорию товара    <input name="category" onChange={this.fillNewItemToStore('category')}/></div>
       <div>Введите размер товара       <input name="size" onChange={this.fillNewItemToStore('size')} /></div>
        <div><button onClick={this.addItem}>Добавить товар на склад</button> </div>
      </div>
    );
  }
}

export default App;
