//import liraries
import React, {useState,useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ImageBackground
} from 'react-native';
const {width, height} = Dimensions.get('window');
import {useDispatch, useSelector} from 'react-redux';
import { setInitial } from '../../../redux/actions/auth';
// create a component
const LoginMessage = (props) => {

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
      <ImageBackground
        style={styles.innerView}
        resizeMode="cover"
        source={require('../../../assets/image/background.png')}>
     
   
        <View style={{alignItems: 'center'}}>
          <Image
            resizeMode="contain"
            style={styles.logoStyle}
            source={require('../../../assets/image/FiberLaserSpares.png')}
          />
          <Text style={[styles.titleStyle]}>
          Well Come to {"\n"}
Fiber Laser Spares
          </Text>
          <Text style={[styles.textStyle]}>
          Keep your data  safe !
          </Text>
        </View>
            <TouchableOpacity
                onPress={() => {setInitial(2)
                }}
                style={[styles.buttonStyle, {flexDirection:'row',alignItems:'center',backgroundColor: '#0112B0',borderColor:'#0112B0'}]}>
                <Text style={[styles.textStyle, {color: '#FFFFFF',textAlign:'center',paddingRight:10,fontSize:16}]}>
                  Please Login
                </Text>
            </TouchableOpacity>
      </ImageBackground>
      </SafeAreaView>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  innerView: {
    flex: 1,
    // justifyContent: 'space-evenly',
    paddingVertical: height * 0.02,
    justifyContent:'space-between',
    alignItems:'center'
  },
  buttonStyle: {
    height: 50,
    width: width * 0.9,
    backgroundColor: '#FFFFFF',
    borderColor: '#E5E5E5',
    borderWidth: 2,
    borderRadius: 0,
    // alignItems: 'center',
    justifyContent: 'center',
  },

  logoStyle: {
    // flex: 1,
    width: 130,
    marginBottom: -100
  },
  titleStyle: {
    // paddingTop:height*0.05,
    color: '#000000',
    fontSize: 18,
    paddingVertical:10,
    fontWeight: '700',
    textAlign: 'center',
    fontFamily: 'poppins',
    // lineHeight: 34,
    fontStyle: 'normal',
  },
  textStyle: {
    paddingLeft: 14,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'left',
    fontFamily: 'poppins',
    lineHeight: 22,
    fontStyle: 'normal',
    color: '#000000',
  },
});

//make this component available to the app
export default LoginMessage;
