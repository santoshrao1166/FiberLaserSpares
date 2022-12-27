import React, {useEffect, useState} from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {useDispatch, useSelector} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';
import {addNavigationOject} from '../../../redux/actions/navigation';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Wishlist from './Wishlist';
import Product from '../Home/Product';
const Stack = createStackNavigator();


const WishlistHome = ({navigation}) => {
    const navObj = useSelector(state => state.navObj);
    return (
      <Stack.Navigator>
      <Stack.Screen
        name="Wishlist"
        component={Wishlist}
        options={{
          title: 'Wishlist',
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
  export default WishlistHome;