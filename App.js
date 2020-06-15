/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from './src/Firebase';
//import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';

import Routes from './src/Routes';
import reducers from './src/Reducers/';

class App extends Component {
  /*
  componentDidMount() {
    const config = {
      apiKey: "AIzaSyDGv858fCpa7ee1Ws7n1zEkREUyeTfchlQ",
      authDomain: "instaclone-3b084.firebaseapp.com",
      databaseURL: "https://instaclone-3b084.firebaseio.com",
      projectId: "instaclone-3b084",
      storageBucket: "instaclone-3b084.appspot.com",
      messagingSenderId: "530990536179",
      appId: "1:530990536179:web:c5c6f51b4cac3d21d8ae86",
      measurementId: "G-1EES1800BY"
    };
    firebase.initializeApp(config);
  }
  */
  render() {
    firebase;
    return (
      <NavigationContainer>
        <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
          <Routes />
        </Provider>
      </NavigationContainer>
    );
  }
}

export default App;
