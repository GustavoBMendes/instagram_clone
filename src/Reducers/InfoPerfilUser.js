import {
	INFO_PERFIL_USER,
	UPDATE_FOTO,
	MODIFICA_NOME,
	MODIFICA_NOMEUSR,
	MODIFICA_SITE,
	MODIFICA_BIO,
} from '../Actions/Types';

const INITIAL_STATE = {
	update_photo: '',
	nome: 'Seu Nome',
	nome_usr: 'Nome de usuário',
	site: '',
	bio: '',
}

export default ( state = INITIAL_STATE, action ) => {

	switch(action.type) {

		case INFO_PERFIL_USER:
			return action.payload;

		case UPDATE_FOTO:
			return { ...state, update_photo: action.payload };

		case MODIFICA_NOME:
			return { ...state, nome: action.payload };

		default:
			return state;

	}

}
