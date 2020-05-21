import React from 'react';
import { View, StatusBar, Image, Button, Text } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';


export default function Login() {

  const navigation = useNavigation();
  //<Image source={ require('../imgs/f_logo.png') } style={{ height: 25, width: 25, marginTop: 5, marginLeft: 7, resizeMode: 'contain' }} />
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
        <View style={{ borderTopWidth: 1, width: 135, alignSelf: 'center', borderColor: '#bfbfbf' }} />
        <Text alignSelf='flex-start' style={{ color: '#bfbfbf', fontWeight: 'bold' }}>OU</Text>
        <View style={{ borderTopWidth: 1, width: 135, alignSelf: 'center', borderColor: '#bfbfbf' }} />
      </View>

      <View style={{ flex: 6, alignContent: 'space-around', marginHorizontal: 40 }}>
        <TextInput 
          placeholder='E-mail' 
          placeholderTextColor='#bfbfbf' 
          style={{ borderColor: '#f5f5f5', backgroundColor: '#fafafa', borderWidth: 1, borderRadius: 5, marginBottom: 10, marginTop: 10, height: 35 }}
        />
        <TextInput 
          placeholder='Senha' 
          placeholderTextColor='#bfbfbf' 
          style={{ borderColor: '#f5f5f5', backgroundColor: '#fafafa', borderWidth: 1, borderRadius: 5, marginBottom: 20, height: 35 }}
        />
        
        <TouchableOpacity style={{ backgroundColor: '#3598f1', height: 35, borderRadius: 2, justifyContent: 'center' }}>
          <Text style={{ textAlign: 'center', color: '#fff' }}>LOG IN</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => false}>
          <Text style={{ margin: 20, textAlign: 'center', color:  '#3598f1' }}>Esqueceu a senha?</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fafafa', borderTopWidth: 1, borderTopColor: '#bfbfbf' }}>
          <Text>Não tem uma conta?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
            <Text style={{ fontWeight: 'bold' }}>   Cadastre-se.   </Text>
          </TouchableOpacity>
      </View>
      
      
    </View>
  );

}
