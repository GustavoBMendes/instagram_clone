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

		default:
			return state;

	}

}
