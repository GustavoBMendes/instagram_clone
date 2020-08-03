import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


class FinalizarPost extends Component {

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

					<TouchableOpacity onPress={() => false} style={{ marginRight: 7, marginTop: 15 }}>
						<Text style={{ fontSize: 17, color: '#3598f1', fontWeight: '600', }}>Postar</Text>
					</TouchableOpacity>

				</View>

				<View>
					<Image source={{ uri: imagem }} style={{ width: 100, height: 100, }}/>
				</View>

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

})

export default FinalizarPost;
