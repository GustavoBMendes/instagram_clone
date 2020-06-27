import React, { Component, } from 'react';
import { View, Text, Image, FlatList, StyleSheet, Button } from 'react-native';
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';
import _ from 'lodash';
import { connect } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

import Images from '../imgs/index';
import { infoPerfilUser } from '../Actions/AppActions';
//import ImagePicker from './ImagePickerPerfil';

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
				<Image source={{ uri: Images.foto_perfil }} style={{ marginTop: 15,width: 100, height: 100, borderRadius: 100 }} />
				<Button title="Pick an image from camera roll" onPress={this._pickImage} />
			</View>
		);
	}

}

function Informacoes({ item, navigation }) {

	Images.foto_perfil = item.foto;

	return (
		<View style={{  }}>
			<View style={{ flexDirection: 'column', alignItems: 'center' }}>
				
				<ImagePic />

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
