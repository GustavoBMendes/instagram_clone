import React, { Component } from "react";
import { View, StatusBar, Text, StyleSheet } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { modificaEmail, } from '../Actions/AutenticacaoActions';

class EmailCad extends Component {

	render() {
		return (
			<View style={{ flex: 1, backgroundColor: '#fff', }} >
				<StatusBar backgroundColor='#fff' barStyle='dark-content'/>
				<TextInput 
					value={this.props.email}
					placeholder='Insira seu e-mail' 
					placeholderTextColor='#bfbfbf' 
					style={styles.textinput}
					onChangeText={ texto => this.props.modificaEmail(texto) }
				/>
				<TouchableOpacity 
					style={styles.butao}
					onPress={() => this.props.jumpTo('second')}
				>
					<Text style={{ textAlign: 'center', color: '#fff' }}>AVANÇAR</Text>
				</TouchableOpacity>
				<Text style={styles.texto}>Não é spam!</Text>
			</View>
		);
	}

}

const styles = StyleSheet.create({

	butao: {
		backgroundColor: '#3598f1', 
		height: 35, 
		borderRadius: 2, 
		justifyContent: 'center', 
		marginHorizontal: 40,
	},
	textinput: { 
		marginHorizontal: 40, 
		borderColor: '#f5f5f5', 
		backgroundColor: '#fafafa', 
		borderWidth: 1, 
		borderRadius: 5, 
		marginBottom: 10, 
		marginTop: 10, 
		height: 35,
	},
	texto: {
		color: '#bfbfbf', 
		textAlign: 'center', 
		marginTop: 10, 
		marginHorizontal: 40,
	},

});

const mapStateToProps = state => ({
	email: state.AutenticacaoReducer.email,
});

export default connect(mapStateToProps, { modificaEmail, })(EmailCad);
