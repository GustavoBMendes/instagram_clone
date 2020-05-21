import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './Components/Login';
import Cadastro from './Components/Cadastro';

const Stack = createStackNavigator();

export default class Routes extends Component {

	render() {

		return (
			<Stack.Navigator
				initialRouteName='Login'
			>
				<Stack.Screen 
					name='Login'
					component={Login}
					options={{ headerShown: false }}
				/>

				<Stack.Screen
					name='Cadastro'
					component={Cadastro}
					options={{ headerShown: false }}
				/>

			</Stack.Navigator>
		);

	}

}