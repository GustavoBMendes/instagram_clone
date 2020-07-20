import React, { Component } from 'react';
import { View, Text, FlatList, Image, } from 'react-native';
import _ from 'lodash';
import { connect } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import firebase from 'firebase';

import { infoPerfilUser, updateNomeUsr } from '../Actions/AppActions';
import PerfilFotos from './PerfilFotos';

var nomeusr;

function RenderNomeUsr({ nome }) {

	return(
			<Text style={{ fontWeight: 'bold', justifyContent: 'flex-end', width: 100 }}> {nome} </Text>
	);

}

function renderBtn({ navigation }) {

	return(
		<TouchableOpacity onPress={() => false} 
			style={{height: 25, 
					marginHorizontal: 20, 
					borderRadius: 3, 
					borderWidth: 1 ,
					borderColor: '#fff', 
					justifyContent: 'center',
					backgroundColor: '#3598f1',
			}}>
			<Text style={{ fontWeight: 'bold', textAlign: 'center', color: '#fff' }}>Seguir</Text>
		</TouchableOpacity>
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
				<Text style={{ color: '#3598f1' }}>{item.site}</Text>
			</View>

			{renderBtn(navigation)}
			
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
									marginLeft: 150,
									alignItems: 'center'
								}}
					>
						<FlatList
							data={this.dataSource}
							renderItem={ ({ item }) => <RenderNomeUsr nome={item.nomeUsr} /> }
							keyExtractor={item => item.nomeUsr}
						/>
						
						<TouchableOpacity onPress={() => false}>
							<Image source={require('../imgs/menu.png')} style={{ marginRight: 10, }}/>
						</TouchableOpacity>
					</View>

				<FlatList 
					data={this.dataSource}
					renderItem={ ({ item }) => nomeusr = item.nomeUsr && <Informacoes item={item} navigation={this.props.navigation} /> }
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
		info,
		nomeUsr: state.InfoPerfilUser.nome_usr,
	}

}

export default connect(mapStateToProps, { infoPerfilUser, updateNomeUsr }) (Perfil);
