//import liraries
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  SafeAreaView,
  ImageBackground,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
const {width, height} = Dimensions.get('window');
import {useDispatch, useSelector} from 'react-redux';
import {showError} from '../utils/helperFunction';
import {resetPassword} from '../../redux/actions/auth';
import TextInputWithLabel from '../../components/TextInputWithLabel'; // create a component
const ForgotPassword = ({navigation}) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const validate = async () => {
    setLoading(true);
    // var phoneno = /^\d{10}$/;
    var emailId = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (!(email.match(emailId) && email != '')) {
      showError('Enter Valid Email Address');
      setLoading(false);
    } else {
      try {
        resetPassword(email).then(res => {
          if (res.success) {
            setLoading(false);
            // setInitial(1);
            navigation.navigate('PasswordReset');
          }
          setLoading(false);
        });
      } catch (err) {
        setLoading(false);
        showError('Something Went Wrong');
      }
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
          <KeyboardAvoidingView style={{flex: 1}}>
            <ScrollView style={{flex: 1}}>
              <View style={{alignItems: 'center'}}>
                <Image
                  resizeMode="contain"
                  style={styles.logoStyle}
                  source={require('../../assets/image/FiberLaserSpares2.png')}
                />
                <Text style={[styles.titleStyle, {marginTop: -20}]}>
                  Create Your
                </Text>
                <Text style={[styles.titleStyle]}>Account</Text>
                <View style={{paddingTop: 20, width: width * 0.95}}>
                  <TextInputWithLabel
                    placeHolder={'Email Address'}
                    height={50}
                    // iconPath={require("../../assets/images/emailIcon.png")}
                    value={email}
                    onChangeText={text => setEmail(text)}></TextInputWithLabel>
                </View>

                <View>
                  <TouchableOpacity
                    onPress={() => {
                      if (!loading) validate();
                    }}
                    style={[
                      styles.buttonStyle,
                      {
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: '#0112B0',
                        borderColor: '#0112B0',
                      },
                    ]}>
                    <Text
                      style={[
                        styles.textStyle,
                        {
                          color: '#FFFFFF',
                          textAlign: 'center',
                          paddingRight: 10,
                          fontSize: 16,
                        },
                      ]}>
                      Reset Password
                    </Text>
                    {loading && <ActivityIndicator />}
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={{alignItems: 'center', paddingVertical: height * 0.04}}>
                <View style={{paddingTop: 30}}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('Login');
                    }}>
                    <Text
                      style={[
                        styles.textStyle,
                        {color: '#0112B0', textAlign: 'center', fontSize: 16},
                      ]}>
                      Click here to login
                    </Text>
                  </TouchableOpacity>
                </View>
                <View>
                  <Text
                    style={[
                      styles.textStyle,
                      {
                        color: '#000000',
                        textAlign: 'center',
                        fontSize: 14,
                        paddingHorizontal: '10%',
                        paddingTop: 45,
                      },
                    ]}>
                    Lost your password? Please enter your username or email
                    address. You will receive a link to create a new password
                    via Email.
                  </Text>
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
export default ForgotPassword;
