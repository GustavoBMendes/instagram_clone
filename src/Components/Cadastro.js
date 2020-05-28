import React from 'react';
import { View, StyleSheet, Dimensions, SafeAreaView, } from 'react-native';
import { TabView, TabBar, } from 'react-native-tab-view';
import { useNavigation } from '@react-navigation/native';
import FirstRoute from './EmailCad';
import SecondRoute from './SenhaCad';

const initialLayout = { width: Dimensions.get('window').width };

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

	const navigation = useNavigation();
	const [index, setIndex] = React.useState(0);
	const [routes] = React.useState([
		{ key: 'first', title: 'Email'},
		{ key: 'second', title: 'Senha' },
	]);

	const renderScene = ({ route, jumpTo }) => {
		switch (route.key) {
			case 'first':
				return <FirstRoute jumpTo={jumpTo}/>
			
			case 'second':
				return <SecondRoute navigation={navigation}/>
		}
	}

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
	butao: {
		backgroundColor: '#3598f1', 
		height: 35, 
		borderRadius: 2, 
		justifyContent: 'center', 
		marginHorizontal: 40,
	},
	textinput: { 
		marginHorizontal: 40, 
		borderColor: '#f5f5f5', 
		backgroundColor: '#fafafa', 
		borderWidth: 1, 
		borderRadius: 5, 
		marginBottom: 10, 
		marginTop: 10, 
		height: 35,
	},
	texto: {
		color: '#bfbfbf', 
		textAlign: 'center', 
		marginTop: 10, 
		marginHorizontal: 40,
	},

});


/*
const mapStateToProps = state => ({
	email: state.AutenticacaoReducer.email,
	senha: state.AutenticacaoReducer.senha,
});

export default connect(mapStateToProps, { modificaEmail, modificaSenha, cadastraUsuario })(Cadastro);
*/