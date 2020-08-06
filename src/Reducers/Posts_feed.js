import { POST_FEED } from '../Actions/Types';

const INITIAL_STATE = {}

export default (state = INITIAL_STATE, action) => {
	switch(action.type) {

		case POST_FEED:
			return action.payload;

		default:
			return state;
	}
}
