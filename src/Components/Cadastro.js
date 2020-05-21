import React from 'react';
import { View, StyleSheet, Dimensions, Button } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';

const initialLayout = { width: Dimensions.get('window').width };

function FirstRoute() {

	return (
		<View style={{ flex: 1, backgroundColor: '#fff' }} >
			<TextInput placeholder='Insira seu e-mail'/>
			<Button title='Avançar' onPress={() => false}/>
		</View>
	);
}

function SecondRoute() {
	const navigation = useNavigation();

	return (
		<View style={{ flex: 1, backgroundColor: '#fff' }} >
			<TextInput placeholder='Insira sua senha'/>
			<Button title='Cadastrar' onPress={() => navigation.navigate('Login')}/>
		</View>
	);
}

const renderTabBar = props => (
	<TabBar
		{...props}
		indicatorStyle={{ backgroundColor: 'black' }}
		style={{ backgroundColor: 'white' }}
		labelStyle={{color: 'black'}}
	/>
);

export default function Cadastro() {

	const [index, setIndex] = React.useState(0);
	const [routes] = React.useState([
		{ key: 'first', title: 'Email'},
		{ key: 'second', title: 'Senha' },
	]);

	const renderScene = SceneMap({
		first: FirstRoute,
		second: SecondRoute,
	});

	return (
		<TabView
			navigationState={{ index, routes }}
			renderScene={renderScene}
			onIndexChange={setIndex}
			initialLayout={initialLayout}
			renderTabBar={ renderTabBar }
		/>
	);

}

const styles = StyleSheet.create({
	scene: {
	  flex: 1,
	},
	tab_bar: {
		elevation: 0,
		backgroundColor: '#fff'
	},
});
