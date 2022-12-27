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
import {addNavigationOject} from '../../../redux/actions/navigation';
import IconI from 'react-native-vector-icons/Ionicons';
import {showError, showSuccess} from '../../utils/helperFunction';
import {
  createOrder,
  generateRazorPayOrderKey,emptyCart
} from '../../../redux/actions/cart';
import RazorpayCheckout from 'react-native-razorpay';

// create a component
const PaymentOptions = props => {
  const cart = useSelector(state => state.cart.cart);
  const userData = useSelector(state => state.auth.userData);
  const [cod, setCod] = useState(true);
  const [tac, setTac] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addNavigationOject(props.navigation));
  }, [props.navigation]);

  const validate = () => {
    setLoading(true);
    if (tac == true) {
      if (cod) {
        createOrder({
          payment_method: 'cod',
          payment_method_title: 'Cash on delivery'
        }).then(res => {
          console.log(res)
          if (res?.id) {
            emptyCart();
            showSuccess('Order Placed Successfully')
            setLoading(false);
            props.navigation.navigate('ThankYouScreen',{cart :cart});
          }
        });
      } else {
        try {
          generateRazorPayOrderKey().then(res => {
            var options = {
              description: 'Credits towards ' + 'Fiber Laser Spares',
              image:
                'https://fiberlaserspares.com/wp-content/uploads/2022/02/Fiber-Laser-Spares-logo.jpg',
              currency: 'INR',
              key: 'rzp_live_1YR3ePoXGph8MC',
              amount: 10000,
              name: 'Fiber Laser Spares',
              order_id: res, //Replace this with an order_id created using Orders API.
              theme: {color: '#0112B0'},
              notes: {
                delivery_date: new Date().toLocaleDateString(),
                delivery_hour: new Date().getHours(),
              },
            };
            console.log(options, 'options');
            RazorpayCheckout.open(options)
              .then(data => {
                console.log(data, 'data');
                showSuccess('Your payment is successfully done.');
                createOrder({
                  payment_method: 'razorpay',
                  payment_method_title: 'Credit Card/Debit Card/NetBanking/UPI',
                }).then(res => {
                  setLoading(false);
                  if (res?.id) {
                    showSuccess('Order Placed Successfully');
                    props.navigation.navigate('ThankYouScreen',{cart :cart});
                  }
                  setLoading(false);
                });
              })
              .catch(error => {
                setLoading(false);
                // error = JSON.parse(error?.description)?.error?.description;
                // showError(JSON.parse(error?.description)?.error?.description);
                console.log(error);
                // props.navigation.popToTop()
              });
          });
        } catch (err) {
          setLoading(false);
        }
      }
    } else {
      setLoading(false);
      showError('Please check terms and consitions.');
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
                  paddingTop: 10,
                }}>
                <Text style={[styles.ontxt, {fontSize: 16}]}>
                  Billing Address
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate('EditAddress', {
                      address: userData?.billing,
                      addressType: 'Billing Address',
                    })
                  }>
                  <Text
                    style={[styles.ontxt, {color: '#5261F6', fontSize: 16}]}>
                    Edit
                  </Text>
                </TouchableOpacity>
              </View>
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
                    ₹{parseFloat(item?.price * item?.quantity).toFixed(2)}
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
          <View
            style={{
              margin: 20,
              padding: 10,
              width: width * 0.9,
              backgroundColor: '#F8F8F8',
            }}>
            <Text style={[styles.ontxt, {fontSize: 16}]}>Payment Methods</Text>
            <TouchableOpacity
              onPress={() => setCod(true)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 5,
              }}>
              {cod ? (
                <IconI name="radio-button-on" color={'#000000'} size={18} />
              ) : (
                <IconI name="radio-button-off" color={'#000000'} size={18} />
              )}
              <Text style={[styles.ontxt, {fontWeight: '400', paddingLeft: 5}]}>
                Cash on delivery
              </Text>
            </TouchableOpacity>
            <Text style={[styles.ontxt, {fontWeight: '400'}]}>
              Pay with cash upon delivery
            </Text>
            <TouchableOpacity
              onPress={() => setCod(false)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 5,
              }}>
              {cod ? (
                <IconI name="radio-button-off" color={'#000000'} size={18} />
              ) : (
                <IconI name="radio-button-on" color={'#000000'} size={18} />
              )}
              <Text style={[styles.ontxt, {fontWeight: '400', paddingLeft: 5}]}>
                Credit Card/Debit Card/Netbanking /UPI
              </Text>
            </TouchableOpacity>
            <View style={{paddingLeft: '12%', paddingVertical: 10}}>
              <Text style={[styles.ontxt, {fontSize: 18}]}>Razor Pay</Text>
              <Text style={[styles.ontxt, {fontWeight: '400'}]}>
                Cards,Netbanking,Wallet & UPI
              </Text>
            </View>

            <Text
              style={[styles.ontxt, {fontWeight: '400', paddingVertical: 10}]}>
              Your personal data will be used to process your order support your
              experience throughout this website, and for other purposes
              described in our{' '}
              <Text
                onPress={() => props.navigation.navigate('PrivacyPolicy')}
                style={[
                  styles.ontxt,
                  {fontWeight: '400', color: '#F34848', paddingVertical: 10},
                ]}>
                privacy policy.
              </Text>
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 5,
              }}>
              {tac ? (
                <IconI
                  onPress={() => setTac(!tac)}
                  name="checkbox-outline"
                  color={'#000000'}
                  size={20}
                />
              ) : (
                <IconI
                  onPress={() => setTac(!tac)}
                  name="square-outline"
                  color={'#000000'}
                  size={20}
                />
              )}
              <Text
                style={[styles.ontxt, {fontWeight: '400', paddingLeft: 10}]}>
                I have read and agree to the website{' '}
                <Text
                  onPress={() => props.navigation.navigate('TermCondition')}
                  style={[
                    styles.ontxt,
                    {fontWeight: '400', color: '#F34848', paddingVertical: 10},
                  ]}>
                  terms and conditions *{' '}
                </Text>
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              if (!loading) validate();
            }}
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
              PLACE ORDER
            </Text>
            {loading && <ActivityIndicator />}
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

export default PaymentOptions;
