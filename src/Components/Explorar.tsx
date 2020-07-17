import React from 'react';
import { View, StyleSheet, Image, Text, } from 'react-native';
import { TextInput, TouchableOpacity, } from 'react-native-gesture-handler';
import * as Redux from 'redux';
import { connect, MapStateToProps, MapDispatchToProps, } from 'react-redux';
import { AppState } from '../Reducers/index';

import { searchUser, updateNomeUsr, } from '../Actions/AppActions';
import Images from '../imgs/index';
import { ThunkDispatch } from 'redux-thunk';
import { AppActionTypes, perfilInfo } from '../Actions/actionsTypes';

interface StateProps {
	nome_usr?: string; 
	msg_erro?: string;
	usuario_busca?: string;
	
}

interface DispatchProps {
	searchUser?: (nome: string) => void;
	updateNomeUsr?: (nome: string) => void;
}

export interface OwnProps {

}

type Props = StateProps & DispatchProps & OwnProps;

interface State {

}

class Explorar extends React.Component<Props, State> {

	onChange = (nome_usr: string) => {
		if(this.props.updateNomeUsr !== undefined) {
			this.props.updateNomeUsr(nome_usr)
		}
			
	}

	onUpdate = () => {
		if(this.props.searchUser !== undefined && this.props.nome_usr !== undefined) {
			this.props.searchUser(this.props.nome_usr)
		}
	}

	render() {

		return (
			<View style={{ flex: 1, backgroundColor: '#fff', }}>
				<View style={styles.cabecalho}>

					<View style={styles.campoPesquisa}>
						<Image source={Images.search} style={{ height: 18, width: 18, marginTop: 10, marginLeft: 5, }}/>
						<TextInput 
							value={this.props.nome_usr}
							onChangeText={ texto => this.onChange(texto)}
							placeholder='Pesquisar' 
							placeholderTextColor='#bfbfbf' 
							style={styles.input} 
						/>
						
					</View>

					<TouchableOpacity onPress={ () => this.onUpdate() } style={{ marginTop: 20, marginRight: 10, }}>
						<Text>Buscar</Text>
					</TouchableOpacity>

				</View>

				<View>
					<Text>{this.props.msg_erro}</Text>
					<Text>{this.props.usuario_busca}</Text>
				</View>

			</View>
		)

	}

}


const mapStateToProps = (state: any): StateProps =>  ({
		nome_usr: state.InfoPerfilUser.nomeUsr,
		msg_erro: state.InfoPerfilUser.search_erro,
		usuario_busca: state.InfoPerfilUser.nomeUsr,
})

const mapDispatchToProps = (
	dispatch: ThunkDispatch<any, any, AppActionTypes>,
	ownProps: StateProps
): DispatchProps => ({
	searchUser: Redux.bindActionCreators(searchUser, dispatch),
	updateNomeUsr: (nome: string) => dispatch(updateNomeUsr(nome))
})

export default connect<StateProps, OwnProps>(mapStateToProps, mapDispatchToProps) (Explorar);

const styles = StyleSheet.create({

	cabecalho: {
		height: 65, 
		backgroundColor: '#fff', 
		alignItems: 'center', 
		justifyContent: 'space-between', 
		borderWidth: 0.5, 
		borderColor: '#bfbfbf',
		flexDirection: 'row',
	},

	campoPesquisa: {
		height: 35, 
		backgroundColor: '#fafafa', 
		marginLeft: 15,
		marginRight: 15, 
		marginTop: 20, 
		borderColor: '#f5f5f5', 
		borderWidth: 1, 
		borderRadius: 10, 
		flexDirection: 'row',
	},

	input: {
		alignItems: 'center', 
		justifyContent: 'center',
		backgroundColor: '#fafafa', 
		marginTop: 5,
		marginLeft: 10,
		height: 30,
		width: 250,
	}

})
