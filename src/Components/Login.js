import React, { Component } from 'react';
import { View, StatusBar, Image, Text, ActivityIndicator, StyleSheet, } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import * as firebase from 'firebase';
import { modificaSenha, modificaEmail, autenticarUser, } from '../Actions/AutenticacaoActions';

class Login extends Component {
  
  componentDidMount() {

    firebase.auth().onAuthStateChanged(user => {
      if(user != null) {
        //this.props.navigation.navigate('Feed');
      }
    })

  }

  _autenticarUser() {
    const { email, senha, navigation } = this.props;
    this.props.autenticarUser({ email, senha, navigation })
  }
  
  RenderBtn() {
  
    if(this.props.loading_login) {
  
      return(
        <ActivityIndicator size='large' />
      );
  
    }
  
    else {
      return (
        <TouchableOpacity 
          style={{ backgroundColor: '#3598f1', height: 35, borderRadius: 2, justifyContent: 'center' }}
          onPress={() => this._autenticarUser()}
        >
          <Text style={{ textAlign: 'center', color: '#fff' }}>LOG IN</Text>
        </TouchableOpacity>
      );
    }

  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>

        <StatusBar />

        <View style={{ flex: 4, alignItems: 'center', justifyContent: 'flex-end' }}>
          <Image 
            source={ require('../imgs/instagram_logo.svg') } 
            style={{ height: 100, width: 200, resizeMode: 'contain', marginBottom: 30 }}
          />
        </View>
        
        <View style={{ flex: 1, marginHorizontal: 40 }}>
        
          <TouchableOpacity style={{ backgroundColor: '#1578f2', height: 35, borderRadius: 2 }}>
            <View style={{ flexDirection: 'row' }}>
              <Image 
                source={ require('../imgs/f_logo_.svg') } 
                style={{ height: 25, width: 25, marginVertical: 5, marginLeft: 7 }}
              />
              <Text style={{ color: '#fff', marginTop: 9, marginLeft: 35, textAlign: 'center' }}>
                CONTINUE COM O FACEBOOK
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginHorizontal: 40, marginBottom: 20}}>
          <View style={styles.linhas} />
          <Text alignSelf='flex-start' style={{ color: '#bfbfbf', fontWeight: 'bold' }}>OU</Text>
          <View style={styles.linhas} />
        </View>

        <View style={{ flex: 6, alignContent: 'space-around', marginHorizontal: 40 }}>
          <TextInput 
            placeholder='E-mail' 
            placeholderTextColor='#bfbfbf' 
            onChangeText={ texto => this.props.modificaEmail(texto) }
            style={styles.email}
          />
          <TextInput
            secureTextEntry={true} 
            placeholder='Senha' 
            placeholderTextColor='#bfbfbf'
            onChangeText={ texto => this.props.modificaSenha(texto) }
            style={styles.senha}
          />
          
          <Text style={{ color: 'red', marginBottom: 5 }}>{this.props.msg_erro_login}</Text>

          {this.RenderBtn()}

          <TouchableOpacity onPress={() => false}>
            <Text style={styles.ajuda}>Esqueceu a senha?</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.cadastro}>
            <Text>Não tem uma conta?</Text>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Cadastro')}>
              <Text style={{ fontWeight: 'bold' }}>   Cadastre-se.   </Text>
            </TouchableOpacity>
        </View>
        
        
      </View>
    );
  }

}

const styles = StyleSheet.create({
	
	senha: { 
    borderColor: '#f5f5f5', 
    backgroundColor: '#fafafa', 
    borderWidth: 1, 
    borderRadius: 5, 
    marginBottom: 15, 
    height: 35 
  },

  email: { 
    borderColor: '#f5f5f5', 
    backgroundColor: '#fafafa', 
    borderWidth: 1, 
    borderRadius: 5, 
    marginBottom: 10, 
    marginTop: 10, 
    height: 35 
  },

  cadastro: { 
    flex: 1, 
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#fafafa', 
    borderTopWidth: 1, 
    borderTopColor: '#bfbfbf'
  },

  ajuda: { 
    margin: 20, 
    textAlign: 'center', 
    color:  '#3598f1' 
  },

  linhas: {
    borderTopWidth: 1, 
    width: 135, 
    alignSelf: 'center', 
    borderColor: '#bfbfbf'
  },

});

const mapStateToProps = state => ({
	email: state.AutenticacaoReducer.email,
	senha: state.AutenticacaoReducer.senha,
  loading_login: state.AutenticacaoReducer.loading_login,
  msg_erro_login: state.AutenticacaoReducer.msg_erro_login,
});

export default connect(mapStateToProps, 
                      { modificaSenha, 
                        autenticarUser, 
                        modificaEmail, 
                      })(Login);
