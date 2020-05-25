import React, { Component } from "react";
import { View, StatusBar, Text, StyleSheet } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { modificaSenha, cadastraUsuario, } from '../Actions/AutenticacaoActions';

/*
function Finalizar({props}) {
	const navigation = useNavigation();
	return(
		<View style={{ flex: 1, backgroundColor: '#fff' }} >
				<StatusBar backgroundColor='#fff' barStyle='dark-content'/>
				<TextInput 
					value = {this.props.senha}
					placeholder='Insira uma senha' 
					placeholderTextColor='#bfbfbf' 
					style={styles.textinput}	
					onChangeText={ texto => props.modificaSenha(texto) }
				/>
				<TouchableOpacity 
					style={styles.butao}
					onPress={() => _cadastraUsuario(navigation)}
				>
					<Text style={{ textAlign: 'center', color: '#fff' }}>FINALIZAR CADASTRO</Text>
				</TouchableOpacity>
				<Text style={styles.texto} >Dica: Crie uma senha de no mínimo 7 caracteres, contendo letras e números.</Text>
		</View>
	);
}
*/
class SenhaCad extends Component {
	
	_cadastraUsuario() {
		const { email, senha } = this.props;
		console.log(email);
		console.log(senha);
		//this.props.cadastraUsuario(email,senha,navigation);
	}

	render() {
		return (
			<View style={{ flex: 1, backgroundColor: '#fff' }} >
				<StatusBar backgroundColor='#fff' barStyle='dark-content'/>
				<TextInput 
					value = {this.props.senha}
					placeholder='Insira uma senha' 
					placeholderTextColor='#bfbfbf' 
					style={styles.textinput}	
					onChangeText={ texto => this.props.modificaSenha(texto) }
				/>
				<TouchableOpacity 
					style={styles.butao}
					onPress={() => this._cadastraUsuario()}
				>
					<Text style={{ textAlign: 'center', color: '#fff' }}>FINALIZAR CADASTRO</Text>
				</TouchableOpacity>
				<Text style={styles.texto} >Dica: Crie uma senha de no mínimo 7 caracteres, contendo letras e números.</Text>
			</View>
		);
	}

}

const styles = StyleSheet.create({
	
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

const mapStateToProps = state => ({
	email: state.AutenticacaoReducer.email,
	senha: state.AutenticacaoReducer.senha,
});

export default connect(mapStateToProps, { modificaSenha, cadastraUsuario })(SenhaCad);
