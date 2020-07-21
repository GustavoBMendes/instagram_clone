import { combineReducers } from 'redux';
import AutenticacaoReducer from './AutenticacaoReducer';
import InfoPerfilUser from './InfoPerfilUser';
import InfoPerfilVisitante from './infoPerfilVisitante';

export default combineReducers ({
	AutenticacaoReducer,
	InfoPerfilUser,
	InfoPerfilVisitante,
});
