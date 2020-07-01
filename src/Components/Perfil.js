import React, { Component } from 'react';
import { View, Text, FlatList, Image, } from 'react-native';
import _ from 'lodash';
import { connect } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import firebase from 'firebase';

import Images from '../imgs/index';
import { infoPerfilUser } from '../Actions/AppActions';
import PerfilFotos from './PerfilFotos';

function Informacoes({ item, navigation }) {
	
	//Images.foto_perfil = require('../imgs/foto_perfil.png');

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
				<Text style={{ fontWeight: 'bold' }}>Nome</Text>
				<Text>{item.descricao}</Text>
			</View>

			<TouchableOpacity onPress={() => navigation.navigate('Editar Perfil')} 
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

					<View style={{ 	height: 65, 
									backgroundColor: '#fff', 
									justifyContent: 'space-around', 
									flexDirection: 'row', 
									marginLeft: 130,
									alignItems: 'center'
								}}
					>
						<Text style={{ fontWeight: 'bold', }}>Nome Usuario</Text>
						
						<TouchableOpacity onPress={() => firebase.auth().signOut().then(() => { this.props.navigation.navigate('Login') })}>
							<Image source={require('../imgs/menu.png')} style={{ marginLeft: 70, }}/>
						</TouchableOpacity>
					</View>

				<FlatList 
					data={this.dataSource}
					renderItem={ ({ item }) => <Informacoes item={item} navigation={this.props.navigation} /> }
					keyExtractor={item => item.email}
				/>

				<PerfilFotos />

			</View>
		)

	}
}

const mapStateToProps = state => {

	const info = _.map(state.InfoPerfilUser, (val, uid) => {
		return { ...val, uid };
	});
	
	return {
		info
	}

}

export default connect(mapStateToProps, { infoPerfilUser }) (Perfil);
