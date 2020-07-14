import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, } from 'react-native';
import { TextInput, TouchableOpacity, } from 'react-native-gesture-handler';
import { connect } from 'react-redux';

import { searchUser, updateNomeUsr, } from '../Actions/AppActions';
import Images from '../imgs/index';

class Explorar extends Component {

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

					<TouchableOpacity onPress={ () => this.props.searchUser('Moacir', this.props.nome_usr) } style={{ marginTop: 20, marginRight: 10, }}>
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

const mapStateToProps = state => {

	return {
		
		nome_usr: state.InfoPerfilUser.nome_usr,
		msg_erro: state.InfoPerfilUser.search_erro,
		usuario_busca: state.InfoPerfilUser.usuario_busca,

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
