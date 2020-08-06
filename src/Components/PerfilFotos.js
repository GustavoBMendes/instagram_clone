import React from 'react';
import { View, Dimensions, SafeAreaView, Text, Image, StyleSheet, } from 'react-native';
import { TabView, TabBar, } from 'react-native-tab-view';

import Images from '../imgs/index';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';

const initialLayout = { width: Dimensions.get('window').width };

const Fotos = ({ item }) => {
	console.log('FOTOo', item);
	return (
		<View>
			
			<FlatList
				contentContainerStyle={{flexDirection : 'row', flexWrap : "wrap"}} 
				data={item}
				renderItem={({ item }) => {
					return(
						<Image source={{ uri: item.foto }} style={styles.imageWrap}/>
					);
				}}
				keyExtractor={item=> item.foto}
			/>

		</View>
	);
}

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
				renderLabel={({ route, focused, color }) => (
					<Image source={route.imagem} style={{ height: 25, width: 25 }} />
				)}
			/>
		</View>
	</SafeAreaView>
);

export default function PerfilFotos({ fotos }) {
	console.log('FOTOSSS', fotos);
	const [index, setIndex] = React.useState(0);
	const [routes] = React.useState([
		{ key: 'first', title: 'Fotos', imagem: Images.fotos_postadas },
		{ key: 'second', title: 'Marcado', imagem: Images.marcadas },
	]);

	const renderScene = ({ route }) => {
		switch (route.key) {
			case 'first':
				return <Fotos item={fotos}/>
			
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

const styles = StyleSheet.create({

	imageWrap: { 
		width: (Dimensions.get('window').width/3) - 2, 
		height: (Dimensions.get('window').width/3) - 2,
		margin: 1,
		padding: 1, 
	},

})
