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
  TextInput,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
const {width, height} = Dimensions.get('window');
import {useDispatch, useSelector} from 'react-redux';
import TextInputWithLabel from '../../../components/TextInputWithLabel';
import {addNavigationOject} from '../../../redux/actions/navigation';
import {addAddress, deleteAddress} from '../../../redux/actions/auth';
import {showError} from '../../utils/helperFunction';
import {states} from '../../../constants/contants';
import { updateCustomerAddress } from '../../../redux/actions/auth';
// create a component
const EditAddress = props => {
  const [refresh, setRefresh] = useState(true);
  const [editAdress, setEditAddress] = useState(props?.route?.params?.address);
  const [addressType, setaddressType] = useState(props?.route?.params?.addressType);
  const userData = useSelector(state => state.auth.userData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addNavigationOject(props.navigation));
  }, [props.navigation]);

  useEffect(() => {
    // setEditAddress(userData?.billing);
  }, [refresh]);

  const addNewAddress = () => {
    let valid = true;
    var phoneno = /^\d{10}$/;
    var emailId = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    const {
      first_name,
      last_name,
      company,
      message,
      phone,
      address_1,
      address_2,
      city,
      state,
      email,
      postcode,
    } = editAdress;
    if (first_name == '') {
      showError(`first name can't be empty`);
      valid = false;
    } else if (last_name == '') {
      showError(`last name can't be empty`);
      valid = false;
    } else if (address_1 == '') {
      showError(`Address can't be empty`);
      valid = false;
    } else if (city == '') {
      showError(`city name can't be empty`);
      valid = false;
    } else if (state == '') {
      showError(`Select state`);
      valid = false;
    }  else if (postcode == '' || postcode?.length != 6) {
      showError(`Zip code name can't be empty and should be of 6 digits`);
      valid = false;
    } else if (!(phone?.match(phoneno) && phone != '') && addressType != 'Shipping Address') {
      showError(`Phone Number is not valid`);
      valid = false;
    } else if (!(email?.match(emailId) && email != '') && addressType != 'Shipping Address') {
      showError(`Email is not valid`);
      valid = false;
    } else {
      let data = {
        first_name: first_name,
        last_name: last_name,
        company: company,
        address_1: address_1,
        address_2: address_2,
        city: city,
        state: state,
        country: 'India',
        postcode: postcode,
        email: email,
        phone: phone,
        message: message
      };
      updateCustomerAddress(data,(addressType=='Shipping Address')?true:false).then(() => {
        props.navigation.goBack();
        setRefresh(!refresh);
      });
      // addAddress(data,(addressType=='Shipping Address')?true:false).then(() => {
      //   props.navigation.goBack();
      //   setRefresh(!refresh);
      // });
    }
  };
  return (
    <SafeAreaView style={styles.container}>
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
            {addressType}
          </Text>
            <View style={{flex: 1, width: width, flexDirection: 'row'}}>
              <View style={{flex: 1}}>
                <Text style={styles.textStyle}>First Name *</Text>
                <TextInputWithLabel
                  placeHolder={'First Name'}
                  // iconPath={require("../../assets/images/phoneIcon.png")}
                  // iconName={"phone"}
                  value={editAdress?.first_name}
                  onChangeText={text =>
                    setEditAddress({...editAdress, first_name: text})
                  }></TextInputWithLabel>
              </View>
              <View style={{flex: 1}}>
                <Text style={styles.textStyle}>Last Name *</Text>
                <TextInputWithLabel
                  placeHolder={'Last Name'}
                  // iconPath={require("../../assets/images/phoneIcon.png")}
                  // iconName={"phone"}
                  value={editAdress?.last_name}
                  onChangeText={text =>
                    setEditAddress({...editAdress, last_name: text})
                  }></TextInputWithLabel>
              </View>
            </View>

            <Text style={styles.textStyle}>Company Name (optional)</Text>
            <TextInputWithLabel
              placeHolder={'Company Name'}
              // iconPath={require('../../assets/images/userIcon.png')}
              value={editAdress?.company}
              // iconName={"user"}
              onChangeText={text =>
                setEditAddress({...editAdress, company: text})
              }></TextInputWithLabel>
            <Text style={styles.textStyle}>Country / Region *</Text>
            <Text style={[styles.textStyle, {color: '#000000'}]}>India</Text>

            <Text style={styles.textStyle}>Street Address *</Text>
            <TextInputWithLabel
              placeHolder={'House number and street name'}
              // iconPath={require('../../assets/images/userIcon.png')}
              value={editAdress?.address_1}
              // iconName={"user"}
              onChangeText={text =>
                setEditAddress({...editAdress, address_1: text})
              }></TextInputWithLabel>
            <TextInputWithLabel
              placeHolder={'Apartment, suite, unit, etc. (optional)'}
              // iconPath={require('../../assets/images/userIcon.png')}
              value={editAdress?.address_2}
              // iconName={"user"}
              onChangeText={text =>
                setEditAddress({...editAdress, address_2: text})
              }></TextInputWithLabel>
            <Text style={styles.textStyle}>Town / City *</Text>
            <TextInputWithLabel
              placeHolder={'Town / City'}
              // iconPath={require('../../assets/images/userIcon.png')}
              value={editAdress?.city}
              // iconName={"user"}
              onChangeText={text =>
                setEditAddress({...editAdress, city: text})
              }></TextInputWithLabel>
            <Text style={[styles.textStyle, {paddingTop: 0}]}>State *</Text>
            <View
              style={{
                borderWidth: 1,
                borderRadius: 2,
                height: 40,
                marginVertical: 10,
                width: width * 0.95,
                backgroundColor: 'white',
                alignSelf: 'center',
                justifyContent: 'center',
              }}>
              <Picker
                selectedValue={editAdress?.state}
                style={{
                  height: 40,
                  color:'#000000'
                }}
                dropdownIconColor="#000000"
                // value={editAdress.state}
                onValueChange={(itemValue, itemIndex) => {
                  setEditAddress({
                    ...editAdress,
                    state: itemValue,
                  });
                }}>
                <Picker.Item key={'1'} label={'Select'} value={''} />

                {states?.map((item, index) => (
                  <Picker.Item
                    key={index}
                    label={item?.name}
                    value={item?.name}
                  />
                ))}
              </Picker>
            </View>

            <Text style={styles.textStyle}>Pincode *</Text>
            <TextInputWithLabel
              placeHolder={'Pincode'}
              // iconName={"mail"}
              // iconPath={require("../../assets/images/emailIcon.png")}
              value={editAdress?.postcode}
              onChangeText={text =>
                setEditAddress({...editAdress, postcode: text})
              }
              // onChangeText={email => updateState({email})}
            ></TextInputWithLabel>
            {
              addressType!='Shipping Address' &&
              <View>
      <Text style={styles.textStyle}>Mobile Number *</Text>
            <TextInputWithLabel
              placeHolder={'Mobile Number'}
              // iconName={"mail"}
              // iconPath={require("../../assets/images/emailIcon.png")}
              value={editAdress?.phone}
              onChangeText={text =>
                setEditAddress({...editAdress, phone: text})
              }
              // onChangeText={email => updateState({email})}
            ></TextInputWithLabel>
                        <Text style={styles.textStyle}>Email *</Text>
            <TextInputWithLabel
              placeHolder={'Email'}
              
              // iconName={"mail"}
              // iconPath={require("../../assets/images/emailIcon.png")}
              value={editAdress?.email}
              onChangeText={text =>
                setEditAddress({...editAdress, email: text})
              }
              // onChangeText={email => updateState({email})}
            ></TextInputWithLabel>
            {/* <Text style={styles.textStyle}>Order notes (optional)</Text>

            <TextInputWithLabel
              style={{height: 300}}
              placeHolder={'Notes about your order, e.g. special notes for delivery.'}
              // iconPath={require('../../assets/images/userIcon.png')}
              value={editAdress?.message}
              // iconName={"user"}
              onChangeText={text =>
                setEditAddress({...editAdress, message: text})
              }></TextInputWithLabel> */}
              </View>
            }
      
            <View
              style={{
                paddingVertical: 10,
                flexDirection: 'row',
                justifyContent: 'space-around',
                paddingBottom: 50,
              }}>
              <TouchableOpacity
                onPress={() => props.navigation.goBack()}
                style={styles.buttonStyle}>
                <Text style={styles.buttonTextStyle}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  addNewAddress();
                }}
                style={styles.buttonStyle}>
                <Text style={styles.buttonTextStyle}>Save Changes</Text>
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
    backgroundColor: '#FFFFFF',
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

  textStyle: {
    paddingHorizontal: width * 0.02,
    fontSize: 17,
    fontWeight: '600',
    paddingVertical: 5,
    // textAlign: 'left',
    fontFamily: 'poppins',
    lineHeight: 22,
    fontStyle: 'normal',
    color:'#000000'
  },
  buttonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0112B0',
    height: height * 0.06,
    width: width * 0.4,
    alignSelf: 'center',
    marginTop: 10,
    marginHorizontal: 10,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    fontFamily: 'poppins',
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
});

export default EditAddress;
