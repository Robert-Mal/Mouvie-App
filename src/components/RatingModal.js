import React, {useState} from 'react';
import {Modal, StyleSheet, Text, View} from 'react-native';
import Stars from 'react-native-stars';

const RatingModal = ({visible, hide, addMovie, updateMovie, addOrUpdate}) => {
  const [stars, setStars] = useState(0);

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
            <Text style={styles.title}>How would you rate this?</Text>
            <Stars
              half={true}
              default={2.5}
              update={val => {
                setStars(val);
              }}
              spacing={4}
              starSize={30}
              count={10}
            />
            <View style={styles.decisions}>
              <Text
                style={styles.cancel}
                onPress={() => {
                  hide();
                }}>
                Cancel
              </Text>
              {addOrUpdate === 'add' ? (
                <Text
                  style={styles.accept}
                  onPress={() => {
                    addMovie(stars);
                    hide();
                  }}>
                  Add
                </Text>
              ) : (
                <Text
                  style={styles.accept}
                  onPress={() => {
                    updateMovie(stars);
                    hide();
                  }}>
                  Update
                </Text>
              )}
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
    height: '28%',
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
    marginBottom: 32,
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

export default RatingModal;
