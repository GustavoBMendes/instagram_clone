import React, { Component } from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import _ from 'lodash';
import { connect } from 'react-redux';

import { infoPerfilUser } from '../Actions/AppActions';
import { TouchableOpacity } from 'react-native-gesture-handler';

/*
<View>
	<View style={{ flexDirection: 'row' }}>
		<Text>IMAGEM PERFIL</Text>
		<Text># POSTS</Text>
		<Text># SEGUIDORES</Text>
		<Text># SEGUINDO</Text>
	</View>
	<View>
		<Text>NOME</Text>
		<Text>Descrição perfil</Text>
		<Text>Botão editar perfil</Text>
	</View>
</View>

<View>
	<Text>FOTOS</Text>
</View>
*/

function Informacoes({ item }) {
	console.log("PERFIL", item);
	const foto = item.foto;
	return (
		<View style={{ flex: 1 }}>
			<View style={{ flexDirection: 'row' }}>
				<View>
					<Image source={{ uri: foto }} style={{ marginLeft: 15, }} />
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

			<TouchableOpacity onPress={() => false} 
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
				<View style={{ backgroundColor: '#fff', }}>

					<View style={{ height: 65, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
						<Text style={{ marginTop: 15, fontWeight: 'bold' }}>Nome Usuario</Text>
					</View>

				</View>

				<FlatList 
					data={this.dataSource}
					renderItem={ ({ item }) => <Informacoes item={item}/> }
					keyExtractor={item => item.email}
				/>

				<View style={{ flex: 10 }}>
					<Text>FOTOS</Text>
				</View>

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
