/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from './src/Firebase';
import ReduxThunk from 'redux-thunk';

import Routes from './src/Routes';
import reducers from './src/Reducers/';

function App() {
  firebase;
  return (
    <NavigationContainer>
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        <Routes />
      </Provider>
    </NavigationContainer>
  );

}

export default App;
