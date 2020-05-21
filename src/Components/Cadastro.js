import React from 'react';
import { View, StyleSheet, Dimensions, Button, SafeAreaView, StatusBar, Text } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useNavigation } from '@react-navigation/native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';

const initialLayout = { width: Dimensions.get('window').width };

function FirstRoute({jumpTo}) {

	return (
		<View style={{ flex: 1, backgroundColor: '#fff', }} >
			<StatusBar backgroundColor='#fff' barStyle='dark-content'/>
			<TextInput 
				placeholder='Insira seu e-mail' 
				placeholderTextColor='#bfbfbf' 
				style={{ marginHorizontal: 40, borderColor: '#f5f5f5', backgroundColor: '#fafafa', borderWidth: 1, borderRadius: 5, marginBottom: 10, marginTop: 10, height: 35 }}/>
			<TouchableOpacity 
				style={{ backgroundColor: '#3598f1', height: 35, borderRadius: 2, justifyContent: 'center', marginHorizontal: 40 }}
				onPress={() => jumpTo('second')}
			>
				<Text style={{ textAlign: 'center', color: '#fff' }}>AVANÇAR</Text>
			</TouchableOpacity>
			<Text style={{ color: '#bfbfbf', textAlign: 'center', marginTop: 10 }}>Não é spam!</Text>
		</View>
	);
}

function SecondRoute() {
	const navigation = useNavigation();

	return (
		<View style={{ flex: 1, backgroundColor: '#fff' }} >
			<StatusBar backgroundColor='#fff' barStyle='dark-content'/>
			<TextInput 
				placeholder='Insira uma senha' 
				placeholderTextColor='#bfbfbf' 
				style={{ marginHorizontal: 40, borderColor: '#f5f5f5', backgroundColor: '#fafafa', borderWidth: 1, borderRadius: 5, marginBottom: 10, marginTop: 10, height: 35 }}/>
			<TouchableOpacity style={{ backgroundColor: '#3598f1', height: 35, borderRadius: 2, justifyContent: 'center', marginHorizontal: 40 }}>
				<Text style={{ textAlign: 'center', color: '#fff' }}>AVANÇAR</Text>
			</TouchableOpacity>
			<Text style={{ color: '#bfbfbf', textAlign: 'center', marginTop: 10, marginHorizontal: 40 }}>Dica: Crie uma senha de no mínimo 7 caracteres, contendo letras e números.</Text>
		</View>
	);
}

const renderTabBar = props => (
	<SafeAreaView>
		<View style={{ backgroundColor: '#fff', height: 120 }}>
		<TabBar
			{...props}
			indicatorStyle={{ backgroundColor: 'black' }}
			style={{ backgroundColor: '#fff', top: 50, marginHorizontal: 40 }}
			labelStyle={{color: 'black'}}
		/>
		</View>
	</SafeAreaView>
);

export default function Cadastro() {

	const [index, setIndex] = React.useState(0);
	const [routes] = React.useState([
		{ key: 'first', title: 'Email'},
		{ key: 'second', title: 'Senha' },
	]);

	const renderScene = ({ route, jumpTo }) => {
		switch (route.key) {
			case 'first':
				return <FirstRoute jumpTo={jumpTo} />
			
			case 'second':
				return <SecondRoute jumpTo={jumpTo} />
		}
	}

	return (
			<TabView
				navigationState={{ index, routes }}
				renderScene={renderScene}
				onIndexChange={setIndex}
				initialLayout={initialLayout}
				renderTabBar={ renderTabBar }
				swipeEnabled={false} 
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
