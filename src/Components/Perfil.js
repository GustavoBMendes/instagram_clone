import React, { Component } from 'react';
import { View, Text } from 'react-native';


function Perfil({ navigation }) {
	return (
		<View style={{ backgroundColor: '#fff', flex: 1 }}>
			<View style={{ backgroundColor: '#fff', }}>

				<View style={{ height: 65, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#bfbfbf' }}>
					<Text style={{ marginTop: 10 }}>Nome Usuario</Text>
				</View>

			</View>

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

		</View>
	)
}

export default Perfil;
