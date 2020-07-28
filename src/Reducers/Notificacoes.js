import { NOTIFICACAO } from '../Actions/Types';

const INITIAL_STATE = {}

export default (state = INITIAL_STATE, action) => {
	switch(action.type) {

		case NOTIFICACAO:
			return action.payload;

		default:
			return state;
	}
}
