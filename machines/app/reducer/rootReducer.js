import {combineReducers, createStore} from 'redux';
import table from './machines';
import combains from './combaines';

const reducer = combineReducers({
  table,
  combains
})

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store;
