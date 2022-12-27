//import liraries
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';
import {addNavigationOject} from '../../../redux/actions/navigation';
import {ScrollView} from 'react-native-gesture-handler';
const Stack = createStackNavigator();
import {setInitial} from '../../../redux/actions/auth';
import {logout, validateToken} from '../../../redux/actions/auth';

function Profile(props) {
  const {width, height} = Dimensions.get('window');
  const dispatch = useDispatch();
  const userData = useSelector(state => state.auth.userData);

  useEffect(() => {
    dispatch(addNavigationOject(props.navigation));
    const unsubscribe = props.navigation.addListener('focus', () => {
      validateToken()
      .then(res => {
        // console.log('setLoggedIn==', res?.data);
        if(res.data.success) {
          // console.log('setLoggedIn');
          props.navigation.navigate('AccountHome');
        } else 
          props.navigation.navigate('LoginMessage')
      })
      .catch(err => {
        // console.log('setLoggedIn==', err);
        props.navigation.navigate('LoginMessage');
      });
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [props.navigation]);

  return (
    <View style={{flex: 1, alignItems: 'center', backgroundColor: '#FFFFFF'}}>
      <ActivityIndicator />
    </View>
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
});

//make this component available to the app
export default Profile;
