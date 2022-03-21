import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import HeaderWithoutAvatar from '../components/HeaderWithoutAvatar';
import AvatarModal from '../components/AvatarModal';
import ChangePasswordModal from '../components/ChangePasswordModal';
import DeleteAccountModal from '../components/DeleteAccountModal';

import images from '../assets/avatars/images';

const avatarsCollection = firestore().collection('Avatars');

const SettingsScreen = ({navigation}) => {
  const [avatarModalVisible, setAvatarModalVisible] = useState(false);
  const [changePasswordVisible, setChangePasswordVisible] = useState(false);
  const [deleteAccountVisible, setDeleteAccountVisible] = useState(false);
  const [avatarId, setAvatarId] = useState(null);

  useEffect(() => {
    getAndSetAvatarId();
  }, []);

  const getAndSetAvatarId = async () => {
    await avatarsCollection
      .where('userId', '==', auth().currentUser.uid)
      .get()
      .then(querySnapshot => {
        setAvatarId(querySnapshot.docs[0].data().avatarId);
      })
      .catch(error => console.log(error.message));
  };

  const handleSignOut = async () => {
    await auth()
      .signOut()
      .then(() => {
        navigation.replace('Welcome');
      })
      .catch(error => console.log(error.message));
  };

  const deleteUserAccount = async () => {
    await auth()
      .currentUser.delete()
      .then(() => {
        navigation.replace('Welcome');
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  const hideAvatarModal = () => {
    setAvatarModalVisible(false);
    getAndSetAvatarId();
  };

  const hideChangePasswordModal = () => {
    setChangePasswordVisible(false);
  };

  const hideDeleteAccountModal = () => {
    setDeleteAccountVisible(false);
  };

  return (
    <View style={styles.container}>
      <HeaderWithoutAvatar navigation={navigation} />
      <View style={styles.accountSection}>
        {avatarId && (
          <Image source={images.find(image => image.id === avatarId).src} />
        )}
        <Text style={styles.email}>{auth().currentUser.email}</Text>
      </View>
      <Text style={styles.title}>Profile Settings</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setAvatarModalVisible(!avatarModalVisible);
        }}>
        <Text style={styles.buttonText}>Change Avatar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setChangePasswordVisible(true);
        }}>
        <Text style={styles.buttonText}>Change Password</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => {
          setDeleteAccountVisible(true);
        }}>
        <Text style={styles.deleteButtonText}>Delete Account</Text>
      </TouchableOpacity>
      <View style={styles.logOutButtonSection}>
        <TouchableOpacity
          style={styles.logOutButton}
          onPress={() => {
            handleSignOut();
          }}>
          <Text style={styles.deleteButtonText}>Log Out</Text>
        </TouchableOpacity>
      </View>
      {(avatarModalVisible ||
        changePasswordVisible ||
        deleteAccountVisible) && (
        <BlurView
          style={styles.blurView}
          blurType="dark"
          blurAmount={1}
          reducedTransparencyFallbackColor="white"
        />
      )}
      {avatarId && (
        <AvatarModal
          visible={avatarModalVisible}
          hide={hideAvatarModal}
          avatarId={avatarId}
        />
      )}
      <ChangePasswordModal
        visible={changePasswordVisible}
        hide={hideChangePasswordModal}
      />
      <DeleteAccountModal
        deleteUserAccount={deleteUserAccount}
        visible={deleteAccountVisible}
        hide={hideDeleteAccountModal}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  blurView: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#121212E6',
    padding: 16,
  },
  accountSection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    paddingLeft: 30,
  },
  email: {
    color: '#FFF',
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    width: '70%',
    textAlign: 'center',
  },
  title: {
    color: '#FFF',
    fontFamily: 'Roboto-Bold',
    fontSize: 24,
    marginTop: 50,
    textAlign: 'center',
    marginBottom: 26,
  },
  button: {
    backgroundColor: '#FFF',
    width: '100%',
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'Roboto-Regular',
  },
  deleteButton: {
    backgroundColor: '#474747',
    width: '100%',
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  deleteButtonText: {
    fontSize: 16,
    color: '#FFF',
    fontFamily: 'Roboto-Regular',
  },
  logOutButtonSection: {
    flex: 1,
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  logOutButton: {
    backgroundColor: '#EF3838',
    width: '100%',
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginBottom: 20,
  },
});

export default SettingsScreen;
