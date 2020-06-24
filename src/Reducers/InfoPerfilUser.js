import {
	INFO_PERFIL_USER,
	UPDATE_FOTO,
} from '../Actions/Types';

const INITIAL_STATE = {
	update_photo: '',
}

export default ( state = INITIAL_STATE, action ) => {

	switch(action.type) {

		case INFO_PERFIL_USER:
			return action.payload;

		case UPDATE_FOTO:
			return { ...state, update_photo: action.payload };

		default:
			return state;

	}

}
