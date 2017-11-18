import React, { Component } from 'react';
import './App.css';
import {Provider,connect} from 'react-redux';
import {createStore} from 'redux';
import allReducers from './reducers/index';
import EditorPage from './containers/EditorPage';
import Test from "./components/test";
const store =createStore(allReducers);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <EditorPage/>
      </Provider>
    );
  }
}

export default App;
