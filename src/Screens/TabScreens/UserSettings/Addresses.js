//import liraries
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {addNavigationOject} from '../../../redux/actions/navigation';
import {ScrollView} from 'react-native-gesture-handler';

const {width, height} = Dimensions.get('window');

function Addresses(props) {
  const userData = useSelector(state => state.auth.userData);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(addNavigationOject(props.navigation));
  }, [props.navigation]);

  return (
    <ScrollView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <View>
        <View
          style={{
            marginTop: 20,
            marginHorizontal: 10,
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderColor: '#CACACA',
            borderWidth: 1,
            backgroundColor: '#FFFFFF',
          }}>
          <View
            style={{
              width: width * 0.8,
              flexDirection: 'row',
              justifyContent: 'space-between',
              // paddingTop: 5,
            }}>
            <Text style={[styles.ontxt, {fontSize: 16}]}>Shipping Address</Text>
            <TouchableOpacity
              onPress={() => {
                // seteditAddress(userData?.shipping);
                // setaddressType('Shipping Address');
                // setShowAddressScreen(true);
                props.navigation.navigate('EditAddress', {
                  address: userData?.shipping,
                  addressType: 'Shipping Address',
                });
              }}>
              <Text style={[styles.ontxt, {color: '#1A7182', fontSize: 16}]}>
                {userData?.shipping?.first_name == '' ? 'Add' : 'Edit'}
              </Text>
            </TouchableOpacity>
          </View>
          {userData?.shipping?.first_name != '' && (
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingTop: 10,
                }}>
                <Text style={[styles.ontxt, {flex: 1}]}>Name :</Text>
                <Text
                  style={[
                    styles.ontxt,
                    {flex: 3, fontWeight: '400', color: '#727272'},
                  ]}>
                  {userData?.shipping?.first_name}{' '}
                  {userData?.shipping?.last_name}
                </Text>
              </View>
              {userData?.shipping?.email && <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingTop: 10,
                }}>
                <Text style={[styles.ontxt, {flex: 1}]}>Email :</Text>
                <Text
                  style={[
                    styles.ontxt,
                    {flex: 3, fontWeight: '400', color: '#727272'},
                  ]}>
                  {userData?.shipping?.email}
                </Text>
              </View>}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingTop: 10,
                }}>
                <Text style={[styles.ontxt, {flex: 1}]}>Address :</Text>
                <Text
                  style={[
                    styles.ontxt,
                    {flex: 3, fontWeight: '400', color: '#727272'},
                  ]}>
                  {userData?.shipping?.address_1 + ','}
                  {userData?.shipping?.address_2
                    ? userData?.shipping?.address_2 + ','
                    : null}
                  {userData?.shipping?.city + ','}
                  {userData?.shipping?.state + ','}
                  {userData?.shipping?.country + ','}
                  {userData?.shipping?.postcode}
                </Text>
              </View>
            </View>
          )}
        </View>
        <View
          style={{
            marginTop: 20,
            marginHorizontal: 10,
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderColor: '#CACACA',
            borderWidth: 1,
            backgroundColor: '#FFFFFF',
          }}>
          <View
            style={{
              width: width * 0.8,
              flexDirection: 'row',
              justifyContent: 'space-between',
              // paddingTop: 10,
            }}>
            <Text style={[styles.ontxt, {fontSize: 16}]}>Billing Address</Text>
            <TouchableOpacity
              onPress={() => {
                // seteditAddress(userData?.billing);
                // setaddressType('Billing Address');
                // setShowAddressScreen(true);
                props.navigation.navigate('EditAddress', {
                  address: {...userData?.billing,email : userData.email},
                  addressType: 'Billing Address',
                });
              }}>
              <Text style={[styles.ontxt, {color: '#1A7182', fontSize: 16}]}>
              {userData?.billing?.first_name == '' ? 'Add' : 'Edit'}
              </Text>
            </TouchableOpacity>
          </View>
       { userData?.billing?.first_name != '' && 
        <View>
             <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingTop: 10,
            }}>
            <Text style={[styles.ontxt, {flex: 1}]}>Name :</Text>
            <Text
              style={[
                styles.ontxt,
                {flex: 3, fontWeight: '400', color: '#727272'},
              ]}>
              {userData?.billing?.first_name} {userData?.billing?.last_name}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingTop: 10,
            }}>
            <Text style={[styles.ontxt, {flex: 1}]}>Email :</Text>
            <Text
              style={[
                styles.ontxt,
                {flex: 3, fontWeight: '400', color: '#727272'},
              ]}>
              {userData?.billing?.email}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingTop: 10,
            }}>
            <Text style={[styles.ontxt, {flex: 1}]}>Address :</Text>
            <Text
              style={[
                styles.ontxt,
                {flex: 3, fontWeight: '400', color: '#727272'},
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
          </View>
        </View>
       }
        </View>
      </View>
    </ScrollView>
  );
}

// create a component

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
  text: {
    fontStyle: 'normal',
    fontSize: 14,
    fontWeight: '500',
    color: '#727272',
  },
  ontxt: {
    color: '#000000',
    // textAlign:"center"
    // fontFamily: "Poppins",
    fontStyle: 'normal',
    fontSize: 14,
    fontWeight: '500',
  },
  textStyle: {
    paddingHorizontal: width * 0.02,
    fontSize: 17,
    fontWeight: '600',
    paddingVertical: 5,
    color: '#000000',
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

//make this component available to the app
export default Addresses;
