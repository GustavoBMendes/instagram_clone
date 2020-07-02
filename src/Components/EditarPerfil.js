import React, { Component, } from 'react';
import { View, Text, Image, FlatList, StyleSheet, Button } from 'react-native';
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';
import _ from 'lodash';
import { connect } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

import Images from '../imgs/index';
import { infoPerfilUser, updatePerfil, updateNome } from '../Actions/AppActions';


class ImagePic extends Component {

	state = {
		image: null,
	};

	componentDidMount() {
		this.getPermissionAsync();
	}

	getPermissionAsync = async () => {
		if(Constants.platform.ios) {
			const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
			if (status !== 'granted') {
				alert('Sorry, we need camera roll permissions to make this work!');
			}
		}
	};

	_pickImage = async () => {
		try {
		  let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		  });
		  if (!result.cancelled) {
			this.setState({ image: result.uri });
		  }
	
		  console.log(result);
		} catch (E) {
		  console.log(E);
		}
	};

	render() {
		let{ image } = this.state;
		if(image != null) {
			Images.foto_perfil = image;
		}
		return(
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
				<Image source={{ uri: Images.foto_perfil }} style={{ marginTop: 15,width: 88, height: 88, borderRadius: 100 }} />
				<TouchableOpacity onPress={this._pickImage}>
					<Text style={{ color: '#3598f1', fontSize: 15, fontWeight: 'bold' }}>Alterar foto do perfil</Text>
				</TouchableOpacity>
			</View>
		);
	}

}

function Informacoes({ item, nome, nomeUsr, site, bio, updateNome }) {

	Images.foto_perfil = item.foto;

	console.log(Images.foto_perfil);

	return (
		<View style={{  }}>
			<View style={{ flexDirection: 'column', alignItems: 'center' }}>
				
				<ImagePic />

			</View>

			<View style={styles.linhas} />
			<View style={{ flexDirection: 'row' }}>
				<Text style={{ fontSize: 16, marginTop: 20, marginLeft: 17 }}>Nome</Text>
				<TextInput value={nome} onChangeText={updateNome(nome)} style={{ fontSize: 20, marginTop: 8, marginLeft: 45, borderBottomWidth: 1, width: 250, height: 50, borderColor: '#bfbfbf' }}/>
			</View>

			<View style={{ flexDirection: 'row', }}>
				<View>
					<Text style={{ fontSize: 16, marginTop: 20, marginLeft: 17, }}>Nome</Text>
					<Text style={{ fontSize: 16, marginLeft: 17, }}>de usuário</Text>
				</View>
				<View>
					<TextInput value={nomeUsr} style={{ fontSize: 20, marginTop: 8, marginLeft: 14, borderBottomWidth: 1, width: 250, height: 50, borderColor: '#bfbfbf' }}/>
				</View>
			</View>

			<View style={{ flexDirection: 'row' }}>
				<Text style={{ fontSize: 16, marginTop: 20, marginLeft: 17 }}>Site</Text>
				<TextInput placeholder='Seu site' value={site} style={{ fontSize: 20, marginTop: 8, marginLeft: 61, borderBottomWidth: 1, width: 250, height: 50, borderColor: '#bfbfbf' }}/>
			</View>

			<View style={{ flexDirection: 'row' }}>
				<Text style={{ fontSize: 15, marginTop: 20, marginLeft: 17 }}>Bio</Text>
				<TextInput value={bio} style={{ fontSize: 20, marginTop: 15, marginLeft: 66, }}/>
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

					<TouchableOpacity onPress={() => this.props.updatePhoto(Images.foto_perfil, this.props.navigation)} style={{ marginRight: 7, marginTop: 15 }}>
						<Text style={{ fontSize: 17, color: '#3598f1', fontWeight: 'bold', }}>Concluir</Text>
					</TouchableOpacity>

				</View>

				<FlatList 
					data={this.dataSource}
					renderItem={ ({ item }) => 
						<Informacoes 
							item={item} 
							nome={this.props.nome} updateNome={this.props.updateNome()}
							nomeUsr={this.props.nome_usr} 
							site={this.props.site} 
							bio={this.props.bio} 
						/> 
					}
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
		info,
		nome: state.InfoPerfilUser.nome,
		nome_usr: state.InfoPerfilUser.nome_usr,
		site: state.InfoPerfilUser.site,
		bio: state.InfoPerfilUser.bio,
	}

}

export default connect(mapStateToProps, { infoPerfilUser, updatePerfil, updateNome }) (EditarPerfil);
