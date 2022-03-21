import React, {useState} from 'react';
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import Header from '../components/Header';

const SearchScreen = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [movies, setMovies] = useState([]);
  const [showIndicator, setShowIndicator] = useState(false);

  const searchMovies = async () => {
    setShowIndicator(true);
    await fetch('https://api.tvmaze.com/search/shows?q=' + search)
      .then(response => response.json())
      .then(data => setMovies(data))
      .then(() => setShowIndicator(false))
      .catch(error => console.log(error));
  };

  const getYear = movie => {
    if (!movie.premiered) {
      return '';
    }
    const premieredYear = movie.premiered.slice(0, 4);
    const endedYear = movie.ended && movie.ended.slice(0, 4);
    if (endedYear === null) {
      return '(' + premieredYear + '- )';
    } else if (premieredYear === endedYear) {
      return '(' + premieredYear + ')';
    } else {
      return '(' + premieredYear + '-' + endedYear + ')';
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.topSection}>
        <Header navigation={navigation} />
        <View style={styles.searchField}>
          <TextInput
            style={styles.searchText}
            value={search}
            onChangeText={setSearch}
            placeholder="Search"
            placeholderTextColor="#AAAAAA"
          />
          <Icon
            name="search-sharp"
            size={22}
            color="#AAAAAA"
            onPress={() => searchMovies()}
          />
        </View>
      </View>
      {showIndicator ? (
        <ActivityIndicator size="large" color="#FFF" />
      ) : (
        <ScrollView>
          {movies.length
            ? movies.map(movie => {
                return (
                  <TouchableOpacity
                    key={movie.show.id}
                    style={styles.card}
                    onPress={() =>
                      navigation.navigate('Details', {movieId: movie.show.id})
                    }>
                    {movie.show.image ? (
                      <Image
                        style={styles.image}
                        source={{
                          uri: `${movie.show.image.original}`,
                        }}
                      />
                    ) : (
                      <View style={styles.noImage}>
                        <Icon name="sad-outline" color="#FFF" size={45} />
                        <Text style={styles.title}>No Image</Text>
                      </View>
                    )}
                    <View style={styles.movieDetails}>
                      <Text style={styles.title} numberOfLines={1}>
                        {movie.show.name} {getYear(movie.show)}
                      </Text>
                      {movie.show.summary ? (
                        <Text style={styles.summary} numberOfLines={6}>
                          {movie.show.summary.replace(
                            /(<p>|<b>|<i>|<\/p>|<\/b>|<\/i>)/g,
                            '',
                          )}
                        </Text>
                      ) : null}
                      <View style={styles.movieDetailsBottomSection}>
                        <Text style={styles.genres}>
                          {movie.show.genres.join(', ')}
                        </Text>
                        <Text style={styles.rating}>
                          {movie.show.rating.average
                            ? movie.show.rating.average + ' '
                            : '- '}
                          <Icon name="star" color="#FFF" size={17} />
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })
            : null}
        </ScrollView>
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212E6',
  },
  topSection: {
    padding: 16,
  },
  searchField: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#444444',
    width: '100%',
    height: 50,
    marginTop: 20,
    borderRadius: 25,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  searchText: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
  },
  card: {
    width: '100%',
    height: 175,
    flexDirection: 'row',
    marginBottom: 20,
  },
  image: {
    width: 125,
    height: 175,
    resizeMode: 'cover',
  },
  noImage: {
    width: 125,
    height: 175,
    backgoundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  movieDetails: {
    flexDirection: 'column',
    width: '69%',
    height: 175,
    backgroundColor: '#12121280',
    paddingHorizontal: 10,
    paddingTop: 12,
    paddingBottom: 3,
  },
  title: {
    color: '#FFF',
    fontFamily: 'Roboto-Regular',
    fontSize: 18,
    marginBottom: 12,
  },
  summary: {
    color: '#FFF',
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
  },
  movieDetailsBottomSection: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  genres: {
    color: '#FFF',
    fontFamily: 'Roboto-Regular',
    fontSize: 10,
  },
  rating: {
    color: '#FFF',
    fontFamily: 'Roboto-Regular',
    fontSize: 18,
  },
});

export default SearchScreen;
