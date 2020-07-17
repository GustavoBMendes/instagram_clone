import {
	MODIFICA_NOME,
	MODIFICA_NOMEUSR,
	MODIFICA_SITE,
	MODIFICA_BIO,
	INFO_PERFIL_USER,
	SUCESSO_BUSCA,
	ERRO_BUSCA,
} from './Types';

export interface perfilInfo {
	nome: string;
	nomeUsr: string;
	site: string;
	bio: string;
	email: string;
	seguidores: number;
	seguindo: number;
	posts: number;
	search_erro: string;
}

export interface infoPerfilUserAction {
	type: typeof INFO_PERFIL_USER;
	info: perfilInfo;
}

export interface updateNomeAction {
	type: typeof MODIFICA_NOME;
	nome: string;
}

export interface updateNomeUsrAction {
	type: typeof MODIFICA_NOMEUSR;
	nomeUsr: string;
}

export interface updateSiteAction {
	type: typeof MODIFICA_SITE;
	site: string;
}

export interface updateBioAction {
	type: typeof MODIFICA_BIO;
	bio: string;
}

export interface sucessoBuscaAction {
	type: typeof SUCESSO_BUSCA;
	nomeUsr: string;
}

export interface erroBuscaAction {
	type: typeof ERRO_BUSCA;
	msg: string;
}

export type ActionTypes = 
	| updateNomeAction
	| updateNomeUsrAction
	| updateSiteAction
	| updateBioAction
	| infoPerfilUserAction
	| sucessoBuscaAction
	| erroBuscaAction;

export type AppActionTypes = ActionTypes;
