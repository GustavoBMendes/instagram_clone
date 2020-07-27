import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image, } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';

import { getNotificacoes } from '../Actions/AppActions';

function RenderNotif({ item }) {
	return(
		<View style={{ flexDirection: 'row', marginTop: 10, }}>
			<Image source={{ uri: item.fotoSeguidor }} style={{ width: 44, height: 44, borderRadius: 100, marginLeft: 15 }}/>
			<View style={{ alignSelf: 'center', marginLeft: 10 }}>
				<Text style={{ fontWeight: 'bold' }}>{item.nomeUsrSeguidor}</Text>
				<Text style={{ color: '#bfbfbf' }}>{item.nomeSeguidor}</Text>
			</View>
		</View>
	)
}

class Atividade extends Component {
	
	UNSAFE_componentWillMount() {
		this.props.getNotificacoes();
		this.criaFonteDeDados(this.props.notif);
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		this.criaFonteDeDados(nextProps.notif);
	}

	criaFonteDeDados(notificacoes) {
		this.dataSource = notificacoes;
	}

	

	render() {
		return (
			<View style={{ backgroundColor: '#fff', flex: 1 }}>

				<View style={ styles.cabecalho }>

					<Text style={{ fontWeight: 'bold', fontSize: 17, }}>Atividade</Text>

				</View>

				<View>
					<FlatList
						data={this.dataSource}
						renderItem={ ({ item }) => <RenderNotif item = {item} /> }
						keyExtractor={item => item.nomeUsrSeguidor}
					/>
				</View>

			</View>
		)
	}

}

const mapStateToProps = state => {

	const notif = _.map(state.Notificacoes, (val, uid) => {
		return { ...val, uid }
	});

	return {
		notif
	}

}

export default connect(mapStateToProps, { getNotificacoes })(Atividade)

const styles = StyleSheet.create({

	cabecalho: {
		height: 65, 
		backgroundColor: '#fff', 
		flexDirection: 'row', 
		alignItems: 'center', 
		justifyContent: 'center', 
		borderWidth: 1, 
		borderColor: '#bfbfbf',
	}

})
