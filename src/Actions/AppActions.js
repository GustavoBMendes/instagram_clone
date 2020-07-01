import firebase from 'firebase';
import b64 from 'base-64';
import _ from 'lodash';

import {
	INFO_PERFIL_USER,
	UPDATE_FOTO,
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

export const updatePhoto = (photo, navigation) => {
/*
	const { currentUser } = firebase.auth();
	return dispatch => {

		const emailUserB64 = b64.encode( currentUser.email );

		firebase.database().ref('/contatos/'+emailUserB64)
			.set({
				foto: photo,
			}).then(dispatch({ type: UPDATE_FOTO, payload: photo }))

	}
	*/
	//console.log('foi ', photo);

	const { currentUser } = firebase.auth();
	const emailUserB64 = b64.encode( currentUser.email );
	console.log('email ', emailUserB64);

	return dispatch => {
		console.log('foi ', photo);
		dispatch({ type: UPDATE_FOTO })
		let userRef = firebase.database().ref('/contatos/'+emailUserB64);
		console.log('user ref', userRef);
			userRef.child(emailUserB64)
			.update({ foto: photo })
			.then( value => uploadSucesso(dispatch, navigation) )
	}

}

const uploadSucesso = (dispatch, navigation) => {

	navigation.navigate('Perfil');

}
