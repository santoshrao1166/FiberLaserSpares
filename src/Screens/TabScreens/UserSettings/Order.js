//import liraries
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';
import {addNavigationOject} from '../../../redux/actions/navigation';
import {ScrollView} from 'react-native-gesture-handler';
const Stack = createStackNavigator();
const {width, height} = Dimensions.get('window');

function Order(props) {
  const {width, height} = Dimensions.get('window');
  const order = props?.route?.params?.order;
  // console.log(order?.line_items[0],"order")
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addNavigationOject(props.navigation));
  }, [props.navigation]);

  const getSubTotal = () =>
  {
    let Subtotal = 0;
    order.line_items.map(
      (item, index) => (Subtotal += item?.price * item?.quantity),
    );
    return Subtotal;
  }
  
  return (
    <SafeAreaView style={styles.container}>
      {/* <StatusBar backgroundColor="#FFE6E3"></StatusBar> */}
      <ScrollView
        style={styles.innerView}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View style={{width: width, flex: 1, justifyContent: 'space-between'}}>
          <View>
            <View
              style={{
                width: width * 0.9,
                alignSelf: 'center',
              }}>
              <Text style={[styles.ontxt, {fontSize: 16, paddingTop: 10}]}>
                Your Order ID :
              </Text>
              <Text style={[styles.ontxt, {fontSize: 16, paddingTop: 10}]}>
                #{order.id}
              </Text>
            </View>

            <View
              style={{
                margin: 10,
                padding: 10,
                backgroundColor: '#F8F8F8',
                width: width * 0.9,
                alignSelf: 'center',
              }}>
              <View>
                <Text
                  style={[styles.ontxt, {fontSize: 16, paddingVertical: 10}]}>
                  Product
                </Text>
                {order?.line_items?.map((item, index) => (
                  <View key={index}>
                    <View
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
                        x {item.quantity}
                      </Text>
                      <Text
                        style={[
                          styles.ontxt,
                          {width: width * 0.2, textAlign: 'right'},
                        ]}>
                        ₹{item.total}
                      </Text>
                    </View>
                   { item?.meta_data?.[0]?.display_key == 'Size' && <Text
                      style={[styles.ontxt, {fontSize: 12, fontWeight: '400'}]}>
                      size : { item?.meta_data?.[0]?.display_value }
                    </Text>}
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

                  <Text style={styles.ontxt}>₹{parseFloat(getSubTotal()).toFixed(2)}</Text>
                </View>
                {order.tax_lines?.map((item,index)=>
                 <View
                 key={index}
                 style={{
                   flexDirection: 'row',
                   justifyContent: 'space-between',
                   paddingTop: 10,
                 }}>
                 <Text style={styles.ontxt}>{item.label} :</Text>

                 <Text style={styles.ontxt}>₹{item.tax_total}</Text>
               </View>
                )
               }
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingTop: 10,
                  }}>
                  <Text style={styles.ontxt}>Payment Method :</Text>

                  <Text style={styles.ontxt}>{order.payment_method_title}</Text>
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
                  <Text style={styles.ontxt}>Total :</Text>

                  <Text style={styles.ontxt}>₹{order.total}</Text>
                </View>
              </View>
            </View>
            <View
              style={{
                margin: 20,
                padding: 10,
                backgroundColor: '#F8F8F8',
                width: width * 0.9,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingTop: 10,
                }}>
                <Text style={[styles.ontxt, {fontSize: 16}]}>
                Billing Address
                </Text>
              </View>
              <Text style={[styles.ontxt, {paddingTop: 10}]}>
              {order?.billing?.company?`${order?.billing?.company}`:null}
              </Text>
              <Text style={[styles.ontxt, {paddingTop: 10}]}>
              {order?.billing?.first_name} {order?.billing?.last_name}
              </Text>
              <Text
                style={[
                  styles.ontxt,
                  {width: width * 0.9, fontWeight: '400', paddingTop: 10},
                ]}>
                  {order?.billing?.address_1}{"\n"}
                  {order?.billing?.address_2?`${order?.billing?.address_2}\n`:null}
                  {order?.billing?.city}{" "}{order?.billing?.postcode}{"\n"}
                  {order?.billing?.state}
              </Text>
              <Text
                style={[
                  styles.ontxt,
                  {width: width * 0.8, fontWeight: '400', paddingTop: 10},
                ]}>
                  {order?.billing?.email}
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
                {order?.billing?.phone?`Mo. : ${order?.billing?.phone}`:null}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => props.navigation.navigate('Home')}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#0112B0',
              height: height * 0.06,
              width: width * 0.9,
              alignSelf: 'center',
              marginTop: 10,
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
              CONTINUE SHOPPING
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

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

//make this component available to the app
export default Order;
