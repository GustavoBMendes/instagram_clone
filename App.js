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

import Routes from './src/Routes';

function App() {

  return (
    <NavigationContainer>
        <Routes />
    </NavigationContainer>
  );

}

export default App;
