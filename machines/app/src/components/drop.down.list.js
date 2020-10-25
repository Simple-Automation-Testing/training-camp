import React, {Component} from 'react';
import classnames from 'classnames';


class DropDownList extends Component {
  state = {
    open: false
  }

  openList = () => this.setState({open: true});

  selectOption = (option) => {
    const {onSelect} = this.props;
    onSelect(option);
    console.log()
    this.setState({open: false})
  }

  render() {
    const {currentSelected = 'Виберіть варіант',  options, className} = this.props
    const {open} = this.state
    const classNames = classnames('dropdown', className);
    console.log(open)
    return (
      <div className={classNames}>


        <button className="btn btn-secondary dropdown-toggle" type="button"
          id="dropdownMenu2"
          onClick={this.openList}
        >
          {currentSelected}
        </button>
        {open && <div className="dropdown-menu" style={{display: 'block'}}>
          {
            options.map(({option}) => <button className="dropdown-item" type="button" onClick={() => this.selectOption(option)}>{option}</button>)
          }
        </div>}
      </div>
    )
  }
}

export {
  DropDownList
}