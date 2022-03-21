import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import Header from '../components/Header';

const moviesCollection = firestore().collection('Movies');

const HomeScreen = ({navigation}) => {
  const [movies, setMovies] = useState(null);
  const [moviesDetails, setMoviesDetails] = useState([]);
  const [showIndicator, setShowIndicator] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getMovies();
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    getMovies();
  }, []);

  useEffect(() => {
    getMoviesFromApi();
  }, [movies]);

  const getMovies = async () => {
    setShowIndicator(true);
    await moviesCollection
      .where('userId', '==', auth().currentUser.uid)
      .get()
      .then(querySnapshot =>
        setMovies(
          querySnapshot.docs.map(doc => ({
            userRating: doc.data().userRating,
            movieId: doc.data().movieId,
            id: doc.id,
          })),
        ),
      )
      .catch(error => console.log(error.message));
  };

  const getMoviesFromApi = async () => {
    {
      movies &&
        setMoviesDetails(
          await Promise.all(
            movies.map(async movie => {
              const response = await fetch(
                'https://api.tvmaze.com/shows/' + movie.movieId,
              );
              return response.json();
            }),
          ),
        );
    }
    setShowIndicator(false);
  };

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <Text style={styles.screenTitle}>Movies & Series</Text>
      {showIndicator ? (
        <ActivityIndicator size="large" color="#FFF" />
      ) : (
        <ScrollView contentContainerStyle={styles.moviesContainer}>
          {moviesDetails.length && movies ? (
            moviesDetails.map(movie => (
              <TouchableOpacity
                style={styles.card}
                key={movie.id}
                onPress={() => {
                  navigation.navigate('Details', {movieId: movie.id});
                }}>
                {movie.image && (
                  <Image
                    style={styles.image}
                    source={{uri: `${movie.image.original}`}}
                  />
                )}
                <View style={styles.description}>
                  <Text style={styles.title} numberOfLines={1}>
                    {movie.name}
                  </Text>
                  <View style={styles.ratingField}>
                    <Text style={styles.rating}>
                      {movies.find(m => m.movieId == movie.id).userRating}
                    </Text>
                    <Icon name="star" color="#FFF" size={12} />
                  </View>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.screenTitle}>
              You haven't added any movie yet
            </Text>
          )}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212E6',
    padding: 16,
  },
  screenTitle: {
    color: '#FFF',
    fontSize: 18,
    marginTop: 20,
    fontFamily: 'Roboto-Medium',
    marginBottom: 19,
  },
  moviesContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  card: {
    width: 165,
    height: 294,
    marginBottom: 16,
  },
  image: {
    width: 165,
    height: 264,
    resizeMode: 'cover',
  },
  description: {
    width: '100%',
    height: 30,
    backgroundColor: '#12121280',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 6,
  },
  title: {
    color: '#FFF',
    fontSize: 12,
    fontFamily: 'Roboto-Regular',
    width: '75%',
  },
  rating: {
    color: '#FFF',
    fontSize: 12,
    fontFamily: 'Roboto-Regular',
    marginRight: 5,
  },
  ratingField: {
    flexDirection: 'row',
  },
});

export default HomeScreen;
