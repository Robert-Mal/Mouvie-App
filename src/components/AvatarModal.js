import React, {useEffect, useState} from 'react';
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import images from '../assets/avatars/images';

const avatarsCollection = firestore().collection('Avatars');

const AvatarModal = ({visible, hide, avatarId}) => {
  const [chosenAvatar, setChoosenAvatar] = useState(null);
  const [docId, setDocId] = useState(null);

  useEffect(() => {
    setChoosenAvatar(avatarId);
    getAvatarDocId();
  }, []);

  const getAvatarDocId = async () => {
    await avatarsCollection
      .where('userId', '==', auth().currentUser.uid)
      .get()
      .then(querySnapshot => {
        setDocId(querySnapshot.docs[0].id);
      })
      .catch(error => console.log(error.message));
  };

  const updateUsersAvatar = async () => {
    await avatarsCollection
      .doc(docId)
      .update({avatarId: chosenAvatar})
      .then(() => {})
      .catch(error => console.log(error.message));
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
        <View style={styles.container}>
          <View style={styles.modal}>
            <Text style={styles.title}>Choose avatar</Text>
            <View style={styles.avatars}>
              {images.map(image => {
                return (
                  <TouchableOpacity
                    key={image.id}
                    style={
                      image.id === chosenAvatar
                        ? styles.chosenAvatar
                        : styles.avatar
                    }
                    onPress={() => setChoosenAvatar(image.id)}>
                    <Image source={image.src} />
                  </TouchableOpacity>
                );
              })}
            </View>
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
                  updateUsersAvatar();
                  hide();
                }}>
                Accept
              </Text>
            </View>
          </View>
        </View>
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
    height: '80%',
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
  avatars: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginHorizontal: 17,
  },
  avatar: {
    marginHorizontal: 10,
    marginBottom: 18,
  },
  chosenAvatar: {
    borderWidth: 5,
    borderRadius: 50,
    marginBottom: 8,
  },
  decisions: {
    marginTop: 27,
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

export default AvatarModal;
