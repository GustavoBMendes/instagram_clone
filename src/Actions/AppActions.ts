import firebase from 'firebase';
import b64 from 'base-64';
import _ from 'lodash';
import { Dispatch } from 'redux';
import { AppActionTypes } from './actionsTypes';

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



export const infoPerfilUser = (emailUserB64: string) => {

	return (dispatch: Dispatch<AppActionTypes>) => {

		firebase.database().ref('/contatos/'+emailUserB64)
			.once('value', snapshot => {
				return dispatch({ type: INFO_PERFIL_USER, info: snapshot.val() })
			}).then(function(snapshot) {
				var email = (snapshot.val());
				console.log('email', email);
			})

	}

}



export const updateNome = (nome: string) => {

	return (dispatch: Dispatch<AppActionTypes>) => {
		dispatch({type:MODIFICA_NOME, nome});
	}

}

export const updateNomeUsr = (nomeUsr: string) => {

	return (dispatch: Dispatch<AppActionTypes>) => {
		dispatch({ type: MODIFICA_NOMEUSR, nomeUsr });
	}

}

export const updateSite = (site: any) => {

	return (dispatch: Dispatch<AppActionTypes>) => {
		dispatch({ type: MODIFICA_SITE, site });
	}

}

export const updateBio = (bio: any) => {

	return (dispatch: Dispatch<AppActionTypes>) => {
		dispatch({ type: MODIFICA_BIO, bio });
	}

}

export const updatePerfil = (photo: any, navigation: any, nome: any, nomeUsr: string, site: any, bio: any, emailUserB64: string) => {

	console.log('email ', emailUserB64);

	return (dispatch: (arg0: { type: string; }) => void) => {
		console.log('foi ', photo);
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

const uploadSucesso = (dispatch: any, navigation: { navigate: (arg0: string) => void; }) => {

	navigation.navigate('Perfil');

}

export const searchUser = (nome: string) => {

	const msg = 'Usuário não encontrado';

	return (dispatch: Dispatch<AppActionTypes>) => {

		firebase.database().ref('/identificacao/'+nome)
			.once('value')
			.then(snapshot => {
				
				if(snapshot.val()) {
					
					const dadosUsuario = _.first(_.values(snapshot.val()));
					buscaSucesso(dispatch, dadosUsuario.nomeUsr);
				}

				else {
					dispatch({
						type: ERRO_BUSCA,
						msg
					})
				}

			})
			//.catch(erro => erroSearch(erro.message, dispatch))

	}

}

const buscaSucesso = (dispatch: Dispatch<AppActionTypes>, nomeUsr: any) => {

	dispatch ({	type: SUCESSO_BUSCA, nomeUsr });

}

const erroSearch = (dispatch: (arg0: { type: string; payload: string; }) => void) => {

	dispatch ({ type: ERRO_BUSCA, payload: 'Usuário não encontrado' });

}
