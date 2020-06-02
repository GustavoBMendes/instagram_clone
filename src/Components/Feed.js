import React, { Component } from 'react';
import { View, Text, Image, StatusBarIOS } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Perfil from './Perfil';
import Explorar from './Explorar';
import Atividade from './Atividade';
import Post from './Post';

const Tab = createBottomTabNavigator();


function Home() {
	return (
		
		<View style={{ backgroundColor: '#fff', flex: 1 }}>

			<View style={{ height: 65, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderWidth: 1, borderColor: '#bfbfbf' }}>
				<TouchableOpacity style={{ marginLeft: 7, marginTop: 10 }}>
					<Image source={require('../imgs/fotografia.png')} style={{ height: 25, width: 25 }}/>
				</TouchableOpacity>

				<TouchableOpacity>
					<Image source={require('../imgs/instagram_logo.svg')} style={{ height: 40, width: 110, marginTop: 13, }}/>
				</TouchableOpacity>

				<TouchableOpacity style={{ marginRight: 7, marginTop: 10 }}>
					<Image source={require('../imgs/enviar.png')} style={{ height: 25, width: 25, }}/>
				</TouchableOpacity>
			</View>

		</View>
	);
}

export default class Feed extends Component {
	render() {
		return (
			<Tab.Navigator
				screenOptions={({ route }) => ({
					tabBarIcon: ({}) => {
						if(route.name === 'Home')
							return <Image source={require('../imgs/casa.png')} style={{ height: 25, width: 25 }} />;

						if(route.name === 'Explorar')
							return <Image source={require('../imgs/procurar.png')} style={{ height: 25, width: 25 }} />;

						if(route.name === 'Post')
							return <Image source={require('../imgs/mais.png')} style={{ height: 25, width: 25 }} />;

						if(route.name === 'Atividade')
							return <Image source={require('../imgs/coracao.png')} style={{ height: 25, width: 25 }} />;

						if(route.name === 'Perfil')
							return <Image source={require('../imgs/do-utilizador.png')} style={{ height: 25, width: 25 }} />;

					},
				})}
				tabBarOptions={{
					showLabel: false,
				}}
			>
				<Tab.Screen name='Home' component={Home} />
				<Tab.Screen name='Explorar' component={Explorar}/>
				<Tab.Screen name='Post' component={Post}/>
				<Tab.Screen name='Atividade' component={Atividade}/>
				<Tab.Screen name='Perfil' component={Perfil}/>
			</Tab.Navigator>
		);
	}

}
