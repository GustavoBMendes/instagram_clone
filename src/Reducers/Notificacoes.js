import { NOTIFICACAO } from '../Actions/Types';

const INITIAL_STATE = {}

export default (state = INITIAL_STATE, action) => {
	switch(action.type) {

		case NOTIFICACAO:
			console.log('snap2', action.payload);
			return action.payload;

		default:
			return state;
	}
}
