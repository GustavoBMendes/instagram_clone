import React, { Component } from 'react';
import { View, Text, Image, StatusBarIOS } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Images from '../imgs/index';

import Perfil from './Perfil';
import Explorar from './Explorar';
import Atividade from './Atividade';
import Post from './Post';

import PostsFeed from './PostsFeed';

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

			<PostsFeed />

		</View>
	);
}

export default class Feed extends Component {
	render() {
		return (
			<Tab.Navigator
				screenOptions={({ route }) => ({
					tabBarIcon: ({ focused }) => {
						if(route.name === 'Home') {
							iconName = focused ? Images.home_black : Images.home;
							return <Image source={iconName} style={{ height: 25, width: 25 }} />;
						}

						if(route.name === 'Explorar') {
							iconName = focused ? Images.search_black : Images.search;
							return <Image source={iconName} style={{ height: 25, width: 25 }} />;
						}

						if(route.name === 'Post') {
							iconName = focused ? Images.mais_preto : Images.mais;
							return <Image source={iconName} style={{ height: 25, width: 25 }} />;
						}

						if(route.name === 'Atividade') {
							iconName = focused ? Images.black_heart : Images.heart;
							return <Image source={iconName} style={{ height: 25, width: 25 }} />;
						}

						if(route.name === 'Perfil') {
							iconName = focused ? Images.profile_black : Images.profile;
							return <Image source={iconName} style={{ height: 25, width: 25 }} />;
						}

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
