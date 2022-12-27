//import liraries
import React, {Component, useEffect} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Feather';
import {DrawerActions} from '@react-navigation/native';
import CategoryHome from './Category';
import Product from './Product';
import {useSelector} from 'react-redux';
import Addresses from '../UserSettings/Addresses';
import Wishlist from '../Wishlist/Wishlist';
import AccountDetails from '../UserSettings/AccountDetails';
import OrderHistory from '../UserSettings/OrderHistory';
import AllProductList from './AllProductList';
import {TouchableOpacity} from 'react-native-gesture-handler';
import CancellationRefundPolicy from './CancellationRefundPolicy';
import Shipping from './ShippingPolicy';
import PrivacyPolicy from './PrivacyPolicy';
import Notifications from '../../MenuScreens/Notifications';
import Order from '../UserSettings/Order';
import TermCondition from '../../MenuScreens/TermCondition';
import Cart from '../Cart/Cart';
const Stack = createStackNavigator();

// create a component
const Home = ({navigation}) => {
  const navObj = useSelector(state => state.navObj);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CategoryHome"
        component={CategoryHome}
        options={{
          title: 'Product Details',
          headerShown: true,
          headerTitleAlign: 'left',
          headerStyle: {backgroundColor: '#FFFFFF'},
          headerTitle: props => (
            <Image
              source={require('../../../assets/image/FiberLaserSpares3.png')}
              style={{width: 200, alignSelf: 'center'}}
              resizeMode="contain"
            />
          ),
          headerLeft: () => (
            <View>
              <TouchableOpacity
                onPress={()=>navObj.dispatch(DrawerActions.openDrawer())}>
                <Image
                  source={require('../../../assets/image/menu.png')}
                  style={{height: 16}}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
            // <Icon
            //   name="chevron-left"
            //   onPress={()=>navObj.dispatch(DrawerActions.openDrawer())}
            //   style={{paddingHorizontal: 20}}
            //   size={22}
            //   color={'#565656'}
            // />
          ),
          headerRight: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => navObj.dispatch(DrawerActions.openDrawer())}
                >
                <Image
                  source={require('../../../assets/image/search.png')}
                  style={{height: 20, width: 20}}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navObj.dispatch(DrawerActions.openDrawer())}
                >
                <Image
                  source={require('../../../assets/image/bell.png')}
                  style={{height: 20}}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="AllProductList"
        component={AllProductList}
        options={{
          // title: 'ALL PRODUCTS',
          headerShown: true,
          headerTitleAlign: 'left',
          headerStyle: {backgroundColor: '#FFFFFF'},
          headerLeft: () => (
            <Icon
              name="chevron-left"
              onPress={() => navObj.pop()}
              style={{paddingHorizontal: 20}}
              size={22}
              color={'#565656'}
            />
          ),
          // headerRight: () => (
          //   <Icon
          //     name="bars"
          //     style={{paddingHorizontal: 20}}
          //     onPress={() => {
          //       navigation.dispatch(DrawerActions.openDrawer());
          //     }}
          //     size={22}
          //     color={'#565656'}
          //   />
          // ),
        }}
      />
      <Stack.Screen
        name="Product"
        component={Product}
        options={{
          title: 'Product Details',
          headerShown: true,
          headerTitleAlign: 'left',
          headerStyle: {backgroundColor: '#FFFFFF'},
          headerLeft: () => (
            <Icon
              name="chevron-left"
              onPress={() => navObj.pop()}
              style={{paddingHorizontal: 20}}
              size={22}
              color={'#565656'}
            />
          ),
          // headerRight: (props) => (
          //   <Icon
          //     name="share"
          //     style={{paddingHorizontal: 20}}
          //     onPress={() => {
          //       Product.onShare()
          //     }}
          //     size={22}
          //     color={'#565656'}
          //   />
          // ),
        }}
      />
      <Stack.Screen
        name="OrderHistory"
        component={OrderHistory}
        options={{
          title: 'Order History',
          headerStyle: {backgroundColor: '#FFFFFF'},
          headerShown: true,
          // headerTitleAlign: 'center',
          headerLeft: () => (
            <Icon
              name="chevron-left"
              onPress={() => navObj.pop()}
              style={{paddingHorizontal: 20}}
              size={22}
              color={'#565656'}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Addresses"
        component={Addresses}
        options={{
          title: 'Address',
          headerStyle: {backgroundColor: '#FFFFFF'},
          headerShown: true,
          // headerTitleAlign: 'center',
          headerLeft: () => (
            <Icon
              name="chevron-left"
              onPress={() => navObj.pop()}
              style={{paddingHorizontal: 20}}
              size={22}
              color={'#565656'}
            />
          ),
        }}
      />
      <Stack.Screen
        name="AccountDetails"
        component={AccountDetails}
        options={{
          title: 'Account Details',
          headerStyle: {backgroundColor: '#FFFFFF'},
          headerShown: true,
          // headerTitleAlign: 'center',
          headerLeft: () => (
            <Icon
              name="chevron-left"
              onPress={() => navObj.pop()}
              style={{paddingHorizontal: 20}}
              size={22}
              color={'#565656'}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Wishlist"
        component={Wishlist}
        options={{
          title: 'Wishlist',
          headerStyle: {backgroundColor: '#FFFFFF'},
          headerShown: true,
          // headerTitleAlign: 'center',
          headerLeft: () => (
            <Icon
              name="chevron-left"
              onPress={() => navObj.pop()}
              style={{paddingHorizontal: 20}}
              size={22}
              color={'#565656'}
            />
          ),
        }}
      />
      <Stack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicy}
        options={{
          title: 'Privacy Policy',
          headerStyle: {backgroundColor: '#FFFFFF'},
          headerShown: true,
          // headerTitleAlign: 'center',
          headerLeft: () => (
            <Icon
              name="chevron-left"
              onPress={() => navObj.pop()}
              style={{paddingHorizontal: 20}}
              size={22}
              color={'#565656'}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Shipping"
        component={Shipping}
        options={{
          title: 'Shipping Policy',
          headerStyle: {backgroundColor: '#FFFFFF'},
          headerShown: true,
          // headerTitleAlign: 'center',
          headerLeft: () => (
            <Icon
              name="chevron-left"
              onPress={() => navObj.pop()}
              style={{paddingHorizontal: 20}}
              size={22}
              color={'#565656'}
            />
          ),
        }}
      />
      <Stack.Screen
        name="CancellationRefundPolicy"
        component={CancellationRefundPolicy}
        options={{
          title: 'Cancellation/Refund Policy',
          headerStyle: {backgroundColor: '#FFFFFF'},
          headerShown: true,
          // headerTitleAlign: 'center',
          headerLeft: () => (
            <Icon
              name="chevron-left"
              onPress={() => navObj.pop()}
              style={{paddingHorizontal: 20}}
              size={22}
              color={'#565656'}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Notifications"
        component={Notifications}
        options={{
          title: 'Notifications',
          headerStyle: {backgroundColor: '#FFFFFF'},
          headerShown: true,
          // headerTitleAlign: 'center',
          headerLeft: () => (
            <Icon
              name="chevron-left"
              onPress={() => navObj.pop()}
              style={{paddingHorizontal: 20}}
              size={22}
              color={'#565656'}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Order"
        component={Order}
        options={{
          title: 'Orders',
          headerStyle: {backgroundColor: '#FFFFFF'},
          headerShown: true,
          // headerTitleAlign: 'center',
          headerLeft: () => (
            <Icon
              name="chevron-left"
              onPress={() => navObj.pop()}
              style={{paddingHorizontal: 20}}
              size={22}
              color={'#565656'}
            />
          ),
        }}
      />
      <Stack.Screen
        name="TermCondition"
        component={TermCondition}
        options={{
          title: 'Terms and Conditions',
          headerStyle: {backgroundColor: '#FFFFFF'},
          headerShown: true,
          // headerTitleAlign: 'center',
          headerLeft: () => (
            <Icon
              name="chevron-left"
              onPress={() => navObj.pop()}
              style={{paddingHorizontal: 20}}
              size={22}
              color={'#565656'}
            />
          ),
        }}
      />
            <Stack.Screen
        name="cart"
        component={Cart}
        options={{
          title: 'Shopping Cart',
          headerShown: true,
          // headerTitleAlign: 'center',
          headerStyle: {backgroundColor: '#FFFFFF'},
          headerLeft: () => (
            <Icon
              name="chevron-left"
              // onPress={() => navObj.pop()}
              style={{paddingHorizontal: 20}}
              size={22}
              color={'#565656'}
            />
          ),
        }}
      />
    </Stack.Navigator>
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
});

//make this component available to the app
export default Home;
