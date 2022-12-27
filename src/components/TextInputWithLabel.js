//import liraries
import React, {Component} from 'react';
import {View, Image, Dimensions, StyleSheet, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
const {width, height} = Dimensions.get('window');

// create a component
const TextInputWithLabel = ({
  label,
  value,
  placeHolder,
  isSecure,
  onChangeText,
  props,
  iconPath,
  height,iconName
}) => {
  return (
    <View style={[styles.SectionStyle,{  height:(height)? height : 40   }]}>
      {/* <Image resizeMode="contain" style={styles.ImageStyle} source={iconPath} /> */}
      {iconName && <Icon name={iconName} size={26} style={styles.ImageStyle} />}
      <TextInput
        value={value}
        placeholderTextColor='grey'
        secureTextEntry={isSecure}
        placeholder={placeHolder}
        onChangeText={onChangeText}
        style={styles.inputStyle}
        textStyle={styles.textStyle}
        {...props}></TextInput>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  inputStyle: {
    flex: 1,
    fontSize: 14,
    color: '#000000',
    borderColor: '#000000',
    paddingLeft:10
  },
  textStyle: {
    color: '#000000',
    fontSize: 25,
  },
  logoStyle: {},
  SectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'lightgrey',
    margin: 10,
  },
  ImageStyle: {
    // padding: 8,
    margin: 10,
    height: 25,
    width: 25,
   // resizeMode: 'contain',
    alignItems: 'center',
    color:'#D02314'
  },
});

//make this component available to the app
export default TextInputWithLabel;
