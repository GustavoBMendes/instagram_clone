import { POSTAGEM } from '../Actions/Types';

const INITIAL_STATE = {}

export default ( state = INITIAL_STATE, action ) => {
	
	switch(action.type) {

		case POSTAGEM:
			return action.payload;

		default:
			return state;

	}

}
