import firebase from 'firebase';
import b64 from 'base-64';
import _ from 'lodash';

import {
	INFO_PERFIL_USER,
	UPDATE_FOTO,
	MODIFICA_NOME,
	MODIFICA_NOMEUSR,
	MODIFICA_SITE,
	MODIFICA_BIO,
	SUCESSO_BUSCA,
	ERRO_BUSCA,
} from './Types';

export const infoPerfilUser = () => {

	const { currentUser } = firebase.auth();
	return dispatch => {

		const emailUserB64 = b64.encode( currentUser.email );

		firebase.database().ref('/contatos/'+emailUserB64)
			.once('value', snapshot => {
				dispatch({ type: INFO_PERFIL_USER, payload: snapshot.val() })
			}).then(function(snapshot) {
				var email = (snapshot.val());
				console.log('email', email);
			})

	}

}

export const updateNome = (nome) => {

	return dispatch => {
		dispatch({ type: MODIFICA_NOME, payload: nome });
	}

}

export const updateNomeUsr = (nomeUsr) => {

	return dispatch => {
		dispatch({ type: MODIFICA_NOMEUSR, payload: nomeUsr });
	}

}

export const updateSite = (site) => {

	return dispatch => {
		dispatch({ type: MODIFICA_SITE, payload: site });
	}

}

export const updateBio = (bio) => {

	return dispatch => {
		dispatch({ type: MODIFICA_BIO, payload: bio });
	}

}

export const updatePerfil = (photo, navigation, nome, nomeUsr, site, bio) => {

	const { currentUser } = firebase.auth();
	const emailUserB64 = b64.encode( currentUser.email );
	console.log('email ', emailUserB64);

	return dispatch => {
		console.log('foi ', photo);
		dispatch({ type: UPDATE_FOTO })
		let userRef = firebase.database().ref('/contatos/'+emailUserB64);
		console.log('user ref', userRef);
			userRef.child(emailUserB64)
			.update({ foto: photo, nome: nome, nomeUsr: nomeUsr, site: site, descricao: bio })
			.then( () => {
				let ref = firebase.database().ref('/identificacao/').child(nomeUsr).set({ 'nome': nome, 'nomeUsr': nomeUsr })
				.then(value => uploadSucesso(dispatch, navigation))
			})
	}

}

const uploadSucesso = (dispatch, navigation) => {

	navigation.navigate('Perfil');

}

export const searchUser = (nome, nomeUsr) => {

	return dispatch => {

		firebase.database().ref('/identificacao/'+nome)
			.child(nomeUsr)
			.once('value')
			.then(snapshot => {
				
				if(snapshot.val()) {
					buscaSucesso(dispatch);
				}

				else {
					dispatch({
						type: ERRO_BUSCA,
						payload: 'Usuário não encontrado',
					})
				}

			})
			//.catch(erro => erroSearch(erro.message, dispatch))


		/*

		let emailB64 = b64.encode(email);

		firebase.database().ref('/identificacao/'+nome)
			.once('value')
			.then(snapshot => {
				if(snapshot.val()) {

					const dadosUsuario = _.first(_.values(snapshot.val()));

					const { currentUser } = firebase.auth();
					let emailUsuarioB64 = b64.encode(currentUser.email);

					firebase.database().ref('/contatos/'+emailUsuarioB64).child(emailUsuarioB64)
						.push({ email, nome: dadosUsuario.nome })
						.then(() => adicionaContatoSucesso(dispatch))
						.catch(erro => adicionaContatoErro(erro.message, dispatch))

				}
				else{
					dispatch({ 
						type: ADICIONA_CONTATO_ERRO, 
						payload: 'E-mail informado não corresponde a um usuário cadastrado.' 
					})
				}
			})
		*/
	}

}

const buscaSucesso = (dispatch) => {

	dispatch ({	type: SUCESSO_BUSCA, payload: 'Sucesso' });

}

const erroSearch = (dispatch) => {

	dispatch ({ type: ERRO_BUSCA, payload: 'Usuário não encontrado' });

}
