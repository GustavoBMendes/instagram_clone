import React, { Component } from 'react';
import { View, Text, FlatList, Image, } from 'react-native';
import _ from 'lodash';
import { connect } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import firebase from 'firebase';

import { infoPerfilUser, updateNomeUsr, fotosPerfil, } from '../Actions/AppActions';
import PerfilFotos from './PerfilFotos';

var nomeusr;

function RenderNomeUsr({ nome }) {

	return(
			<Text style={{ fontWeight: 'bold', justifyContent: 'flex-end', width: 100, marginTop: 20, fontSize: 17, }}> {nome} </Text>
	);

}

function Informacoes({ item, navigation, }) {
	
	//Images.foto_perfil = require('../imgs/foto_perfil.png');
	nomeusr = item.nomeUsr;
	
	return (
		<View style={{  }}>
			<View style={{ flexDirection: 'row' }}>
				<View>
					<Image source={{ uri: item.foto }} style={{ width: 88, height: 88, borderRadius: 100, marginLeft: 10 }} />
				</View>

				<View style={{ marginLeft: 25, marginTop: 17 }}>
					<Text style={{ textAlign: 'center', fontWeight: 'bold', }}>{item.posts}</Text>
					<Text>Publicações</Text>
				</View>

				<View style={{ marginLeft: 15, marginTop: 17 }}>
					<Text style={{ textAlign: 'center', fontWeight: 'bold', }}>{item.seguidores}</Text>
					<Text>Seguidores</Text>
				</View>

				<View style={{ marginLeft: 15, marginTop: 17 }}>
					<Text style={{ textAlign: 'center', fontWeight: 'bold', }}>{item.seguindo}</Text>
					<Text>Seguindo</Text>
				</View>
			</View>

			<View style={{ marginLeft: 20, marginTop: 20, marginBottom: 25 }}>
				<Text style={{ fontWeight: 'bold' }}>{item.nome}</Text>
				<Text>{item.descricao}</Text>
				<TouchableOpacity onPress={ () => false }>
					<Text style={{ color: '#3598f1' }}>{item.site}</Text>
				</TouchableOpacity>
			</View>

			<TouchableOpacity onPress={() => navigation.navigate('Editar Perfil', { foto: item.foto, nomeUsrAnterior: nomeusr})} 
				style={{height: 25, 
						marginHorizontal: 20, 
						borderRadius: 3, 
						borderWidth: 1 ,
						borderColor: '#bfbfbf', 
						justifyContent: 'center',
				}}>
				<Text style={{ fontWeight: 'bold', textAlign: 'center', borderColor: 'black' }}>Editar perfil</Text>
			</TouchableOpacity>
			
		</View>
	);
}

class Perfil extends Component {

	UNSAFE_componentWillMount() {
		this.props.infoPerfilUser();
		this.props.fotosPerfil(),
		this.criaFonteDeDados(this.props.info, this.props.fotos);
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		this.criaFonteDeDados(nextProps.info, nextProps.fotos);
	}

	criaFonteDeDados(info, fotos) {
		this.dataSource = info;
		this.fotoSource = fotos;
	}



	render() {
		
		return (
			<View style={{ backgroundColor: '#fff', flex: 1 }}>

					<View style={{ 	height: 65, 
									backgroundColor: '#fff', 
									justifyContent: 'space-around', 
									flexDirection: 'row', 
									marginLeft: 150,
									alignItems: 'center'
								}}
					>
						<FlatList
							scrollEnabled={false}
							data={this.dataSource}
							renderItem={ ({ item }) => <RenderNomeUsr nome={item.nomeUsr} /> }
							keyExtractor={item => item.email}
						/>
						
						<TouchableOpacity onPress={() => firebase.auth().signOut().then(() => { this.props.navigation.navigate('Login') })}>
							<Image source={require('../imgs/menu.png')} style={{ marginRight: 10, }}/>
						</TouchableOpacity>
					</View>

				<FlatList 
					data={this.dataSource}
					renderItem={ ({ item }) => nomeusr = item.nomeUsr && <Informacoes item={item} navigation={this.props.navigation} /> }
					keyExtractor={item => item.email}
				/>

				<PerfilFotos fotos={this.fotoSource}/>

			</View>
		)

	}
}

//

const mapStateToProps = state => {

	const info = _.map(state.InfoPerfilUser, (val, uid) => {
		return { ...val, uid };
	});

	const fotos = _.map(state.Posts_perfil, (val, uid) => {
		return { ...val, uid };
	});
	
	return {
		info,
		fotos,
		nomeUsr: state.InfoPerfilUser.nome_usr,
	}

}

export default connect(mapStateToProps, { infoPerfilUser, updateNomeUsr, fotosPerfil, }) (Perfil);
