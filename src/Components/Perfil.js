import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import _ from 'lodash';
import { connect } from 'react-redux';

import { infoPerfilUser } from '../Actions/AppActions';
import { SafeAreaView } from 'react-navigation';

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
	return (
		<View>
			<View>
				<Text>{item.posts}</Text>
				<Text>{item.seguidores}</Text>
				<Text>{item.seguindo}</Text>
			</View>
			<View>
				<Text>{item.descricao}</Text>
			</View>
			<View>
				<Text>FOTOS</Text>
			</View>
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

					<View style={{ height: 65, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#bfbfbf' }}>
						<Text style={{ marginTop: 10 }}>Nome Usuario</Text>
					</View>

				</View>

					<FlatList 
						data={this.dataSource}
						renderItem={ ({ item }) => <Informacoes item={item}/> }
						keyExtractor={item => item.email}
					/>

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
