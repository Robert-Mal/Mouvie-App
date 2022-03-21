import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const TabBar = ({state, descriptors, navigation}) => {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({name: route.name, merge: true});
          }
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={styles.tab}>
            <Icon
              name={label.toLowerCase() + '-sharp'}
              color={isFocused ? '#ffffff' : '#999999'}
              size={22}
            />
            {isFocused && <Text style={styles.text}>{label}</Text>}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    height: 65,
    backgroundColor: '#121212',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tab: {
    display: 'flex',
    flexDirection: 'row',
  },
  text: {
    color: '#ffffff',
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    paddingTop: 2,
    paddingLeft: 10,
  },
});

export default TabBar;
