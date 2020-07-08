import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import Images from '../imgs/index';

function Explorar({ navigation }) {
	return (
		<View style={{ flex: 1, backgroundColor: '#fff', }}>
			<View style={{ height: 65, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'space-between', borderWidth: 1, borderColor: '#bfbfbf' }}>

				<View style={{ height: 40, backgroundColor: '#fafafa', marginLeft: 15, marginRight: 15, marginTop: 20, borderColor: '#f5f5f5', borderWidth: 1, borderRadius: 10, flexDirection: 'row', }}>
					<Image source={Images.search} style={{ height: 18, width: 18, marginTop: 10, marginLeft: 5, }}/>
					<TextInput placeholder='Pesquisar' placeholderTextColor='#bfbfbf' style={styles.pesquisa} />
				</View>

			</View>
		</View>
	)
}

const styles = StyleSheet.create({

	pesquisa: {
		alignItems: 'center', 
		justifyContent: 'center',
		backgroundColor: '#fafafa', 
		marginTop: 5,
		marginLeft: 10,
		height: 30,
		width: 300,
	}

})

export default Explorar;