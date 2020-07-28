import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image, } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { getNotificacoes, seguirPerfil, seguidor, unfollow, } from '../Actions/AppActions';

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

	/* not working, dont know why
	RenderNotif( item ) {
		console.log('teste', item);
		return(
			<View style={{ flexDirection: 'row', marginTop: 10, }}>
				<Image source={{ uri: item.fotoSeguidor }} style={{ width: 44, height: 44, borderRadius: 100, marginLeft: 15 }}/>
				<View style={{ alignSelf: 'center', marginLeft: 10, flexDirection: 'row' }}>
					<Text style={{ fontWeight: '600' }}>{item.nomeUsrSeguidor}</Text>
					<Text>{item.msg}</Text>
				</View>
				<RenderBtn nomeUsuario={item.nomeUsrSeguidor} email={item.emailSeguidor} nome={item.nomeSeguidor}/>
			</View>
		)
	}
	*/

	RenderBtn(nomeUsuario, email, nome) {

		this.props.seguidor(email);
		if(!this.props.seguindo) {
	
			return(
				<TouchableOpacity onPress={() => this.props.seguirPerfil(email, nomeUsuario, nome )} 
					style={{height: 25, 
							width: 90,
							marginRight: 10, 
							marginLeft: 15,
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
	
		else {
			return(
				<TouchableOpacity onPress={() => this.props.unfollow(email)} 
					style={{height: 25, 
							marginHorizontal: 20, 
							borderRadius: 3, 
							borderWidth: 1 ,
							borderColor: '#bfbfbf', 
							justifyContent: 'center',
					}}>
					<Text style={{ fontWeight: 'bold', textAlign: 'center', }}>Seguindo</Text>
				</TouchableOpacity>
			);
		}
	
	}

	render() {
		return (
			<View style={{ backgroundColor: '#fff', flex: 1 }}>

				<View style={ styles.cabecalho }>

					<Text style={{ fontWeight: 'bold', fontSize: 17, }}>Atividade</Text>

				</View>

				<View style={{ flex: 1, margin: 5, }}>
					<FlatList
						data={this.dataSource}
						renderItem={ ({ item }) => { 

							return(
								<View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-around', alignItems: 'center' }}>
									<Image source={{ uri: item.fotoSeguidor }} style={{ width: 44, height: 44, borderRadius: 100, marginLeft: 15, }}/>
									<View style={{ marginLeft: 10, flexDirection: 'row', flex: 1, }}>
										<Text style={{ flexWrap: 'wrap', }}>
											<Text style={{ fontWeight: '600' }}>{item.nomeUsrSeguidor}</Text> 
											<Text>{item.msg}</Text>
										</Text>
									</View>
									<View>
									{ this.RenderBtn(item.nomeUsrSeguidor, item.emailSeguidor, item.nomeSeguidor) }
									</View>
								</View>
							)} 
							
						}
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

export default connect(mapStateToProps, { getNotificacoes, seguirPerfil, seguidor, unfollow, })(Atividade)

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
