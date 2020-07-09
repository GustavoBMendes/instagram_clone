import {
	INFO_PERFIL_USER,
	UPDATE_FOTO,
	MODIFICA_NOME,
	MODIFICA_NOMEUSR,
	MODIFICA_SITE,
	MODIFICA_BIO,
	SUCESSO_BUSCA,
} from '../Actions/Types';

const INITIAL_STATE = {
	update_photo: '',
	nome: 'Seu Nome',
	nome_usr: 'Nome de usuário',
	site: '',
	bio: '',
	usuario_busca: '',
}

export default ( state = INITIAL_STATE, action ) => {
	console.log('action ', action.payload);
	switch(action.type) {

		case INFO_PERFIL_USER:
			return action.payload;

		case UPDATE_FOTO:
			return { ...state, update_photo: action.payload };

		case MODIFICA_NOME:
			return { ...state, nome: action.payload };

		case MODIFICA_NOMEUSR:
			return { ...state, nome_usr: action.payload };

		case MODIFICA_SITE:
			return { ...state, site: action.payload };

		case MODIFICA_BIO:
			return { ...state, bio: action.payload };

		case SUCESSO_BUSCA:
			return { ...state, usuario_busca: action.payload }

		default:
			return state;

	}

}
