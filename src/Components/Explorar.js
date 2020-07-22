import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, } from 'react-native';
import { TextInput, TouchableOpacity, } from 'react-native-gesture-handler';
import { connect } from 'react-redux';

import { searchUser, updateNomeUsr, } from '../Actions/AppActions';
import Images from '../imgs/index';

class Explorar extends Component {

	renderUsr() {

		if((this.props.update_photo && this.props.usuario_busca && this.props.nome) !== '') {
			
			return(
				<TouchableOpacity onPress={ () => this.props.navigation.navigate('Perfil Visitante', { nomeUsuario: this.props.nome_usr, email: this.props.email, nome: this.props.nome }) }>
					<View>
						<Text>{this.props.msg_erro}</Text>
						<View style={{ flexDirection: 'row' }}>
							<Image source={{ uri: this.props.update_photo }} style={{ width: 44, height: 44, borderRadius: 100, marginLeft: 15 }}/>
							<View style={{ alignSelf: 'center', marginLeft: 10 }}>
								<Text style={{ fontWeight: 'bold' }}>{this.props.usuario_busca}</Text>
								<Text style={{ color: '#bfbfbf' }}>{this.props.nome}</Text>
							</View>
						</View>
					</View>
				</TouchableOpacity>
			);

		}

		else {
			return(
				<View />
			);
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
							onChangeText={texto => this.props.updateNomeUsr(texto)}
							placeholder='Pesquisar' 
							placeholderTextColor='#bfbfbf' 
							style={styles.input} 
						/>
						
					</View>

					<TouchableOpacity onPress={ () => this.props.searchUser(this.props.nome_usr) } style={{ marginTop: 20, marginRight: 15, }}>
						<Text style={{ fontSize: 18 }}>Buscar</Text>
					</TouchableOpacity>

				</View>

				{this.renderUsr()}

			</View>
		)

	}

}

const mapStateToProps = state => {

	return {
		
		update_photo: state.InfoPerfilUser.update_photo,
		nome: state.InfoPerfilUser.nome,
		nome_usr: state.InfoPerfilUser.nome_usr,
		msg_erro: state.InfoPerfilUser.search_erro,
		usuario_busca: state.InfoPerfilUser.usuario_busca,
		email: state.InfoPerfilUser.email,

	}

}

export default connect(mapStateToProps, 
	{ 
		searchUser,
		updateNomeUsr,
	}) (Explorar);

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
		marginTop: 15, 
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
		width: 240,
	}

})
