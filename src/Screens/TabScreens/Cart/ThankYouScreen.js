//import liraries
import React, {Component, useState, useEffect} from 'react';
import {
  View,
  Dimensions,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  SafeAreaView,BackHandler
} from 'react-native';
const {width, height} = Dimensions.get('window');
import {useDispatch, useSelector} from 'react-redux';
import {addNavigationOject} from '../../../redux/actions/navigation';

// create a component
const ThabkYouScreen = props => {
  // const cart = useSelector(state => state.cart.cart);
  const cart = props?.route?.params?.cart;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addNavigationOject(props.navigation));
  }, [props.navigation]);
  const backAction = () => {
    props.navigation.navigate("Home")
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* <StatusBar backgroundColor="#FFE6E3"></StatusBar> */}
      <ScrollView style={styles.innerView}>
        <View style={{flex: 1,width:width}}>
          <View style={{margin: 10, padding: 5}}>
            <Image style={{height:100,alignSelf:'center',marginVertical:5}} resizeMode={'contain'} source={require('../../../assets/image/check1.png')}></Image>
            <Text style={[styles.ontxt, {textAlign: 'center',fontWeight:'700', fontSize: 40,paddingTop:5}]}>
              Thank You!
            </Text>
            <Text style={[styles.ontxt, {fontSize: 20,fontWeight:'600', textAlign: 'center',color:'#002060',paddingTop: 5}]}>
              Your Order is Complete
            </Text>
            <Text
              style={[
                styles.ontxt,
                {fontWeight: '400',fontSize:12,width:width*0.8,alignSelf: 'center', textAlign: 'center', paddingTop: 5},
              ]}>
              Thank you for shopping with us. Your account has been charged and
              your transaction is successful. We will be processing your order
              soon.
            </Text>
            <Text style={[styles.ontxt, {textAlign: 'center', paddingTop: 5}]}>
              Order Number
            </Text>
            <Text
              style={[
                styles.ontxt,
                {fontWeight: '400', textAlign: 'center', paddingTop: 5},
              ]}>
              4454
            </Text>
            <Text style={[styles.ontxt, {textAlign: 'center', paddingTop: 5}]}>
              Order Date
            </Text>
            <Text
              style={[
                styles.ontxt,
                {fontWeight: '400', textAlign: 'center', paddingTop: 5},
              ]}>
              October 19, 2022
            </Text>
          </View>
          <View
                style={{
                  width: width * 0.9,
                  margin: 20,
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
                    <Text style={[{width: width * 0.1, color:'#000000', textAlign: 'center'}]}>
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

export default ThabkYouScreen;
