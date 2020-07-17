import {
	INFO_PERFIL_USER,
	UPDATE_FOTO,
	MODIFICA_NOME,
	MODIFICA_NOMEUSR,
	MODIFICA_SITE,
	MODIFICA_BIO,
	SUCESSO_BUSCA,
	ERRO_BUSCA,
} from '../Actions/Types';

import { ActionTypes, perfilInfo } from '../Actions/actionsTypes';

const INITIAL_STATE: perfilInfo[] = [];

export default ( state = INITIAL_STATE, action: ActionTypes ) => {
	
	switch(action.type) {

		case INFO_PERFIL_USER:
			return action.info;

		case MODIFICA_NOME:
			return { ...state, nome: action.nome };

		case MODIFICA_NOMEUSR:
			return { ...state, nome_usr: action.nomeUsr };

		case MODIFICA_SITE:
			return { ...state, site: action.site };

		case MODIFICA_BIO:
			return { ...state, bio: action.bio };

		case SUCESSO_BUSCA:
			return { ...state, nome_usr: action.nomeUsr, search_erro: '', }

		case ERRO_BUSCA:
			return { ...state, search_erro: action.msg }

		default:
			return state;

	}

}
