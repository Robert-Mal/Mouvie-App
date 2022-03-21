import React from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

const WelcomScreen = ({navigation}) => {
  return (
    <ImageBackground
      source={require('../assets/welcomeBackground.jpg')}
      resizeMode="cover"
      style={styles.container}>
      <Image source={require('../assets/logo.png')} />
      <Text style={styles.description}>
        The largest database for movies & series
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate('SignUp');
        }}>
        <Text style={styles.signUpText}>Sign Up</Text>
      </TouchableOpacity>
      <Text
        style={styles.logInText}
        onPress={() => {
          navigation.navigate('LogIn');
        }}>
        Already have an account? Log In
      </Text>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 16,
  },
  description: {
    color: '#fff',
    fontSize: 16,
    marginTop: 5.32,
    marginBottom: 28,
    fontFamily: 'Roboto-Regular',
  },
  button: {
    backgroundColor: '#fff',
    width: '100%',
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginBottom: 10,
  },
  signUpText: {
    fontSize: 18,
    color: '#000',
    fontFamily: 'Roboto-Regular',
  },
  logInText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 48,
    fontFamily: 'Roboto-Regular',
  },
});

export default WelcomScreen;
