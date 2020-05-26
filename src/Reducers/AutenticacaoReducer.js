import {
	MODIFICA_EMAIL,
	MODIFICA_SENHA,
	SUCESSO_CADASTRO,
	ERRO_CADASTRO,
	CARREGANDO_CADASTRO,
} from '../Actions/Types';

const INITIAL_STATE = {
	email: '',
	senha: '',
	loading_cadastro: false,
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

		default:
			return state;

	}

}
