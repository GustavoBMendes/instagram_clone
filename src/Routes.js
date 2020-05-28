import React, { Component } from 'react';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';

import Login from './Components/Login';
import Cadastro from './Components/Cadastro';
import Feed from './Components/Feed';
import { Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const Stack = createStackNavigator();

function LogoTitle() {
	return (
		<Image source={require('./imgs/instagram_logo.svg')} style={{ height: 45, width: 150 }}/>
	);
}

function Camera() {
	const navigation = useNavigation();
	return (
		<TouchableOpacity onPress={() => false}>
			<Image source={require('./imgs/fotografia.png')} style={{ height: 30, width: 30, marginLeft: 10 }}/>
		</TouchableOpacity>
	);
}

function Direct() {
	const navigation = useNavigation();
	return (
		<TouchableOpacity onPress={() => false}>
			<Image source={require('./imgs/enviar.png')} style={{ height: 30, width: 30, marginRight: 10 }} />
		</TouchableOpacity>
	);
}

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

				<Stack.Screen 
					name='Feed'
					component={Feed}
					options={{
						headerTitle: props => <LogoTitle {...props} />,
						headerBackTitleVisible: false,
						headerLeft: props => <Camera {...props}/>,
						headerRight: props => <Direct {...props}/>,
						headerStyle: {
							borderWidth: 1,
							borderColor: '#f5f5f5'
						}
					}}
				/>

			</Stack.Navigator>
		);

	}

}