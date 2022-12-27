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
const {width, height} = Dimensions.get('window');
import {useDispatch, useSelector} from 'react-redux';
import {addNavigationOject} from '../../../redux/actions/navigation';
import { showError } from '../../utils/helperFunction';

// create a component
const DeliveryAddress = props => {
  const cart = useSelector(state => state.cart.cart);
  const userData = useSelector(state => state.auth.userData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addNavigationOject(props.navigation));
  }, [props.navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.innerView}
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <ScrollView
            style={styles.innerView}
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: 'space-between',
            }}>
            <View>
              <View
                style={{
                  width: width * 0.9,
                  padding: 10,
                  marginVertical: 10,
                  alignSelf: 'center',
                  backgroundColor: '#F5F5F5',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    // alignItems:'center',
                    // paddingTop: 10,
                  }}>
                  <Text style={[styles.ontxt, {fontSize: 16}]}>
                    Billing Address
                  </Text>
                  <TouchableOpacity onPress={() => 
                  props.navigation.navigate('EditAddress',{
                    address: {...userData?.billing,email : userData.email},
                    addressType : 'Billing Address'
                  })
                  }
                  // setShowAddressScreen(true)}
                  >
                    <Text
                      style={[styles.ontxt, {color: '#5261F6', fontSize: 16}]}>
              {userData?.billing?.first_name == '' ? 'Add' : 'Edit'}
                    </Text>
                  </TouchableOpacity>
                </View>
                {userData?.billing?.first_name != '' && <View>
                <Text style={[styles.ontxt, {paddingTop: 10}]}>
                  {userData?.billing?.first_name} {userData?.billing?.last_name}
                </Text>
                <Text
                  style={[
                    styles.ontxt,
                    {width: width * 0.8, fontWeight: '400', paddingTop: 10},
                  ]}>
                  {userData?.billing?.address_1 + ','}
                  {userData?.billing?.address_2
                    ? userData?.billing?.address_2 + ','
                    : null}
                  {userData?.billing?.city + ','}
                  {userData?.billing?.state + ','}
                  {userData?.billing?.country + ','}
                  {userData?.billing?.postcode}
                </Text>
                <Text
                  style={[
                    styles.ontxt,
                    {width: width * 0.8, fontWeight: '400', paddingTop: 10},
                  ]}>
                  {userData?.billing?.email}
                </Text>
                <Text
                  style={[
                    styles.ontxt,
                    {
                      width: width * 0.8,
                      fontWeight: '400',
                      paddingVertical: 10,
                    },
                  ]}>
                  Mo. : {userData?.billing?.phone}
                </Text>
                </View>}
              </View>

              <View
                style={{
                  width: width * 0.9,
                  padding: 10,
                  alignSelf: 'center',
                  backgroundColor: '#F5F5F5',
                }}>
                {cart?.items?.map((item, index) => (
                  <View
                    key={index}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingTop: 10,
                    }}>
                    <Text style={[styles.ontxt, {width: width * 0.5}]}>
                      {item?.name}
                    </Text>
                    <Text
                      style={[
                        {
                          width: width * 0.1,
                          color: '#000000',
                          textAlign: 'center',
                        },
                      ]}>
                      x {item?.quantity}
                    </Text>
                    <Text
                      style={[
                        styles.ontxt,
                        {width: width * 0.2, textAlign: 'right'},
                      ]}>
                      ₹
                      {parseFloat(item?.price * item?.quantity).toFixed(2)}
                    </Text>
                  </View>
                ))}
                <View
                  style={{
                    height: 1,
                    backgroundColor: 'lightgrey',
                    marginTop: 10,
                  }}
                />

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingTop: 10,
                  }}>
                  <Text style={styles.ontxt}>Subtotal</Text>

                  <Text style={styles.ontxt}>₹{cart?.subtotal.toFixed(2)}</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingTop: 10,
                  }}>
                  <Text style={styles.ontxt}>9% CGST</Text>

                  <Text style={styles.ontxt}>₹{cart?.cgst?.toFixed(2)}</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingTop: 10,
                  }}>
                  <Text style={styles.ontxt}>9% SGST</Text>

                  <Text style={styles.ontxt}>₹{cart?.sgst?.toFixed(2)}</Text>
                </View>
                <View
                  style={{
                    height: 1,
                    backgroundColor: 'lightgrey',
                    marginTop: 10,
                  }}
                />

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingTop: 10,
                  }}>
                  <Text style={styles.ontxt}>Total</Text>

                  <Text style={styles.ontxt}>₹{cart?.total?.toFixed(2)}</Text>
                </View>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => 
                {
                  if(userData?.billing?.first_name == '')
                  showError('Please Add Billing Address');
                  else {
                    props.navigation.navigate('PaymentOptions')
                  }
                }
            }
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#0112B0',
                height: height * 0.06,
                width: width * 0.9,
                alignSelf: 'center',
                marginVertical: 20,
              }}>
              <Text
                style={{
                  color: '#FFFFFF',
                  fontSize: 16,
                  fontWeight: '500',
                  textAlign: 'center',
                  fontFamily: 'poppins',

                  //   lineHeight: 28,
                  fontStyle: 'normal',
                }}>
                PROCEED TO PAYMENT
              </Text>
            </TouchableOpacity>
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

export default DeliveryAddress;
