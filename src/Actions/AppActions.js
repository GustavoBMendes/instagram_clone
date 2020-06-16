import firebase from 'firebase';
import b64 from 'base-64';
import _ from 'lodash';

import {
	INFO_PERFIL_USER,
} from './Types';

export const infoPerfilUser = () => {

	const { currentUser } = firebase.auth();
	return dispatch => {

		const emailUserB64 = b64.encode( currentUser.email );

		firebase.database().ref('/contatos/'+emailUserB64)
			.on('value', snapshot => {
				dispatch({ type: INFO_PERFIL_USER, payload: snapshot.val() })
			})

	}

}
