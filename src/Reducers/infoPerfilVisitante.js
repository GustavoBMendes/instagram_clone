import {
	INFO_PERFIL_VISITANTE,
	SUCESSO_SEGUIR,
	SEGUINDO,
	UNFOLLOW,
} from '../Actions/Types';

const INITIAL_STATE = {
	seguindo: false,
}

export default ( state = INITIAL_STATE, action ) => {
	
	switch(action.type) {

		case INFO_PERFIL_VISITANTE:
			return action.payload;

		case SUCESSO_SEGUIR:
			return { ...state, seguindo: true }

		case SEGUINDO:
			return { ...state, seguindo: true }

		case UNFOLLOW: 
			return { ...state, seguindo: false }

		default:
			return state;
	}

}
