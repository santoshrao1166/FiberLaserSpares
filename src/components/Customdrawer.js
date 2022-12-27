//import liraries
import React, {useEffect, useState} from 'react';
import {
  View,
  Dimensions,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
const {width, height} = Dimensions.get('window');
import {DrawerActions} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {ScrollView} from 'react-native-gesture-handler';
import {validateToken} from '../redux/actions/auth';
import {setInitial} from '../redux/actions/auth';

const CustomDrawer = props => {
  const dispatch = useDispatch();
  const [showAccount, setShowAccount] = useState(false);
  const [showCategory, setShowCategory] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const allcategory = useSelector(state => state.auth.allCategories);
  const navObj = useSelector(state => state.navObj);

  useEffect(() => {
    validateToken()
      .then(res => {
        console.log('setLoggedIn', res?.data);
        if (res.data.success) setLoggedIn(true);
        else setLoggedIn(false);
      })
      .catch(err => setLoggedIn(false));
  }, [refresh]);

  return (
    <View
      style={{
        flex: 1,
        // paddingVertical: 20,
        // width:width*0.8,
        color: '#ffffff',
        backgroundColor: '#FAFAFA',
      }}>
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{flexGrow: 1, justifyContent: 'space-between'}}>
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => navObj.dispatch(DrawerActions.closeDrawer())}>
              <Image
                source={require('../assets/image/menu.png')}
                style={{height: 15}}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <Text
              style={{
                color: '#565656',
                fontSize: 17,
                fontWeight: '600',
                // textAlign: 'left',
                fontFamily: 'poppins',
                fontStyle: 'normal',
                paddingVertical: 15,
              }}>
              Home
            </Text>
          </View>
          <View style={{}}>
            <TouchableOpacity
              // onPress={() => navObj.navigate('AllProductList')}
              onPress={() => {
                setShowCategory(!showCategory);
                setShowAccount(false);
              }}
              style={{
                flexDirection: 'row',
                padding: 7,
                justifyContent: 'space-between',
              }}>
              <Text style={[styles.textStyle,{fontWeight:'700',fontSize:18}]}>Categories</Text>
              <Icon
                onPress={() => {
                  setShowCategory(!showCategory);
                  setShowAccount(false);
                }}
                style={{paddingRight: 10, color: '#000000'}}
                name="chevron-down"
                size={25}></Icon>
            </TouchableOpacity>
            {showCategory && allcategory?.length > 0 && (
              <View style={{paddingHorizontal: 10}}>
                {allcategory?.map((item, index) => (
                  <TouchableOpacity
                    onPress={() =>
                      navObj.navigate('AllProductList', {
                        category: item,
                      })
                    }
                    key={index}>
                    <View
                      style={{
                        width: '95%',
                        paddingVertical:5,
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                      }}>
                      <Image
                        source={{uri: item?.image?.src}}
                        resizeMode={'contain'}
                        style={{
                          width: width * 0.1,
                          height: width * 0.1,
                        }}></Image>
                      <Text style={styles.subtextStyle}>{item?.name}</Text>
                    </View>
                    <View style={{height: 1, backgroundColor: 'lightgrey'}} />
                  </TouchableOpacity>
                ))}
              </View>
            )}
            {loggedIn && (
              <View>
                <TouchableOpacity
                  onPress={() => {
                    // Linking.openURL(`tel:0000000000`);
                    // navObj.closeDrawer();
                  }}
                  style={{
                    flexDirection: 'row',
                    padding: 7,
                    justifyContent: 'space-between',
                  }}>
                  <Text style={[styles.textStyle,{fontWeight:'700',fontSize:18}]}>All Account </Text>
                  <Icon
                    onPress={() => {
                      setShowAccount(!showAccount);
                      setShowCategory(false);
                    }}
                    style={{paddingRight: 10, color: '#000000'}}
                    name="chevron-down"
                    size={25}></Icon>
                </TouchableOpacity>
                {showAccount && (
                  <View style={{paddingHorizontal: 25}}>
                    <TouchableOpacity
                      onPress={() => navObj.navigate('OrderHistory')}
                      style={{
                        width: '95%',
                        paddingVertical:5,
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                      }}>
                      <Text style={styles.subtextStyle}>Orders</Text>
                    </TouchableOpacity>
                    <View style={{height: 1, backgroundColor: 'lightgrey'}} />
                    <TouchableOpacity
                      onPress={() => navObj.navigate('Addresses')}
                      style={{
                        width: '95%',
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                      }}>
                      <Text style={styles.subtextStyle}>Addressess</Text>
                    </TouchableOpacity>
                    <View style={{height: 1, backgroundColor: 'lightgrey'}} />
                    <View
                      style={{
                        width: '95%',
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                      }}>
                      <Text style={styles.subtextStyle}>Inquiries</Text>
                    </View>
                    <View style={{height: 1, backgroundColor: 'lightgrey'}} />
                    <TouchableOpacity
                      onPress={() => navObj.navigate('AccountDetails')}
                      style={{
                        width: '95%',
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                      }}>
                      <Text style={styles.subtextStyle}>Account Details</Text>
                    </TouchableOpacity>
                    <View style={{height: 1, backgroundColor: 'lightgrey'}} />
                    <TouchableOpacity
                      onPress={() => navObj.navigate('Wishlist')}
                      style={{
                        width: '95%',
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                      }}>
                      <Text style={styles.subtextStyle}>Wishlist</Text>
                    </TouchableOpacity>
                    <View style={{height: 1, backgroundColor: 'lightgrey'}} />
                  </View>
                )}
              </View>
            )}

            <TouchableOpacity
              onPress={() => navObj.navigate('PrivacyPolicy')}
              style={{flexDirection: 'row', padding: 7}}>
              <Text style={styles.textStyle}>Privacy Policy </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navObj.navigate('Shipping')}
              style={{flexDirection: 'row', padding: 7}}>
              <Text style={styles.textStyle}>Shipping Policy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navObj.navigate('CancellationRefundPolicy')}
              style={{flexDirection: 'row', padding: 7}}>
              <Text style={styles.textStyle}>Cancellation/Refund Policy </Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={{flexDirection: 'row', padding: 7}}>
            <Text style={styles.textStyle}>Chat with Us </Text>
          </TouchableOpacity> */}
            <TouchableOpacity
              onPress={() => navObj.navigate('TermCondition')}
              style={{flexDirection: 'row', padding: 7}}>
              <Text style={styles.textStyle}>Terms & Conditions </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{paddingVertical: 15}}>
          {loggedIn ? (
            <TouchableOpacity
              onPress={() => {
                // Linking.openURL(`tel:0000000000`);
                // navObj.closeDrawer();
              }}
              style={{
                flex: 1,
                flexDirection: 'row',
                padding: 7,
                justifyContent: 'space-between',
              }}>
              <Text style={styles.textStyle}>Log Out</Text>
              <Icon
                style={{paddingRight: 10, color: '#000000'}}
                name="log-out"
                size={22}></Icon>
            </TouchableOpacity>
          ) : (
            <Text
              style={styles.textStyle}
              onPress={() => {
                navObj.dispatch(DrawerActions.closeDrawer());
                setInitial(2);
              }}>
              Login
            </Text>
          )}
          <Text style={[styles.textStyle, {fontSize: 11}]}>
            Copyright © 2022 FiberLaserspares, All Rights Reserved{' '}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
  textStyle: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'left',
    fontFamily: 'poppins',
    lineHeight: 24,
    fontStyle: 'normal',
    paddingLeft: 20,
  },
  subtextStyle: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'left',
    fontFamily: 'poppins',
    lineHeight: 24,
    fontStyle: 'normal',
    paddingLeft: 2,
    paddingVertical: 10,
  },
  logoStyle: {
    // flex: 1,
    width: width * 0.4,
    //alignSelf: 'center',
    //justifyContent: 'flex-start',
  },
  iconStyle: {
    width: 25,
    height: 25,
  },
});
export default CustomDrawer;
