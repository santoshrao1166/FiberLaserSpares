//import liraries
import React, {useState,useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
  Image,
  SafeAreaView,
  ImageBackground,ActivityIndicator,KeyboardAvoidingView
} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
const {width, height} = Dimensions.get('window');
import {useDispatch, useSelector} from 'react-redux';
import TextInputWithLabel from '../../components/TextInputWithLabel';
import {authUser} from '../../redux/actions/auth';
import {setInitial} from '../../redux/actions/auth';
import Icon from 'react-native-vector-icons/Feather';
import { showError } from '../utils/helperFunction';
// create a component
const Login = ({navigation}) => {
  const dispatch = useDispatch();
  const [loginData, setLoginData] = useState({email: '', password: ''});
  const [loading, setLoading] = useState(false);

  const validate = async () => {
    setLoading(true);
    // var phoneno = /^\d{10}$/;
    var emailId = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      const { email, password } = loginData;
      if (!(email.match(emailId) && email != "")) {
        showError("Enter Valid Email Address");
        setLoading(false);
      } else if (password == "") {
        showError("Password can't be empty");
        setLoading(false);
      } else {
        authUser(loginData).then(res => {
          if (res.success) {
            setLoading(false);
            setInitial(1);
          }
          setLoading(false);
        });
      }
  };
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
      {/* <StatusBar backgroundColor="#F5F5F5"></StatusBar> */}
      <ImageBackground
        style={styles.innerView}
        resizeMode="cover"
        source={require('../../assets/image/background.png')}>
        <KeyboardAvoidingView style={{flex:1}}>
        <ScrollView style={{flex:1}}>
        <TouchableOpacity
          onPress={() => setInitial(1)}
          style={{
            paddingHorizontal: 10,
            flexDirection: 'row',
            alignItems: 'center',
            // width:width*0.35,
            // marginLeft:10,
            // height:40,
            // borderRadius:5,
            // elevation:10,
            // backgroundColor:'#FFFFFF'
          }}>
          <Icon color="#0112B0" name="chevron-left" size={30}></Icon>
          <Text
            style={[
              styles.textStyle,
              {
                color: '#0112B0',
                paddingLeft: 0,
                textAlign: 'center',
                fontSize: 16,
              },
            ]}>
            Go To Dashboard
          </Text>
        </TouchableOpacity>
        <View style={{alignItems: 'center'}}>
          <Image
            resizeMode="contain"
            style={styles.logoStyle}
            source={require('../../assets/image/FiberLaserSpares2.png')}
          />
          <Text style={[styles.titleStyle]}>
            Login to your
          </Text>
          <Text style={[styles.titleStyle]}>
             Account
          </Text>
          <View style={{paddingTop: 20, width: width * 0.95}}>
            <TextInputWithLabel
              placeHolder={'Email Address'}
              height={50}
              // iconPath={require("../../assets/images/emailIcon.png")}
              value={loginData?.email}
              onChangeText={text =>
                setLoginData({...loginData, email: text})
              }></TextInputWithLabel>
          </View>
          <View style={{paddingBottom: 20, width: width * 0.95}}>
            <TextInputWithLabel
              placeHolder={'Password'}
              isSecure
              height={50}
              // iconName={"mail"}
              // iconPath={require("../../assets/images/emailIcon.png")}
              value={loginData?.password}
              onChangeText={text =>
                setLoginData({...loginData, password: text})
              }></TextInputWithLabel>
          </View>
          <View>
            
            <TouchableOpacity
                onPress={() => {
                  if(!loading)
                  validate();
                }}
                style={[styles.buttonStyle, {flexDirection:'row',alignItems:'center',backgroundColor: '#0112B0',borderColor:'#0112B0'}]}>
                <Text style={[styles.textStyle, {color: '#FFFFFF',textAlign:'center',paddingRight:10,fontSize:16}]}>
                  Login
                </Text>
                {loading && <ActivityIndicator/>}
              </TouchableOpacity>
          </View>
        </View>

        <View style={{alignItems: 'center', paddingVertical: height * 0.04}}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ForgotPassword', {phone: false});
            }}>
            <Text style={[styles.textStyle, {paddingBottom: 10}]}>
              Forgot Password ?
            </Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              textAlign: 'center',
              justifyContent: 'center',
              paddingVertical: 10,
            }}>
            <Text style={[styles.textStyle, {color: '#000000'}]}>
              Do you have an account?
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Signup', {phone: false});
              }}>
              <Text
                style={[styles.textStyle, {color: '#0112B0', paddingLeft: 5}]}>
                Register Now
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        </ScrollView>
        </KeyboardAvoidingView>
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
    marginVertical: -20
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
    fontSize: 32,
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
export default Login;
