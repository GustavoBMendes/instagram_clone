import { combineReducers } from 'redux';
import AutenticacaoReducer from './AutenticacaoReducer';
import InfoPerfilUser from './InfoPerfilUser';
import InfoPerfilVisitante from './infoPerfilVisitante';
import Notificacoes from './Notificacoes';

export default combineReducers ({
	AutenticacaoReducer,
	InfoPerfilUser,
	InfoPerfilVisitante,
	Notificacoes,
});
