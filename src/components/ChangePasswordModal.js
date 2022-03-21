import React, {useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';

const ChangePasswordModal = ({visible, hide}) => {
  const [newPassword, setNewPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const changeUserPassword = async () => {
    await auth()
      .currentUser.updatePassword(newPassword)
      .then(() => {
        hide();
      })
      .catch(error => {
        if (error.code === 'auth/weak-password') {
          setPasswordError('Password is too weak! Try something else');
        } else if (error.code === 'auth/requires-recent-login') {
          Alert.alert(
            'This operation is sensitive and requires recent authentication. You have to log in again',
          );
        }
      });
  };

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          hide();
        }}>
        <KeyboardAvoidingView
          behavior="height"
          keyboardVerticalOffset={-200}
          style={styles.container}>
          <View style={styles.modal}>
            <Text style={styles.title}>Change Password</Text>
            <View style={styles.inputField}>
              <Icon name="key-sharp" size={20} color="#999" />
              <TextInput
                style={styles.input}
                value={newPassword}
                onChangeText={setNewPassword}
                placeholder="New Password"
                placeholderTextColor="#999"
                secureTextEntry
              />
            </View>
            <Text style={styles.errorText}>{passwordError}</Text>
            <View style={styles.decisions}>
              <Text
                style={styles.cancel}
                onPress={() => {
                  hide();
                }}>
                Cancel
              </Text>
              <Text
                style={styles.accept}
                onPress={() => {
                  changeUserPassword();
                }}>
                Change
              </Text>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 16,
  },
  modal: {
    backgroundColor: '#FFF',
    height: '30%',
    width: '100%',
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#000',
    fontSize: 18,
    fontFamily: 'Roboto-Regular',
    marginBottom: 34,
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
    color: '#000',
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    padding: 0,
    paddingLeft: 11,
  },
  errorText: {
    marginTop: 5,
    fontFamily: 'Roboto-Medium',
    color: '#EF3838',
  },
  decisions: {
    marginTop: 29,
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  cancel: {
    color: '#EF3838',
    fontSize: 18,
    fontFamily: 'Roboto-Regular',
  },
  accept: {
    color: '#000',
    fontSize: 18,
    fontFamily: 'Roboto-Regular',
  },
});

export default ChangePasswordModal;
