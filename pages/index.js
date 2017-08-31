import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import Page from '../layouts/main';

import App from '../components/app';
import reducers from '../reducers';

const createStoreWithMiddleware = applyMiddleware()(createStore);

export default class Home extends Component{
  render(){
    return (
    <Page>
      <Provider store={createStoreWithMiddleware(reducers)}>
        <App/>
      </Provider>
    </Page>
    )
  }
}