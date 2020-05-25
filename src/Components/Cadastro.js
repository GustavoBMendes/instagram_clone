import React from 'react';
import { View, StyleSheet, Dimensions, Button, SafeAreaView, StatusBar, Text } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
//import { modificaEmail, modificaSenha, cadastraUsuario } from '../Actions/AutenticacaoActions';
import FirstRoute from './EmailCad';
import SecondRoute from './SenhaCad';

const initialLayout = { width: Dimensions.get('window').width };

/*
function FirstRoute({jumpTo, props}) {

	return (
		<View style={{ flex: 1, backgroundColor: '#fff', }} >
			<StatusBar backgroundColor='#fff' barStyle='dark-content'/>
			<TextInput 
				placeholder='Insira seu e-mail' 
				placeholderTextColor='#bfbfbf' 
				style={styles.textinput}
				onChangeText={ texto => props.modificaEmail(texto) }
			/>
			<TouchableOpacity 
				style={styles.butao}
				onPress={() => jumpTo('second')}
			>
				<Text style={{ textAlign: 'center', color: '#fff' }}>AVANÇAR</Text>
			</TouchableOpacity>
			<Text style={styles.texto}>Não é spam!</Text>
		</View>
	);
}


function SecondRoute({props}) {
	const navigation = useNavigation();

	return (
		<View style={{ flex: 1, backgroundColor: '#fff' }} >
			<StatusBar backgroundColor='#fff' barStyle='dark-content'/>
			<TextInput 
				placeholder='Insira uma senha' 
				placeholderTextColor='#bfbfbf' 
				style={styles.textinput}	
				onChangeText={ texto => props.modificaSenha(texto) }
			/>
			<TouchableOpacity 
				style={styles.butao}
				onPress={() => navigation.navigate('Login')}
			>
				<Text style={{ textAlign: 'center', color: '#fff' }}>FINALIZAR CADASTRO</Text>
			</TouchableOpacity>
			<Text style={styles.texto} >Dica: Crie uma senha de no mínimo 7 caracteres, contendo letras e números.</Text>
		</View>
	);
}
*/

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
				return <FirstRoute jumpTo={jumpTo}/>
			
			case 'second':
				return <SecondRoute />
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