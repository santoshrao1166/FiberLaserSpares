//import liraries
import React, {Component, useEffect} from 'react';
import {
  View,
  Dimensions,
  ImageBackground,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  Image,
  Text,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
const {width, height} = Dimensions.get('window');
import { setInitial } from '../../redux/actions/auth';
// create a component
const OnBoarding = props => {
  useEffect(() => {
    // setTimeout(function(){
    //   props.navigation.navigate('InitialScreen')
    // }, 2000);

    return () => {
      // Clean up the subscription
    };
  });
  return (
    <SafeAreaView style={styles.container}>
      {/* <StatusBar backgroundColor="#FFFFFF"></StatusBar> */}
      <View style={styles.innerView}>
        <ImageBackground
          style={styles.logoStyle}
          resizeMode="cover"
          source={require('../../assets/image/background.png')}>
          <View style={{flex: 1, justifyContent: 'flex-start'}}>
            <View style={{marginTop:'65%',marginBottom:'60%'}}>
              <Image
                style={{height: 90, width: '100%'}}
                resizeMode={'contain'}
                source={require('../../assets/image/FiberLaserSpares.png')}></Image>
            </View>
            <View style={{alignItems:'center'}}>
              <TouchableOpacity onPress={() => 
              setInitial(1)
                // props.navigation.navigate('Home')}
                } 
                style={{flexDirection: 'row',alignItems:'center',}}>
                <Text
                  style={{fontWeight: '400',paddingBottom:5, fontSize: 30, color: '#000000'}}>
                  Next
                </Text>
                <Icon
                  name="arrow-right"
                  style={{paddingLeft: 10}}
                  size={30}
                  color={'#565656'}
                />
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 24,
    backgroundColor: '#FFEEED',
  },
  innerView: {
    flex: 1,
    // alignItems:'center',
    // justifyContent:'center'
  },
  logoStyle: {
    flex: 1,
    // width: width * 0.7,
    // alignSelf: 'center',
    // justifyContent:'center'
  },
  CircleShape1: {
    width: 313,
    height: 313,
    borderRadius: 313 / 2,
    position: 'absolute',
    top: -80,
    left: 150,
    backgroundColor: 'rgba(253, 201, 0,0.25)',
  },
  CircleShape2: {
    width: 88,
    height: 88,
    borderRadius: 88 / 2,
    position: 'absolute',
    top: 140,
    left: 30,
    backgroundColor: 'rgba(208, 35, 20,0.25)',
  },
  CircleShape3: {
    width: 44,
    height: 44,
    borderRadius: 44 / 2,
    position: 'absolute',
    top: 220,
    left: 160,
    backgroundColor: 'rgba(253, 201, 0,0.25)',
  },
});

export default OnBoarding;
