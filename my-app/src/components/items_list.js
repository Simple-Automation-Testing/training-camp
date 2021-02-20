import React, { Component } from "react";

class Catalog extends Component {
  state = {
    show: false,
  };
  showList = () => {
    this.setState({ show: !this.state.show });
  };
  render() {
    const { show } = this.state;
    return (
      <div>
        <button onClick={this.showList}>{show ? "Скрыть" : "Показать"} </button>
        {show && <div>что-то</div>}
      </div>
    );
  }
}
export { Catalog };
