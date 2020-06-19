import React, { Component } from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';
import _ from 'lodash';
import { connect } from 'react-redux';

import { infoPerfilUser } from '../Actions/AppActions';

function Informacoes({ item, navigation }) {
	const foto = item.foto;
	//'../imgs/foto_perfil.png'
	return (
		<View style={{  }}>
			<View style={{ flexDirection: 'column', alignItems: 'center' }}>
				
				<Image source={require('../imgs/foto_perfil.png')} style={{ marginTop: 15 }} />

				<TouchableOpacity 	onPress={() => false} style={{ justifyContent: 'center', }}>
					<Text 
						style={{fontWeight: 'bold', 
								textAlign: 'center', 
								fontSize: 15, 
								color: '#3598f1', 
								marginTop: 15,
					}}>
						Alterar foto do perfil
					</Text>
				</TouchableOpacity>

			</View>

			<View style={styles.linhas} />
			<View style={{ flexDirection: 'row' }}>
				<Text style={{ fontSize: 16, marginTop: 20, marginLeft: 17 }}>Nome</Text>
				<TextInput value='Nome' style={{ fontSize: 20, marginTop: 8, marginLeft: 45, borderBottomWidth: 1, width: 250, height: 50, borderColor: '#bfbfbf' }}/>
			</View>

			<View style={{ flexDirection: 'row', }}>
				<View>
					<Text style={{ fontSize: 16, marginTop: 20, marginLeft: 17, }}>Nome</Text>
					<Text style={{ fontSize: 16, marginLeft: 17, }}>de usuário</Text>
				</View>
				<View>
					<TextInput value='Nome' style={{ fontSize: 20, marginTop: 8, marginLeft: 14, borderBottomWidth: 1, width: 250, height: 50, borderColor: '#bfbfbf' }}/>
				</View>
			</View>

			<View style={{ flexDirection: 'row' }}>
				<Text style={{ fontSize: 16, marginTop: 20, marginLeft: 17 }}>Site</Text>
				<TextInput placeholder='Seu site' style={{ fontSize: 20, marginTop: 8, marginLeft: 61, borderBottomWidth: 1, width: 250, height: 50, borderColor: '#bfbfbf' }}/>
			</View>

			<View style={{ flexDirection: 'row' }}>
				<Text style={{ fontSize: 15, marginTop: 20, marginLeft: 17 }}>Bio</Text>
				<TextInput value={item.descricao} style={{ fontSize: 20, marginTop: 15, marginLeft: 66, }}/>
			</View>

			<View style={styles.linhas}/>

		</View>
	);
}

class EditarPerfil extends Component {

	UNSAFE_componentWillMount() {
		this.props.infoPerfilUser();
		this.criaFonteDeDados(this.props.info);
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		this.criaFonteDeDados(nextProps.info);
	}

	criaFonteDeDados(info) {
		this.dataSource = info;
	}

	render() {
		return (
			
			<View style={{ backgroundColor: '#fff', flex: 1 }}>

				<View style={{ height: 65, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderWidth: 1, borderColor: '#bfbfbf' }}>

					<TouchableOpacity onPress={() => this.props.navigation.navigate('Perfil')} style={{ marginLeft: 7, marginTop: 15 }}>
						<Text style={{ fontSize: 17, }}>Cancelar</Text>
					</TouchableOpacity>

					<TouchableOpacity onPress={() => false} style={{ marginTop: 15, }}>
						<Text style={{ fontWeight: 'bold', fontSize: 17 }}>Editar Perfil</Text>
					</TouchableOpacity>

					<TouchableOpacity onPress={() => false} style={{ marginRight: 7, marginTop: 15 }}>
						<Text style={{ fontSize: 17, color: '#3598f1', fontWeight: 'bold', }}>Concluir</Text>
					</TouchableOpacity>

				</View>

				<FlatList 
					data={this.dataSource}
					renderItem={ ({ item }) => <Informacoes item={item} navigation={this.props.navigation} /> }
					keyExtractor={item => item.email}
				/>

			</View>
		);
	}
}

const styles = StyleSheet.create({
	linhas: {
		borderTopWidth: 1, 
		width: 500, 
		alignSelf: 'center', 
		borderColor: '#bfbfbf',
		marginTop: 20,
	},

})

const mapStateToProps = state => {

	const info = _.map(state.InfoPerfilUser, (val, uid) => {
		return { ...val, uid };
	});
	
	return {
		info
	}

}

export default connect(mapStateToProps, { infoPerfilUser }) (EditarPerfil);
