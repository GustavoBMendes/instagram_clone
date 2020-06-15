import {
	MODIFICA_EMAIL,
	MODIFICA_SENHA,
	SUCESSO_CADASTRO,
	ERRO_CADASTRO,
	CARREGANDO_CADASTRO,
	LOGIN_ERRO,
	LOGIN_SUCESSO,
	CARREGANDO_LOGIN,
} from '../Actions/Types';

const INITIAL_STATE = {
	email: '',
	senha: '',
	loading_cadastro: false,
	loading_login: false,
	msg_erro_login: '',
	msg_erro_cad: '',
}

export default ( state = INITIAL_STATE, action ) => {

	switch(action.type) {

		case MODIFICA_EMAIL:
			return { ...state, email: action.payload };

		case MODIFICA_SENHA:
			return { ...state, senha: action.payload };

		case SUCESSO_CADASTRO:
			return { ...state, email: '', senha: '', loading_cadastro: false }

		case ERRO_CADASTRO:
			return { ...state, cadastroErro: action.payload };

		case CARREGANDO_CADASTRO:
			return { ...state, loading_cadastro: true }

		case CARREGANDO_LOGIN:
			return { ...state, loading_login: true }

		case LOGIN_SUCESSO:
			return { ...state, loading_login: false, email: '', senha: '' }

		case LOGIN_ERRO:
			return { ...state, msg_erro_login: action.payload, loading_login: false }

		case ERRO_CADASTRO:
			return { ...state, msg_erro_cad: action.payload, loading_cadastro: false }

		default:
			return state;

	}

}
