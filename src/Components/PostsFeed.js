import React, { Component } from 'react';
import { View, Text, Image, Dimensions, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';

import { getPostsFeed } from '../Actions/AppActions';
import { FlatList } from 'react-native-gesture-handler';

class PostsFeed extends Component {

	UNSAFE_componentWillMount() {
		this.props.getPostsFeed();
		this.criaFonteDeDados(this.props.posts,);
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		this.criaFonteDeDados(nextProps.posts,);
	}

	criaFonteDeDados(posts,) {
		this.dataSource = posts;
	}

	render() {

		return (
			<View>
				<FlatList 
					contentContainerStyle={{flexDirection : 'column-reverse',}} 
					data={this.dataSource}
					renderItem={ ({ item }) => {
						return (

							<View>
								<View style={{ margin: 10, flexDirection: 'row' }}>
									<Image source={{ uri: item.fotoPerfil }} style={{ width: 40, height: 40, borderRadius: 100, }}/>
									<Text style={{ alignSelf: 'center', marginLeft: 10, fontWeight: '700' }}>{item.nomeUsr}</Text>
								</View>

								<View style={{ marginBottom: 20, }}>
									<Image source={{ uri: item.foto }} style={styles.image} />
									<View style={{ flexDirection: 'row', margin: 10, }}>
										<Text style={{ fontWeight: '700', }}>{item.nomeUsr} </Text>
										<Text> {item.legenda}</Text>
									</View>
								</View>

							</View>

						);
					}}
					keyExtractor={item=> item.foto}
				/>
			</View>
		);

	}

}

const styles = StyleSheet.create({

	image: { 
		width:null, 
		height: Dimensions.get('window').height*5/11, 
	},

})

const mapStateToProps = state => {

	const posts = _.map(state.Posts_feed, (val, uid) => {
		return { ...val, uid };
	})

	return {
		posts,
	}

}

export default connect(mapStateToProps, { getPostsFeed, }) (PostsFeed);
