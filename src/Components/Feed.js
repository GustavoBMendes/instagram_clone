import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

function Home() {
	return (
		<View>
			<Text>Home</Text>
		</View>
	)
}

function Perfil() {
	return (
		<View>
			<Text>Perfil</Text>
		</View>
	)
}

export default class Feed extends Component {

	render() {
		return (
			<Tab.Navigator>
				<Tab.Screen name='Home' component={() => <Home title='Home'/>}/>
				<Tab.Screen name='Perfil' component={() => <Perfil title='Perfil'/>}/>
			</Tab.Navigator>
		);
	}

}
