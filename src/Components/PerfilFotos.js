import React from 'react';
import { View, Dimensions, SafeAreaView, Text } from 'react-native';
import { TabView, TabBar, } from 'react-native-tab-view';

const initialLayout = { width: Dimensions.get('window').width };

const Fotos = () => (
	<Text>FOTOS</Text>
);

const Marcado = () => (
	<Text>Marcado</Text>
);

const renderTabBar = props => (
	<SafeAreaView>
		<View style={{ backgroundColor: '#fff', }}>
			<TabBar
				{...props}
				indicatorStyle={{ backgroundColor: 'black' }}
				style={{ backgroundColor: '#fff', }}
				labelStyle={{color: 'black'}}
			/>
		</View>
	</SafeAreaView>
);

export default function PerfilFotos() {

	const [index, setIndex] = React.useState(0);
	const [routes] = React.useState([
		{ key: 'first', title: 'Fotos'},
		{ key: 'second', title: 'Marcado' },
	]);

	const renderScene = ({ route }) => {
		switch (route.key) {
			case 'first':
				return <Fotos />
			
			case 'second':
				return <Marcado />
		}
	}

	return (
			<TabView
				navigationState={{ index, routes }}
				renderScene={renderScene}
				onIndexChange={setIndex}
				initialLayout={initialLayout}
				renderTabBar={ renderTabBar }
				style={{ flex: 10 }}
			/>
	);

}
