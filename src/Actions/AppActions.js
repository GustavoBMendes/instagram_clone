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
	INFO_PERFIL_VISITANTE,
} from './Types';

export const infoPerfilUser = () => {

	const { currentUser } = firebase.auth();
	return dispatch => {

		const emailUserB64 = b64.encode( currentUser.email );

		firebase.database().ref('/contatos/'+emailUserB64)
			.once('value', snapshot => {
				dispatch({ type: INFO_PERFIL_USER, payload: snapshot.val() })
			}).then(function(snapshot) {
				//teste
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

export const updatePerfil = (photo, navigation, nome, nomeUsr, site, bio, nomeUsrAnterior) => {

	const { currentUser } = firebase.auth();
	const emailUserB64 = b64.encode( currentUser.email );
	console.log('email ', emailUserB64);
	console.log('anterior', nomeUsrAnterior);
	return dispatch => {
		console.log('foi ', photo);
		dispatch({ type: UPDATE_FOTO })
		let userRef = firebase.database().ref('/contatos/'+emailUserB64);
		console.log('user ref', userRef);
			userRef.child(emailUserB64)
			.update({ foto: photo, nome: nome, nomeUsr: nomeUsr, site: site, descricao: bio })
			.then( () => {
				firebase.database().ref('/identificacao/').child(nomeUsr).child('info').set({ 'nome': nome, 'nomeUsr': nomeUsr, 'foto': photo, 'email': emailUserB64 })
				.then(value => uploadSucesso(dispatch, navigation, nomeUsrAnterior))
			})
			
	}

}

const uploadSucesso = (dispatch, navigation, nomeUsrAnterior) => {
	console.log('excluindo no firebase', nomeUsrAnterior);
	if(nomeUsrAnterior !== '') {
		firebase.database().ref('identificacao').child(nomeUsrAnterior).remove();
	}

	navigation.goBack();

}

export const searchUser = (nomeUsr) => {

	return dispatch => {

		firebase.database().ref('/identificacao/'+nomeUsr)
			.once('value')
			.then(snapshot => {
				
				if(snapshot.val()) {
					
					const dadosUsuario = _.first(_.values(snapshot.val()));
					buscaSucesso(dispatch, dadosUsuario.nomeUsr, dadosUsuario.nome, dadosUsuario.foto, dadosUsuario.email);

				}

				else {
					dispatch({
						type: ERRO_BUSCA,
						payload: 'Usuário não encontrado',
					})
				}

			})
			//.catch(erro => erroSearch(erro.message, dispatch))

	}

}

const buscaSucesso = (dispatch, nomeUsr, nome, foto, email) => {

	dispatch ({	type: SUCESSO_BUSCA, payload: { nomeUsr, nome, foto, email } });

}

const erroSearch = (dispatch) => {

	dispatch ({ type: ERRO_BUSCA, payload: 'Usuário não encontrado' });

}

export const infoPerfilVisitante = (nomeUsr) => {

	return dispatch => {
		firebase.database().ref('/identificacao/'+nomeUsr)
				.once('value')
				.then(snapshot => {
					
					if(snapshot.val()) {
						const dadosUsuario = _.first(_.values(snapshot.val()));
						firebase.database().ref('/contatos/'+dadosUsuario.email)
							.once('value', snapshot => {
								console.log('teste', snapshot.val());
								dispatch({ type: INFO_PERFIL_VISITANTE, payload: snapshot.val() })
							})
					}
				})
	}
}

export const seguirPerfil = (emailPerfil, nomeUsrPerfil, nome) => {

	const { currentUser } = firebase.auth();
	const emailUser = b64.encode( currentUser.email );

	return dispatch => {

		firebase.database().ref('/contatos/'+emailUser).child('seguindo').child(nomeUsrPerfil)
			.set({ 'nome': nome })
			.then( () => {
				firebase.database().ref('/contatos/'+emailPerfil).child('seguidores').child(emailUser)
				.set({ 'nome': nomeUser })
				.then(value => sucessoSeguir(dispatch))
			})


	}

}

const sucessoSeguir = (dispatch) => {

	dispatch({ type: 'sucesso_seguir', payload: 'sucesso' })

}
