import React, { Component } from "react";
import { View, StatusBar, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { modificaSenha, cadastraUsuario, } from '../Actions/AutenticacaoActions';

class SenhaCad extends Component {
	
	_cadastraUsuario() {
		const { email, senha } = this.props;
		console.log(email);
		console.log(senha);
		this.props.cadastraUsuario({ email, senha }, this.props.navigation);
	}

	renderButton() {

		if(this.props.loading_cadastro) {

			return(
				<ActivityIndicator size='large' />
			);

		}

		else {
			return(
				<TouchableOpacity 
					style={styles.butao}
					onPress={() => this._cadastraUsuario()}
				>
					<Text style={{ textAlign: 'center', color: '#fff' }}>FINALIZAR CADASTRO</Text>
				</TouchableOpacity>
			);
		}
		
	}

	render() {
		return (
			<View style={{ flex: 1, backgroundColor: '#fff' }} >
				<StatusBar backgroundColor='#fff' barStyle='dark-content'/>
				<TextInput 
					secureTextEntry={true} 
					value = {this.props.senha}
					placeholder='Insira uma senha' 
					placeholderTextColor='#bfbfbf' 
					style={styles.textinput}	
					onChangeText={ texto => this.props.modificaSenha(texto) }
				/>
				<Text style={{ color: 'red' }}>{this.props.msg_erro_cad}</Text>
				{this.renderButton()}
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
	loading_cadastro: state.AutenticacaoReducer.loading_cadastro,
	msg_erro_cad: state.AutenticacaoReducer.msg_erro_cad,
});

export default connect(mapStateToProps, { modificaSenha, cadastraUsuario })(SenhaCad);
