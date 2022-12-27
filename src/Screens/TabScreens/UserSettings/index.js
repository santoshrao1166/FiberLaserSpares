//import liraries
import React, {useEffect, useState} from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {useDispatch, useSelector} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';
import OrderHistory from './OrderHistory';
import Order from './Order';
import Addresses from './Addresses';
import Profile from './Profile';
import AccountDetails from './AccountDetails';
import Wishlist from '../Wishlist/Wishlist';
import EditAddress from '../Cart/EditAddress';
import AccountHome from './AccountHome';
import LoginMessage from './LoginMessage';
const Stack = createStackNavigator();


// create a component
const UserSettings = ({navigation}) => {
  const navObj = useSelector(state => state.navObj);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          title: 'My Account',
          headerShown: true,
          headerTitleAlign: 'left',
          headerStyle: {backgroundColor: '#FFFFFF'},
          headerLeft: null,
          // headerRight: () => (
          //   <Icon
          //     name="bars"
          //     style={{ paddingHorizontal: 20 }}
          //     onPress={() => {
          //       navigation.dispatch(DrawerActions.openDrawer());
          //     }}
          //     size={22}
          //     color={"#565656"}
          //   />
          // ),
        }}
      />
      <Stack.Screen
        name="AccountHome"
        component={AccountHome}
        options={{
          title: 'My Account',
          headerShown: true,
          headerTitleAlign: 'left',
          headerLeft: null,
          headerStyle: {backgroundColor: '#FFFFFF'}
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
        name="Order"
        component={Order}
        options={{
          title: 'Orders',
          headerStyle: {backgroundColor: '#FFFFFF'},
          headerShown: true,
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
        name="OrderHistory"
        component={OrderHistory}
        options={{
          title: 'Orders',
          headerStyle: {backgroundColor: '#FFFFFF'},
          headerShown: true,
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
        name="AccountDetails"
        component={AccountDetails}
        options={{
          title: 'Account Details',
          headerStyle: {backgroundColor: '#FFFFFF'},
          headerShown: true,
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
        name="EditAddress"
        component={EditAddress}
        options={{
          title: 'Address',
          headerStyle: {backgroundColor: '#FFFFFF'},
          headerShown: true,
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
        name="Addresses"
        component={Addresses}
        options={{
          title: 'Address',
          headerStyle: {backgroundColor: '#FFFFFF'},
          headerShown: true,
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
        name="Wishlist"
        component={Wishlist}
        options={{
          title: 'Wishlist',
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
          //     style={{ paddingHorizontal: 20 }}
          //     onPress={() => {
          //       navigation.dispatch(DrawerActions.openDrawer());
          //     }}
          //     size={22}
          //     color={"#565656"}
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
  text: {
    fontSize: 14,
    fontWeight: '500',
    color: '#727272',
  },
});

//make this component available to the app
export default UserSettings;
