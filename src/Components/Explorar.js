import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';


function Explorar({ navigation }) {
	return (
		<View style={{ flex: 1, backgroundColor: '#fff', }}>
			<View style={{ height: 65, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderWidth: 1, borderColor: '#bfbfbf' }}>

				<TextInput placeholder='Pesquisar' 
					style={{ 	alignItems: 'center', 
								backgroundColor: '#fafafa', 
								borderColor: '#f5f5f5', 
								borderWidth: 1, 
								borderRadius: 5, 
								marginBottom: 10,
								marginLeft: 15,
								marginTop: 20,
								height: 35,
								width: 340 }}
				/>

			</View>
		</View>
	)
}

export default Explorar;