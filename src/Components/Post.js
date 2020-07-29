import React, { Component, PropTypes } from 'react'
import {
  Image,
  ScrollView,
  StyleSheet,
  Button,
  View,
  Text,
} from 'react-native';
import CameraRoll from "@react-native-community/cameraroll";
import CameraRollGallery from "react-native-camera-roll-gallery";
import _ from 'lodash';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { TouchableOpacity, } from 'react-native-gesture-handler';

class Post extends Component {

	constructor(props) {
		super(props);

		this.state = { photos: [] };
	}

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

	_handleButtonPress = () => {
		CameraRoll.getPhotos({
			first: 20,
			assetType: 'Photos',
			groupTypes: 'All',
		  })
		.then(data => console.log(data)
   		.catch(err => console.log(err)));
		};

	render() {
		return (
			<View style={{ backgroundColor: '#fff', flex: 1 }}>

					<View style={{ height: 65, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderWidth: 1, borderColor: '#bfbfbf' }}>

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

				<Button title="Load Images" onPress={this._handleButtonPress} />
				<ScrollView>
				{this.state.photos.map((p, i) => {
				return (
					<Image
					key={i}
					style={{
						width: 300,
						height: 100,
					}}
					source={{ uri: p.node.image.uri }}
					/>
				);
				})}
				</ScrollView>
			</View>
			
		);
	}
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#F5FCFF',
  },
  imageGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center'
  },
  image: {
      width: 100,
      height: 100,
      margin: 10,
  },
});

export default Post;