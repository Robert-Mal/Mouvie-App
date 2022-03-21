import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const HeaderWithoutAvatar = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Icon
        name="arrow-back"
        size={25}
        color="#FFFFFF"
        onPress={() => {
          navigation.goBack();
        }}
      />
      <View style={styles.logoContainer}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  logo: {
    width: 100,
    height: 43.95,
    resizeMode: 'cover',
  },
});

export default HeaderWithoutAvatar;
