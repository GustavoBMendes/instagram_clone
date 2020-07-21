import {
	INFO_PERFIL_VISITANTE,
} from '../Actions/Types';

const INITIAL_STATE = {
	
}

export default ( state = INITIAL_STATE, action ) => {
	
	switch(action.type) {

		case INFO_PERFIL_VISITANTE:
			return action.payload;

		default:
			return state;
	}

}
