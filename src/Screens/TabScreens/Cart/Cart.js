//import liraries
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {useDispatch, useSelector} from 'react-redux';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
const {width, height} = Dimensions.get('window');
import {addNavigationOject} from '../../../redux/actions/navigation';
import {
  updateItemInCart,
  updateCheckoutData,
} from '../../../redux/actions/cart';
import {setInitial, validateToken} from '../../../redux/actions/auth';
// create a component
const Cart = props => {
  const [cart, setCart] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [loggedIn, setLoggedIn] = useState(null);
  const [loading, setLoading] = useState(false);

  const cartItem = useSelector(state => state.cart.cart);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addNavigationOject(props.navigation));
  }, [props.navigation]);

  const validate = () => {
    setLoading(true);
    validateToken()
      .then(res => {
        if (res.data.success) {
          console.log('trueee');
          props.navigation.navigate('DeliveryAddress');
          setLoading(false);
        } else props.navigation.navigate('LoginMessage');
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        props.navigation.navigate('LoginMessage');
      });
  };

  useEffect(() => {
    updateCheckoutData();
    setCart(cartItem);
  }, [refresh]);

  return (
    <SafeAreaView style={styles.container}>
      {/* <StatusBar backgroundColor="#F5F5F5"></StatusBar> */}
      {cart?.items?.length > 0 ? (
        <ScrollView
          style={styles.innerView}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'space-between',
          }}>
          <View>
            {cart?.items?.map((item, index) => (
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate('Product', {productId: item?.product_id})
                }
                key={index}
                style={{
                  minHeight: height * 0.12,
                  width: width * 0.9,
                  marginVertical: 10,
                  paddingVertical: 5,
                  alignSelf: 'center',
                  backgroundColor: '#F5F5F5',
                  // elevation: 1,
                  borderRadius: 5,
                }}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    marginHorizontal: 10,
                    marginVertical: 2,
                  }}>
                  <View style={{alignSelf: 'center'}}>
                    <Image
                      source={{uri: item?.images[0]?.src}}
                      resizeMode={'contain'}
                      style={{
                        width: width * 0.2,
                        height: width * 0.2,
                        borderRadius: 10,
                      }}></Image>
                  </View>

                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'space-evenly',
                      paddingHorizontal: 10,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text style={[styles.ontxt, {width: width * 0.5}]}>
                        {item?.name}
                      </Text>
                      <Icon
                        onPress={() =>
                          updateItemInCart(item, props, true, true).then(() => {
                            updateCheckoutData().then(() =>
                              setRefresh(!refresh),
                            );
                          })
                        }
                        name="trash"
                        color={'#727272'}
                        size={22}></Icon>
                    </View>
                    <Text style={styles.subtxt}></Text>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                      <Text style={[styles.ontxt]}>
                        ₹ {parseFloat(item.price).toFixed(2)} + GST
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          // width: 150,
                          // backgroundColor:'red',
                        }}>
                        <Icon
                          onPress={() =>
                            updateItemInCart(item, props, true).then(() => {
                              updateCheckoutData().then(() =>
                                setRefresh(!refresh),
                              );
                            })
                          }
                          name="minus"
                          color={'#727272'}
                          size={18}></Icon>
                        <Text style={[styles.ontxt, {paddingHorizontal: 15}]}>
                          {item.quantity}
                        </Text>
                        <Icon
                          onPress={() =>
                            updateItemInCart(item, props, false).then(() => {
                              updateCheckoutData().then(() =>
                                setRefresh(!refresh),
                              );
                            })
                          }
                          name="plus"
                          color={'#727272'}
                          size={18}></Icon>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
          <View>
            <View style={{width: width * 0.88, alignSelf: 'center'}}>
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
                style={{height: 1, backgroundColor: 'lightgrey', marginTop: 10}}
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

                <Text style={styles.ontxt}>₹{parseFloat(cart?.cgst).toFixed(2)}</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingTop: 10,
                }}>
                <Text style={styles.ontxt}>9% SGST</Text>

                <Text style={styles.ontxt}>₹{parseFloat(cart?.sgst).toFixed(2)}</Text>
              </View>
              <View
                style={{height: 1, backgroundColor: 'lightgrey', marginTop: 10}}
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
                PROCEED TO CHECKOUT
              </Text>
              {loading && <ActivityIndicator />}
            </TouchableOpacity>
          </View>
        </ScrollView>
      ) : (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text style={styles.ontxt}>No Products Added</Text>
        </View>
      )}
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
    // minHeight:height*1.2
    // flexDirection: 'column',
    // marginBottom:'1%'
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
});

//make this component available to the app
export default Cart;
