import React, {useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleLogin = async () => {
    if (email === '') {
      setEmailError('You must fill this field');
    } else if (password === '') {
      setPasswordError('You must fill this field');
    } else {
      await auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          navigation.replace('BottomTab');
        })
        .catch(error => {
          if (error.code === 'auth/invalid-email') {
            setEmailError('That email address is invalid!');
          } else if (error.code === 'auth/user-not-found') {
            setEmailError('There is no such user!');
          } else if (error.code === 'auth/wrong-password') {
            setPasswordError('That password is incorrect!');
          } else {
            setPasswordError('There was an error! Try again');
          }
        });
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="position">
      <Icon
        name="arrow-back"
        size={25}
        color="#fff"
        style={styles.arrow}
        onPress={() => {
          navigation.navigate('Welcome');
        }}
      />
      <View style={styles.imageContainer}>
        <Image source={require('../assets/logo.png')} />
      </View>
      <Text style={styles.signUpTitle}>Log In</Text>
      <View style={styles.inputFields}>
        <View style={styles.inputField}>
          <Icon name="ios-person-sharp" size={20} color="#fff" />
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={text => {
              setEmailError('');
              setEmail(text);
            }}
            placeholder="E-mail"
            placeholderTextColor="#999"></TextInput>
        </View>
        <Text style={styles.errorText}>{emailError}</Text>
        <View style={styles.inputField}>
          <Icon name="key-sharp" size={20} color="#fff" />
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={text => {
              setPasswordError('');
              setPassword(text);
            }}
            placeholder="Password"
            placeholderTextColor="#999"
            secureTextEntry></TextInput>
        </View>
        <Text style={styles.errorText}>{passwordError}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            handleLogin();
          }}>
          <Text style={styles.signUpText}>Log In</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212E6',
    padding: 16,
  },
  arrow: {
    marginBottom: 79,
  },
  imageContainer: {
    alignItems: 'center',
  },
  signUpTitle: {
    color: '#fff',
    fontSize: 36,
    fontFamily: 'Roboto-Bold',
    marginTop: 60,
    marginBottom: 70,
  },
  inputFields: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 52,
  },
  inputField: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    width: '80%',
    borderBottomColor: '#999',
    borderBottomWidth: 2,
    paddingBottom: 5,
  },
  input: {
    color: '#fff',
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    padding: 0,
    paddingLeft: 11,
  },
  errorText: {
    marginTop: 5,
    marginBottom: 5,
    fontFamily: 'Roboto-Medium',
    color: '#EF3838',
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#fff',
    width: '70%',
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  signUpText: {
    fontSize: 18,
    color: '#000',
    fontFamily: 'Roboto-Regular',
  },
});

export default LoginScreen;
