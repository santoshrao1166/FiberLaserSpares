//import liraries
import React, {useState} from 'react';
import { ActivityIndicator } from 'react-native';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
  Image,
  SafeAreaView,
  ImageBackground,KeyboardAvoidingView,ScrollView
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
const {width, height} = Dimensions.get('window');
import {useDispatch, useSelector} from 'react-redux';
import TextInputWithLabel from '../../components/TextInputWithLabel';
import { registerUser } from '../../redux/actions/auth';
import { showError,showSuccess } from '../utils/helperFunction';
import { setInitial } from '../../redux/actions/auth';
// create a component
const Signup = ({navigation}) => {
  const dispatch = useDispatch();
  const [signupData, setSignupData] = useState({display_name:'', email: '', password: ''});
  const [loading, setLoading] = useState(false);

  const validate = async () => {
    setLoading(true);
    // var phoneno = /^\d{10}$/;
    var emailId = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      const { display_name,email, password } = signupData;
      if (display_name == "") {
        showError("Name Can't be empty");
        setLoading(false);

      } else if (!(email.match(emailId) && email != "")) {
        showError("Password can't be empty");
        setLoading(false);

      }else if (password == "") {
        showError("Password can't be empty");
        setLoading(false);

      } else {
        try {
          registerUser(signupData).then(res => {
            // console.log(res,"signup")
            if (res.success) {
              setInitial(1);
            }
            setLoading(false);
          });
        }
        catch(err){
          setLoading(false);
          console.log(err,"err")
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
             <KeyboardAvoidingView style={{flex:1}}>
        <ScrollView style={{flex:1}}>
          <View style={{alignItems: 'center'}}>
            <Image
              resizeMode="contain"
              style={styles.logoStyle}
              source={require('../../assets/image/FiberLaserSpares2.png')}
            />
            <Text style={[styles.titleStyle,{marginTop:-20}]}>Create Your</Text>
            <Text style={[styles.titleStyle]}>
             Account
            </Text>
            <View style={{paddingTop: 20, width: width * 0.95}}>
            <TextInputWithLabel
              placeHolder={'name'}
              height={50}
              // icondisplay_name={"mail"}
              // iconPath={require("../../assets/images/emailIcon.png")}
              value={signupData?.display_name}
              onChangeText={text =>
                setSignupData({...signupData, display_name: text})
              }></TextInputWithLabel>
          </View>
            <View style={{width: width * 0.95}}>
            <TextInputWithLabel
              placeHolder={'Email Address'}
              height={50}
              // iconPath={require("../../assets/images/emailIcon.png")}
              value={signupData?.email}
              onChangeText={text =>
                setSignupData({...signupData, email: text})
              }></TextInputWithLabel>
          </View>
          <View style={{paddingBottom: 20, width: width * 0.95}}>
            <TextInputWithLabel
              placeHolder={'Password'}
              isSecure
              height={50}
              // icondisplay_name={"mail"}
              // iconPath={require("../../assets/images/emailIcon.png")}
              value={signupData?.password}
              onChangeText={text =>
                setSignupData({...signupData, password: text})
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
                  Register
                </Text>
                {loading && <ActivityIndicator/>}
              </TouchableOpacity>
            </View>
          </View>
          <View style={{alignItems: 'center', paddingVertical: height * 0.04}}>
            <View
              style={{
                flexDirection: 'row',
                textAlign: 'center',
                justifyContent: 'center',
                paddingVertical: 10,
              }}>
              <Text
                style={[styles.textStyle, {color: '#000000'}]}>
                Do you have an account?
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Login', {phone: false});
                }}>
                <Text
                  style={[styles.textStyle, {color: '#0112B0',paddingLeft:5}]}>Login Now
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
export default Signup;
