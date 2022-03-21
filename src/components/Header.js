import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import images from '../assets/avatars/images';

const avatarsCollection = firestore().collection('Avatars');

const Header = ({navigation}) => {
  const [avatarId, setAvatarId] = useState();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getAndSetAvatarId();
    });

    return unsubscribe;
  }, [navigation]);

  const getAndSetAvatarId = async () => {
    await avatarsCollection
      .where('userId', '==', auth().currentUser.uid)
      .get()
      .then(querySnapshot => {
        setAvatarId(querySnapshot.docs[0].data().avatarId);
      })
      .catch(error => console.log(error.message));
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Settings');
        }}>
        {avatarId && (
          <Image
            source={images.find(image => image.id === avatarId).src}
            style={styles.avatar}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logo: {
    width: 100,
    height: 43.95,
    resizeMode: 'cover',
  },
  avatar: {
    width: 43,
    height: 43,
    resizeMode: 'cover',
  },
});

export default Header;
