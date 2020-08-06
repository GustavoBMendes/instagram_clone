import { combineReducers } from 'redux';
import AutenticacaoReducer from './AutenticacaoReducer';
import InfoPerfilUser from './InfoPerfilUser';
import InfoPerfilVisitante from './infoPerfilVisitante';
import Notificacoes from './Notificacoes';
import Posts_perfil from './Posts_perfil';
import Posts_feed from './Posts_feed';

export default combineReducers ({
	AutenticacaoReducer,
	InfoPerfilUser,
	InfoPerfilVisitante,
	Notificacoes,
	Posts_perfil,
	Posts_feed,
});
