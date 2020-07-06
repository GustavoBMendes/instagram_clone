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
			.then( value => uploadSucesso(dispatch, navigation) )
	}

}

const uploadSucesso = (dispatch, navigation) => {

	navigation.navigate('Perfil');

}
