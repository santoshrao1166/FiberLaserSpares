//import liraries
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
  Image,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
const {width, height} = Dimensions.get('window');
import {useDispatch, useSelector} from 'react-redux';
import {createGuestUser} from '../../redux/actions/auth';
// create a component
const ResetPassword = ({navigation}) => {
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        {/* <StatusBar backgroundColor="#F5F5F5"></StatusBar> */}

        <ImageBackground
          style={styles.innerView}
          resizeMode="cover"
          source={require('../../assets/image/background.png')}>
          <View style={{alignItems: 'center',justifyContent:'center',height:'20%'}}>
            <Image
              resizeMode="contain"
              style={styles.logoStyle}
              source={require('../../assets/image/FiberLaserSpares2.png')}
            />
          </View>
          <View style={{alignItems: 'center',justifyContent:'center',height:'20%'}}>
            <Image
              resizeMode="contain"
              style={styles.CheckStyle}
              source={require('../../assets/image/checkImage.png')}
            />
          </View>
          <View style={{alignItems: 'center', paddingVertical: '5%'}}>
            <Text style={[styles.titleStyle]}>
              Password reset email
            </Text>
            <Text style={[styles.titleStyle]}>
              has been sent.
            </Text>
          </View>
          <View style={{alignItems: 'center', paddingVertical: '5%'}}>
            <Text
              style={[
                styles.textStyle,
                {
                  color: '#000000',
                  textAlign: 'center',
                  fontSize: 14,
                  paddingHorizontal: '10%',
                },
              ]}>
              A password reset email has been sent to the email address on file
              for your account, but may take several minutes to show up in your
              inbox. Please wait at least 10 minutes before attempting another
              reset.{' '}
            </Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Login');
              }}
              style={[
                styles.buttonStyle,
                {backgroundColor: '#0112B0', borderColor: '#0112B0'},
              ]}>
              <Text
                style={[
                  styles.textStyle,
                  {color: '#FFFFFF', textAlign: 'center', fontSize: 16},
                ]}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
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
    width: '45%',
  },
  CheckStyle: {
    // flex: 1,
    width: '30%',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  titleStyle: {
    // paddingTop:height*0.05,
    color: '#000000',
    fontSize: 25,
    fontWeight: '700',
    textAlign: 'center',
    fontFamily: 'poppins',
    // lineHeight: 34,
    fontStyle: 'normal',
  },
  textStyle: {
    paddingLeft: 14,
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'left',
    fontFamily: 'poppins',
    lineHeight: 22,
    fontStyle: 'normal',
    color: '#000000',
  },
});

//make this component available to the app
export default ResetPassword;
