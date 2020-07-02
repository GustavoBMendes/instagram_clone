import {
	MODIFICA_EMAIL,
	MODIFICA_SENHA,
	SUCESSO_CADASTRO,
	ERRO_CADASTRO,
	CARREGANDO_CADASTRO,
	LOGIN_ERRO,
	LOGIN_SUCESSO,
	CARREGANDO_LOGIN,
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

export const cadastraUsuario = ({ email, senha }, navigation) => {
	
	return dispatch => {
	
		dispatch({ type: CARREGANDO_CADASTRO })
		console.log(email);
		
		firebase.auth().createUserWithEmailAndPassword(email, senha)
			.then(user => {
				let emailb64 = b64.encode(email);
				console.log(emailb64);
				var ref = firebase.database().ref('/contatos/'+emailb64);

				var usersRef = ref.child(emailb64);
					usersRef.set({'email': email, 'posts': 0, 'seguidores': 0, 'seguindo': 0, 'descricao': "", 'foto': '../imgs/foto_perfil.svg' })
					.then( value => cadastroSucesso(dispatch, navigation) )
			})
			.catch(erro => cadastroErro(erro, dispatch));

	}

}

const cadastroSucesso = ( dispatch, navigation ) => {
	dispatch ({	type: SUCESSO_CADASTRO, payload: 'Sucesso' });

	navigation.navigate('Editar Perfil');
}

const cadastroErro = (erro, dispatch) => {
	dispatch ({ type: ERRO_CADASTRO, payload: erro.message });
}

export const autenticarUser = ({ email, senha, navigation }) => {
	
	return dispatch => {

		dispatch({ type: CARREGANDO_LOGIN })
		firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
		.then( () => {
		firebase.auth().signInWithEmailAndPassword(email, senha)
			.then(value => loginSucesso(dispatch, navigation))
			.catch(erro => loginErro(erro, dispatch));
		});

		console.log('current user 2', firebase.auth().currentUser);
	}

}

const loginSucesso = (dispatch, navigation) => {

	dispatch ({
		type: LOGIN_SUCESSO
	})

	navigation.navigate('Feed');

}

const loginErro = (erro, dispatch) => {

	dispatch ({
		type: LOGIN_ERRO,
		payload: erro.message
	})

}
