import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, KeyboardAvoidingView } from 'react-native';
import { TouchableOpacity, TextInput, ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import _ from 'lodash';

import { post, updateLegenda, infoPerfilUser, } from '../Actions/AppActions';

class FinalizarPost extends Component {

	UNSAFE_componentWillMount() {
		this.props.infoPerfilUser();
		this.criaFonteDeDados(this.props.info,);
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		this.criaFonteDeDados(nextProps.info,);
	}

	criaFonteDeDados(info,) {
		this.dataSource = info;
	}

	render() {
		const { route } = this.props;
		const { imagem } = route.params;
		return (
			<View style={{ backgroundColor: '#fff', flex: 1 }}>
				
				<View style={styles.cabecalho}>

					<TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{ marginLeft: 7, marginTop: 15 }}>
						<Text style={{ fontSize: 17, }}>Cancelar</Text>
					</TouchableOpacity>

					<TouchableOpacity onPress={() => false} style={{ marginTop: 15, }}>
						<Text style={{ fontWeight: '700', fontSize: 18 }}>Editar</Text>
					</TouchableOpacity>

					<TouchableOpacity onPress={() => this.props.post(imagem, this.props.legenda_photo, this.dataSource[0].nomeUsr, this.dataSource[0].foto, this.props.navigation)} style={{ marginRight: 7, marginTop: 15 }}>
						<Text style={{ fontSize: 17, color: '#3598f1', fontWeight: '600', }}>Postar</Text>
					</TouchableOpacity>

				</View>
				<ScrollView>
					<KeyboardAvoidingView behavior="position" enabled>
						<View>
							<Image source={{ uri: imagem }} style={{ width: null, height: (Dimensions.get('window').height/2), }}/>
						</View>
						
						<TextInput 
							placeholder='Escreva uma legenda' 
							value={this.props.legenda_photo} 
							onChangeText={texto => this.props.updateLegenda(texto)} 
							placeholderTextColor='#bfbfbf' 
							color='black'
							style={styles.text_input} 
						/>

						<View style={styles.linhas} />

						<TextInput placeholder='Localização' placeholderTextColor='#bfbfbf' style={styles.text_input} />

						<View style={styles.linhas} />

						<TextInput placeholder='Marcar usuários' placeholderTextColor='#bfbfbf' style={styles.text_input} />

						<View style={styles.linhasFechadas} />
					</KeyboardAvoidingView>
				</ScrollView>
			</View>
		);
	}
}

const styles = StyleSheet.create({

	cabecalho: { 
		height: 65, 
		backgroundColor: '#fff', 
		flexDirection: 'row',
		alignItems: 'center', 
		justifyContent: 'space-between', 
		borderWidth: 1, 
		borderColor: '#bfbfbf' 
	},

	linhas: {
		borderTopWidth: 1, 
		width: Dimensions.get('window').width/1.09, 
		alignSelf: 'center', 
		borderColor: '#bfbfbf',
		marginTop: 5,
		marginLeft: 35,
	},

	linhasFechadas: {
		borderTopWidth: 1, 
		width: 400,
		alignSelf: 'center', 
		borderColor: '#bfbfbf',
		marginTop: 5,
	},

	text_input: { 
		width: 250, 
		height: 50, 
		fontSize: 20,
		marginLeft: 35,
		marginVertical: 5,
	}

})

const mapStateToProps = state => {

	const info = _.map(state.InfoPerfilUser, (val, uid) => {
		return { ...val, uid };
	});

	return {
		info,
		legenda_photo: state.InfoPerfilUser.legenda_photo,
	}

}

export default connect(mapStateToProps, { post, updateLegenda, infoPerfilUser, })(FinalizarPost);
