import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';


function Atividade({ navigation }) {
	return (
		<View style={{ backgroundColor: '#fff', flex: 1 }}>

			<View style={ styles.cabecalho }>

				<Text style={{ fontWeight: 'bold', fontSize: 17, }}>Atividade</Text>

			</View>

		</View>
	)
}

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

export default Atividade;