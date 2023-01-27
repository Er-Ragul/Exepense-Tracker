import React, { useEffect, useState } from 'react';
import Router from './components/router/Router';
import store from './redux/store';
import { Provider } from 'react-redux'

export default function App() {
  return(
    <Provider store={store}>
      <Router />
    </Provider>
  )
}