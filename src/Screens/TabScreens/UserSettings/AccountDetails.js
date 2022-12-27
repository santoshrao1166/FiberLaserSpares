//import liraries
import React, {Component, useState, useEffect} from 'react';
import {
  View,
  Dimensions,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
const {width, height} = Dimensions.get('window');
import {useDispatch, useSelector} from 'react-redux';
import TextInputWithLabel from '../../../components/TextInputWithLabel';
import {addNavigationOject} from '../../../redux/actions/navigation';
import {showError, showSuccess} from '../../utils/helperFunction';
import {changePassword, resetPassword, updateCustomerData} from '../../../redux/actions/auth';
const addresses = [
  {
    id: 1,
    name: 'Mr. Raj N',
    address1: 'Plot no 12, flat no-101,',
    address2: 'Mira Co Op Ind Est Ltd, Mira Village, Mira Road ,kalyan nagar',
    city: 'Mumbai',
    code: '450022',
  },
];
// create a component
const AccountDetails = props => {
  const [loading, setLoading] = useState(false);
  const Address = useSelector(state => state.auth.AddressList);
  const dispatch = useDispatch();
  const accountData = useSelector(state => state.auth.userData);
  const [user, setUser] = useState({});
  const [showCodeBox, setShowCodeBox] = useState(false);

  useEffect(() => {
    dispatch(addNavigationOject(props.navigation));
  }, [props.navigation]);

  useEffect(() => {
    setUser({...accountData,code:'', password: '', confirmPassword: ''});
  }, []);

  const validate = async () => {
    setLoading(true);
    var emailId = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const {
      first_name,
      last_name,
      display_name,
      email,
      password,
      confirmPassword,code
    } = user;
    if (!(email.match(emailId) && email != '')) {
      showError('Email is Invalid');
      setLoading(false);
    } else if (password != '' && password?.length < 8) {
      showError("Password can't be empty and must be minimum of 8 characters");
      setLoading(false);
    } else if (confirmPassword != '' && confirmPassword?.length < 8) {
      showError(
        "Confirm Password can't be empty and must be minimum of 8 characters",
      );
      setLoading(false);
    } else if (confirmPassword != password) {
      showError('Password and Confirm Password Do not match');
      setLoading(false);
    }
    //   else{
    //     setLoading(false);
    //     console.log("else1");
    //     // updateCustomerData().then(()=>{

    //     // })
    //   }
    // }
    else {
      console.log('else');
      try {
        updateCustomerData(user).then(res => {
          if (res && password != '') {
            console.log(res?.email, 'ifresresres', email);
            try {
              // if(showCodeBox)
              // {
              //   changePassword({email: res?.email,
              //     code:code,new_password:password}).then(res => {
              //     console.log(res, 'change password');
              //     setLoading(false);
              //     setShowCodeBox(false);
              //   });
              // }
              // else{
                resetPassword(res?.email).then(res => {
                  console.log(res, 'without code password');
                  setLoading(false);
                  setShowCodeBox(true);
                });
              //}
            } catch (err) {
              console.log(err);
              setLoading(false);
            }
          } else {
            if(res?.email)
            {
              console.log(res?.email, 'elseresresres', email);
              setLoading(false);
              showSuccess('Updated');
            }
            else{
              showError(res?.message);
              setLoading(false)
            }
          }
        });
      } catch (err) {
        setLoading(false);
        console.log(err, 'err');
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <StatusBar backgroundColor="#FFE6E3"></StatusBar> */}
      <ScrollView
        style={styles.innerView}
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <ScrollView style={{flex: 1, paddingTop: 20}}>
          <Text
            style={{
              color: '#727272',
              alignItems: 'center',
              paddingBottom: 20,
              fontWeight: '500',
              fontSize: 18,
              paddingHorizontal: 10,
              justifyContent: 'center',
            }}>
            Personal Details
          </Text>
          <View style={{flex: 1, width: width, flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              <Text style={styles.textStyle}>First Name *</Text>
              <TextInputWithLabel
                placeHolder={'First Name'}
                // iconPath={require("../../assets/images/phoneIcon.png")}
                // iconName={"phone"}
                value={user?.first_name}
                onChangeText={text =>
                  setUser({...user, first_name: text})
                }></TextInputWithLabel>
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.textStyle}>Last Name *</Text>
              <TextInputWithLabel
                placeHolder={'Last Name'}
                // iconPath={require("../../assets/images/phoneIcon.png")}
                // iconName={"phone"}
                value={user.last_name}
                onChangeText={text =>
                  setUser({...user, last_name: text})
                }></TextInputWithLabel>
            </View>
          </View>

          {/* <Text style={styles.textStyle}>Display Name</Text>
          <TextInputWithLabel
            placeHolder={'Display Name'}
            // iconPath={require('../../assets/images/userIcon.png')}
            value={user.display_name}
            // iconName={"user"}
            onChangeText={text =>
              setUser({...user, display_name: text})
            }></TextInputWithLabel>

          <Text
            style={[
              styles.textStyle,
              {fontSize: 12, paddingVertical: 0, lineHeight: null},
            ]}>
            This will be how your name will be displayed in the account section
            and in reviews
          </Text> */}

          <Text style={styles.textStyle}>Email Address *</Text>
          <TextInputWithLabel
            placeHolder={'Example@gmail.com'}
            // iconPath={require('../../assets/images/userIcon.png')}
            value={user.email}
            // iconName={"user"}
            onChangeText={text =>
              setUser({...user, email: text})
            }></TextInputWithLabel>
          <Text
            style={{
              marginTop: 20,
              color: '#727272',
              alignItems: 'center',
              paddingBottom: 20,
              fontWeight: '500',
              fontSize: 18,
              paddingHorizontal: 10,
              justifyContent: 'center',
            }}>
            Password Changes
          </Text>
          {/* 
          <Text style={styles.textStyle}>
            Current password (leave blank to leave unchanged)
          </Text>
          <TextInputWithLabel
            isSecure
            placeHolder={'Current password (leave blank to leave unchanged)'}
            // iconPath={require('../../assets/images/userIcon.png')}
            value={user.password}
            // iconName={"user"}
            onChangeText={text =>
              setUser({...user, password: text})
            }></TextInputWithLabel> */}

          <Text style={styles.textStyle}>
            New password (leave blank to leave unchanged)
          </Text>
          <TextInputWithLabel
            placeHolder={'New password (leave blank to leave unchanged)'}
            isSecure
            // iconName={"mail"}
            // iconPath={require("../../assets/images/emailIcon.png")}
            value={user.password}
            onChangeText={text => setUser({...user, password: text})}
            // onChangeText={email => updateState({email})}
          ></TextInputWithLabel>
          <Text style={styles.textStyle}>Confirm new password</Text>
          <TextInputWithLabel
            placeHolder={'Confirm new password'}
            isSecure
            // iconName={"mail"}
            // iconPath={require("../../assets/images/emailIcon.png")}
            value={user.confirmPassword}
            onChangeText={text => setUser({...user, confirmPassword: text})}
            // onChangeText={email => updateState({email})}
          ></TextInputWithLabel>
          {showCodeBox && (
            <View>
              <Text style={styles.textStyle}>
                Enter code sent on your email.{' '}
              </Text>
              <TextInputWithLabel
                placeHolder={'Enter Code'}
                isSecure
                // iconName={"mail"}
                // iconPath={require("../../assets/images/emailIcon.png")}
                value={user.code}
                onChangeText={text => setUser({...user, code: text})}
                // onChangeText={email => updateState({email})}
              ></TextInputWithLabel>
            </View>
          )}
          <View
            style={{
              paddingVertical: 10,
              flexDirection: 'row',
              justifyContent: 'space-around',
              paddingBottom: 50,
            }}>
            <TouchableOpacity
              onPress={() => {
                if (!loading) validate();
              }}
              style={styles.buttonStyle}>
              <Text style={styles.buttonTextStyle}>Save Changes</Text>
              {loading && <ActivityIndicator />}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
  },
  innerView: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ffffff',

    // justifyContent: 'space-between',
    // alignItems:'center'
  },
  ontxt: {
    color: '#000000',
    // textAlign:"center"
    // fontFamily: "Poppins",
    fontStyle: 'normal',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 18,
  },
  subtxt: {
    color: '#727272',
    // textAlign:"center"
    // fontFamily: "Poppins",
    fontStyle: 'normal',
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 18,
  },
  textStyle1: {
    // paddingTop:height*0.02,
    color: '#777777',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
    fontFamily: 'poppins',
    lineHeight: 24,
    fontStyle: 'normal',
    paddingHorizontal: 70,
  },
  titleStyle: {
    // paddingTop:height*0.05,
    color: '#565656',
    fontSize: 23,
    fontWeight: '900',
    textAlign: 'center',
    fontFamily: 'poppins',
    lineHeight: 34,
    fontStyle: 'normal',
    paddingHorizontal: 20,
  },
  allCollView: {
    width: width,
    // paddingVertical: 30,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    // backgroundColor: 'rgba(0,0,0,0.05)',
  },
  logoStyle: {
    margin: 8,
    // flex: 1,
    width: width * 0.15,
    height: height * 0.08,
    alignSelf: 'center',
    justifyContent: 'flex-start',
  },
  titleStyle: {
    // paddingTop:height*0.05,
    color: '#565656',
    fontSize: 23,
    fontWeight: '900',
    textAlign: 'center',
    fontFamily: 'poppins',
    lineHeight: 34,
    fontStyle: 'normal',
    paddingHorizontal: 20,
  },
  textStyle: {
    paddingHorizontal: width * 0.02,
    fontSize: 15,
    fontWeight: '600',
    paddingVertical: 5,
    color: '#000000',
    fontFamily: 'poppins',
    lineHeight: 22,
    fontStyle: 'normal',
  },
  buttonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0112B0',
    height: height * 0.06,
    width: width * 0.95,
    alignSelf: 'center',
    marginTop: 10,
    marginHorizontal: 10,
    flexDirection: 'row',
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    fontFamily: 'poppins',
    paddingRight: 10,
    //   lineHeight: 28,
    fontStyle: 'normal',
  },
  btnContainer: {
    flexDirection: 'row',
    height: 30,
    width: width * 0.24,
    alignItems: 'center',
    backgroundColor: '#D02314',
    borderRadius: 10,
    // flex: 1,
  },
  proceedButton: {
    flexDirection: 'row',
    height: 30,
    width: width * 0.24,
    alignItems: 'center',
    backgroundColor: '#D02314',
    borderRadius: 10,
    // flex: 1,
  },
  qtyBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AccountDetails;
