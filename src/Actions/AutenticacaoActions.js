import {
	MODIFICA_EMAIL,
	MODIFICA_SENHA,
	SUCESSO_CADASTRO,
	ERRO_CADASTRO,
	CARREGANDO_CADASTRO,
} from './Types';

import firebase from 'firebase';
import b64 from 'base-64';

export const modificaEmail = (texto) => {
	return {
		type: MODIFICA_EMAIL,
		payload: texto
	}
}

export const modificaSenha = (texto) => {
	return {
		type: MODIFICA_SENHA,
		payload: texto
	}
}

export const cadastraUsuario = ({ email, senha, navigation }) => {
	
	return dispatch => {
	
		dispatch({ type: CARREGANDO_CADASTRO })

		firebase.auth().createUserWithEmailAndPassword(email, senha)
			.then(user => {
				let emailb64 = b64.encode(email);
				firebase.database().ref('/contatos/'+emailb64)
					.push({email})
					.then( value => cadastroSucesso(dispatch, navigation) )
			})
			.catch(erro => cadastroErro(erro, dispatch));

	}

}

const cadastroSucesso = ( dispatch, navigation ) => {
	dispatch ({	type: SUCESSO_CADASTRO, payload: 'Sucesso' });

	navigation.navigate('Login');
}

const cadastroErro = (erro, dispatch) => {
	dispatch ({ type: ERRO_CADASTRO, payload: erro.message });
}
