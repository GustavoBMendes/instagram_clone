import React, { useState, useEffect, Component } from 'react';
import { Button, Image, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';

import Images from '../imgs/index';
import { updatePhoto } from '../Actions/AppActions';

function ImagePickerPerfil() {

  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Constants.platform.ios) {
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      //Images.foto_perfil = result.uri;
      console.log('teste', result.uri);
      updatePhoto(result.uri);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {image && <Image source={{ uri: image }} style={{ width: 100, height: 100, borderRadius: 100 }} />}
      <Button title="Escolha uma foto da sua galeria" onPress={pickImage} />
    </View>
  );

}

export default ImagePickerPerfil;
