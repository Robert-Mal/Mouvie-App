import React from 'react';
import {Modal, StyleSheet, Text, View} from 'react-native';

const DeleteAccountModal = ({deleteUserAccount, visible, hide}) => {
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
            <Text style={styles.title}>
              Are you sure you want to delete your account?
            </Text>
            <Text style={styles.description}>
              You will cannot reverse that action
            </Text>

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
                  deleteUserAccount();
                }}>
                Delete
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
    textAlign: 'center',
  },
  description: {
    color: '#000',
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
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

export default DeleteAccountModal;
