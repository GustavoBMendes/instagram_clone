import {
	INFO_PERFIL_VISITANTE,
	SEGUINDO,
} from '../Actions/Types';

const INITIAL_STATE = {
	seguindo: false,
}

export default ( state = INITIAL_STATE, action ) => {
	
	switch(action.type) {

		case INFO_PERFIL_VISITANTE:
			return action.payload;

		case SEGUINDO:
			return { ...state, seguindo: true }

		default:
			return state;
	}

}
