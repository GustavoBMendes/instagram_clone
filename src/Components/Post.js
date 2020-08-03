import React, { Component, } from 'react'
import {
  Image,
  ScrollView,
  StyleSheet,
  View,
  Text,
  Dimensions,
  Modal,
} from 'react-native';
import CameraRoll from "@react-native-community/cameraroll";
import _ from 'lodash';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { TouchableOpacity, } from 'react-native-gesture-handler';
import * as MediaLibrary from 'expo-media-library';

import { FinalizarPost } from './FinalizarPost';

var photos = [];

class Post extends Component {

	state = {
		rollGranted: false,
		photo: [],
		modalVisible: false,
		modalImage: null,
	}

	componentDidMount() {
		this.getPermissionAsync();
		this.getCameraRoll();
	}


	getPermissionAsync = async () => {
		if(Constants.platform.ios) {
			const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
			if (status !== 'granted') {
				alert('Sorry, we need camera roll permissions to make this work!');
			}
			else {
				this.setState({ rollGranted: true });
			}
		}
	};

	getCameraRoll = async () => {
		var i;
		const album = await MediaLibrary.getAlbumAsync('Camera');
		const photosTemp = await MediaLibrary.getAssetsAsync({ album: album, first: 4 });
		console.log('photos', photosTemp);
		for(i = 0; i < photosTemp.assets.length; i++)
			photos.push(photosTemp.assets[i].uri);

		this.setState({ photo: photos })

	}

	setModalVisible(visible, imageKey) {
		this.setState({ modalImage: this.state.photo[imageKey] });
		this.setState({ modalVisible: visible })
	}

	avancarPost() {
		this.setModalVisible(false);
		this.props.navigation.navigate('Finalizar Post', { imagem: this.state.modalImage });
	}

	render() {
		
		return (
			<View style={{ backgroundColor: '#fff', flex: 1 }}>

				<View style={styles.cabecalho}>

					<TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{ marginLeft: 7, marginTop: 15 }}>
						<Text style={{ fontSize: 17, }}>Cancelar</Text>
					</TouchableOpacity>

					<TouchableOpacity onPress={() => false} style={{ marginTop: 15, }}>
						<Text style={{ fontWeight: '700', fontSize: 18 }}>Todas as Fotos</Text>
					</TouchableOpacity>

					<TouchableOpacity onPress={() => false} style={{ marginRight: 7, marginTop: 15 }}>
						<Text style={{ fontSize: 17, color: '#3598f1', fontWeight: '600', }}>Concluir</Text>
					</TouchableOpacity>

				</View>

				<ScrollView>

					<Modal style={styles.modal} animationType={'fade'}
							transparent={true} visible={this.state.modalVisible}
							onRequestClose={() => {}}>
						
						<View style={styles.modal}>

							<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

								<Text style={{ color: '#fff' }} onPress={() => {this.setModalVisible(false)}}>
									Close
								</Text>

								<Text style={{ color: '#fff' }} onPress={() => this.avancarPost() }> Avançar </Text>

							</View>

							<Image style={styles.imageModal} source={{ uri: this.state.modalImage }} />
						</View>

					</Modal>

					<View style={styles.container}>
						{this.state.photo.map((p, i) => {
							return (
								<TouchableOpacity key={i} onPress={() => { this.setModalVisible(true, i) }}>
									<View>
										<Image key={i} style={styles.imageWrap} source={{ uri: p }} />
									</View>
								</TouchableOpacity>
							);
						})}
					</View>
					
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

	container: {
		flex:1 ,
		flexDirection: 'row',
		flexWrap: 'wrap',
	},

	imageWrap: {
		margin: 1,
		padding: 1,
		height: (Dimensions.get('window').height/6) - 11,
		width: (Dimensions.get('window').width/4) - 2,
	},

	modal: {
		flex: 1,
		padding: 40,
		backgroundColor: 'rgba(0,0,0,0.9)'
	},

	imageModal: {
		height: (Dimensions.get('window').height/2),
		width: null,
	}

});

export default Post;