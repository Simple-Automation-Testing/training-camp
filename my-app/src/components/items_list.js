import React, {Component} from "react";
import {Product} from './product'

class Catalog extends Component {
  state = {
    show: false,
  };

  showList = () => {
    this.setState({ show: !this.state.show });
  };



  render() {
    const {catalog} = this.props;
    const {show} = this.state;

    // noCategory: (8) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
    // shoes: (8) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]

    const catalogKeys = Object.keys(catalog);

    return (
      <div>
        <button onClick={this.showList}>{show ? "Скрыть" : "Показать"} </button>
        {show && <div>{
          catalogKeys.map((category) => <div>{
            catalog[category].map((item) => <Product {...item}/>)
          }</div>)
        }</div>}
      </div>
    );
  }
}
export { Catalog };
