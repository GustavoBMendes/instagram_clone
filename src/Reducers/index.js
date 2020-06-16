import { combineReducers } from 'redux';
import AutenticacaoReducer from './AutenticacaoReducer';
import InfoPerfilUser from './InfoPerfilUser';

export default combineReducers ({
	AutenticacaoReducer,
	InfoPerfilUser,
});
