//import liraries
import React, {Component,useEffect} from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Feather';
import Cart from './Cart';
const Stack = createStackNavigator();
import DeliveryAddress from './DeliveryAddress';
import Notifications from '../../MenuScreens/Notifications';
import PaymentOptions from './PaymentOptions';
import OrderHistory from '../UserSettings/OrderHistory';
import {useSelector,useDispatch} from 'react-redux';
import Product from '../Home/Product';
import AllProductList from '../Home/AllProductList';
import ThankYouScreen from './ThankYouScreen';
import { clearCart } from '../../../redux/actions/cart';
import EditAddress from './EditAddress';
import TermCondition from '../../MenuScreens/TermCondition';
import PrivacyPolicy from '../Home/PrivacyPolicy';
import LoginMessage from '../UserSettings/LoginMessage';
const CartHome = ({navigation}) => {
  const navObj = useSelector(state => state.navObj);
  const dispatch = useDispatch();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="cart"
        component={Cart}
        options={{
          title: 'Shopping Cart',
          headerShown: true,
          // headerTitleAlign: 'center',
          headerStyle: {backgroundColor: '#FFFFFF'},
          headerLeft: null,
        }}
      />

      <Stack.Screen
        name="PaymentOptions"
        component={PaymentOptions}
        options={{
          title: 'Checkout',
          headerStyle: {backgroundColor: '#FFFFFF'},
          headerShown: true,
          headerTitleStyle: {
            color: '#000000',
          },
          headerTitleAlign: 'left',
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
        name="LoginMessage"
        component={LoginMessage}
        options={{
          title: 'LoginMessage',
          headerStyle: {backgroundColor: '#FFFFFF'},
          headerShown: false,
          headerTitleStyle: {
            color: '#000000',
          },
          // headerTitleAlign: 'left',
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
        name="DeliveryAddress"
        component={DeliveryAddress}
        options={{
          title: 'Address',
          headerStyle: {backgroundColor: '#FFFFFF'},
          headerShown: true,
          headerTitleStyle: {
            color: '#000000'
          },
          headerTitleAlign: 'left',
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
        name="EditAddress"
        component={EditAddress}
        options={{
          title: 'Address',
          headerShown: true,
          // headerTitleAlign: 'center',
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
        name="Notifications"
        component={Notifications}
        options={{
          title: '',
          headerStyle: {backgroundColor: '#FFFFFF'},
          headerShown: true,
          headerTitleStyle: {
            color: '#D02314'
          },
          headerTitleAlign: 'left',
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
        name="OrderHistory"
        component={OrderHistory}
        options={{
          title: 'Order History',
          headerStyle: {backgroundColor: '#FFFFFF'},
          headerShown: true,
          headerTitleStyle: {
            color: '#D02314'
          },
          headerTitleAlign: 'left',
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
        name="Product"
        component={Product}
        options={{
          title: 'Product Detail',
          headerShown: true,
          headerTitleAlign: 'center',
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
          //     name="menu"
          //     style={{paddingHorizontal: 20}}
          //     onPress={() =>
          //       {
          //         navigation.dispatch(DrawerActions.openDrawer())
          //       }
          //     }
          //     size={22}
          //     color={'#565656'}
          //   />
          // ),
    
        }}
      />
       <Stack.Screen
        name="AllProductList"
        component={AllProductList}
        options={{
          title: 'All Products',
          headerShown: true,
          headerTitleAlign: 'center',
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
          //     name="menu"
          //     style={{paddingHorizontal: 20}}
          //     onPress={() =>
          //       {
          //         navigation.dispatch(DrawerActions.openDrawer())
          //       }
          //     }
          //     size={22}
          //     color={'#565656'}
          //   />
          // ),
    
        }}
      />

      <Stack.Screen
        name="ThankYouScreen"
        component={ThankYouScreen}
        options={{
          title: 'Order Complete',
          headerShown: true,
          headerTitleAlign: 'center',
          headerStyle: {backgroundColor: '#FFFFFF'},
          headerLeft: () => (
            null
          ),
          // headerRight: () => (
          //   <Icon
          //     name="menu"
          //     style={{paddingHorizontal: 20}}
          //     onPress={() =>
          //       {
          //         navigation.dispatch(DrawerActions.openDrawer())
          //       }
          //     }
          //     size={22}
          //     color={'#565656'}
          //   />
          // ),
    
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
export default CartHome;
