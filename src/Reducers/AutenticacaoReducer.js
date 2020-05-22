import {
	MODIFICA_EMAIL,
	MODIFICA_SENHA
} from '../Actions/Types';

const INITIAL_STATE = {
	email: '',
	senha: '',
}

export default ( state = INITIAL_STATE, action ) => {

	switch(action.type) {

		case MODIFICA_EMAIL:
			return { ...state, email: action.payload };

		case MODIFICA_SENHA:
			return { ...state, senha: action.payload };

		default:
			return state;

	}

}
