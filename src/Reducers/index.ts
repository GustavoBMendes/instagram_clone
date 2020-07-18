import { combineReducers, createStore, applyMiddleware } from 'redux';
import AutenticacaoReducer from './AutenticacaoReducer';
import InfoPerfilUser from './InfoPerfilUser';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { AppActionTypes } from '../Actions/actionsTypes';

export const rootReducer = combineReducers ({
	AutenticacaoReducer,
	info: InfoPerfilUser,
});

export type AppState = ReturnType<typeof rootReducer>;

export const store = createStore(
	rootReducer,
	applyMiddleware(thunk as ThunkMiddleware<AppState, AppActionTypes>)
);
