//import liraries
import React, {Component} from 'react';
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

// create a component
const CommonButton = ({title, onPress, isLoading, ButtonSize }) => {
  if(ButtonSize=='small')
  {
    return (
        <TouchableOpacity style={styles.smallButtonStyle} onPress={onPress}>
            <Text style={styles.buttonTextStyle}>{title}</Text>
        </TouchableOpacity>
      );
  }
  return (
    <TouchableOpacity style={styles.buttonStyle} onPress={onPress}>
      {!!isLoading ? (
        <ActivityIndicator size="large" color="white" />
      ) : (
        <Text style={styles.buttonTextStyle}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
  
smallButtonStyle: {
    height: 40,
    width:'40%',
    margin: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#000000',
  },
  buttonStyle: {
    height: 40,
    margin: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#000000',
  },
  buttonTextStyle: {
    color: '#ffffff',
    alignSelf: 'center',
  },
});

//make this component available to the app
export default CommonButton;





