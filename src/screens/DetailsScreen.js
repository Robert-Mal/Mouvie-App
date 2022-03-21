import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import {BlurView} from '@react-native-community/blur';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import HeaderWithoutAvatar from '../components/HeaderWithoutAvatar';
import RatingModal from '../components/RatingModal';

const moviesCollection = firestore().collection('Movies');

const DetailsScreen = ({navigation, route}) => {
  const [movie, setMovie] = useState(null);
  const [userRating, setUserRating] = useState(null);
  const [movieDocId, setMovieDocId] = useState(null);
  const [ratingModalVisibilty, setRatingModalVisiblity] = useState(false);
  const [addOrUpdate, setAddOrUpdate] = useState(null);
  const movieId = route.params.movieId;

  useEffect(() => {
    getAndSetMovie();
  }, []);

  const getAndSetMovie = async () => {
    await fetch('https://api.tvmaze.com/shows/' + movieId)
      .then(response => response.json())
      .then(data => setMovie(data))
      .then(() => getAndSetUserRating())
      .catch(error => console.log(error));
  };

  const getAndSetUserRating = async () => {
    await moviesCollection
      .where('movieId', '==', movieId)
      .where('userId', '==', auth().currentUser.uid)
      .get()
      .then(querySnapshot => {
        if (querySnapshot.docs.length != 0) {
          setUserRating(querySnapshot.docs[0].data().userRating);
          setMovieDocId(querySnapshot.docs[0].id);
        }
      })
      .catch(error => console.log(error.message));
  };

  const getYear = () => {
    const premieredYear = movie.premiered.slice(0, 4);
    const endedYear = movie.ended && movie.ended.slice(0, 4);
    if (endedYear === null) {
      return premieredYear + '-';
    } else if (premieredYear === endedYear) {
      return premieredYear;
    } else {
      return premieredYear + '-' + endedYear;
    }
  };

  const addMovie = async userRating => {
    await moviesCollection
      .add({
        movieId: movie.id,
        userId: auth().currentUser.uid,
        userRating: userRating,
      })
      .then(() => {
        getAndSetMovie();
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  const deleteMovie = async () => {
    await moviesCollection
      .doc(movieDocId)
      .delete()
      .then(() => {
        setUserRating(null);
        getAndSetMovie();
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  const updateMovie = async userRating => {
    await moviesCollection
      .doc(movieDocId)
      .update({
        userRating: userRating,
      })
      .then(() => getAndSetMovie())
      .catch(error => {
        console.log(error.message);
      });
  };

  const hideRatingModal = () => {
    setRatingModalVisiblity(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <HeaderWithoutAvatar navigation={navigation} />
      </View>
      {movie && (
        <ParallaxScrollView
          contentBackgroundColor="black"
          parallaxHeaderHeight={504}
          renderForeground={() => (
            <Image
              style={styles.image}
              source={{
                uri: `${movie.image.original}`,
              }}
            />
          )}>
          <View style={styles.spacing}>
            <Text style={styles.title}>{movie.name}</Text>
            <Text style={styles.year}>{getYear()}</Text>
            <Text style={styles.genres}>{movie.genres.join(', ')}</Text>
            <Text style={styles.genres}>
              {movie.summary.replace(/(<p>|<b>|<\/p>|<\/b>)/g, '')}
            </Text>
            <View style={styles.ratings}>
              <View style={styles.ratingsField}>
                <Text style={styles.rating}>Your rating: </Text>
                <Text style={styles.number}>
                  {!userRating ? '-' : userRating}
                </Text>
                <Icon name="star" color="#FFF" size={17} />
              </View>
              <View style={styles.ratingsField}>
                <Text style={styles.rating}>IMDB rating: </Text>
                <Text style={styles.number}>
                  {!movie.rating.average ? '-' : movie.rating.average}
                </Text>
                <Icon name="star" color="#FFFF00" size={17} />
              </View>
            </View>
            {userRating ? (
              <View style={styles.buttonSection}>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => {
                    deleteMovie();
                  }}>
                  <Icon name="trash" color="#000" size={25} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.updateButton}
                  onPress={() => {
                    setAddOrUpdate('update');
                    setRatingModalVisiblity(true);
                  }}>
                  <Text style={styles.buttonText}>Change your rating</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setAddOrUpdate('add');
                  setRatingModalVisiblity(true);
                }}>
                <Text style={styles.buttonText}>Rate & Add to your list</Text>
              </TouchableOpacity>
            )}
            <RatingModal
              visible={ratingModalVisibilty}
              hide={hideRatingModal}
              addMovie={addMovie}
              updateMovie={updateMovie}
              addOrUpdate={addOrUpdate}
            />
          </View>
        </ParallaxScrollView>
      )}
      {ratingModalVisibilty && (
        <BlurView
          style={styles.blurView}
          blurType="dark"
          blurAmount={1}
          reducedTransparencyFallbackColor="white"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212E6',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#121212E6',
    zIndex: 2,
  },
  detailsContainer: {
    flex: 1,
  },
  spacing: {
    marginHorizontal: 16,
  },
  image: {
    width: '100%',
    height: 504,
    resizeMode: 'contain',
  },
  title: {
    color: '#FFF',
    fontSize: 32,
    fontFamily: 'Roboto-Regular',
    includeFontPadding: false,
    paddingHorizontal: 1,
  },
  year: {
    color: '#FFF',
    fontSize: 24,
    fontFamily: 'Roboto-Regular',
    includeFontPadding: false,
    paddingBottom: 1,
  },
  genres: {
    color: '#FFF',
    fontSize: 16,
    includeFontPadding: false,
    paddingBottom: 14,
  },
  ratings: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 29,
  },
  ratingsField: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  number: {
    color: '#FFF',
    fontSize: 18,
    includeFontPadding: false,
    paddingLeft: 8,
    paddingRight: 6,
  },
  rating: {
    color: '#FFF',
    fontSize: 14,
    includeFontPadding: false,
  },
  button: {
    backgroundColor: '#fff',
    width: '100%',
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginBottom: 16,
  },
  buttonText: {
    fontSize: 18,
    color: '#000',
    fontFamily: 'Roboto-Regular',
  },
  blurView: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 3,
  },
  buttonSection: {
    flexDirection: 'row',
  },
  deleteButton: {
    backgroundColor: '#EF3838',
    width: 74,
    height: 51,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginRight: 15,
  },
  updateButton: {
    backgroundColor: '#FFF',
    width: '75%',
    height: 51,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
});

export default DetailsScreen;
