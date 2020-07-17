import { combineReducers } from 'redux';
import AutenticacaoReducer from './AutenticacaoReducer';
import InfoPerfilUser from './InfoPerfilUser';

export const rootReducer = combineReducers ({
	AutenticacaoReducer,
	info: InfoPerfilUser,
});

export type AppState = ReturnType<typeof rootReducer>;
