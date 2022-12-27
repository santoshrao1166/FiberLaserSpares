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

function AccountHome(props) {
  const {width, height} = Dimensions.get('window');
  const [refresh, setRefresh] = useState(false);
  const userData = useSelector(state => state.auth.userData);
  const dispatch = useDispatch();


  return (
    <View style={{flex: 1, alignItems: 'center', backgroundColor: '#FFFFFF'}}>
      <View>
        <View style={{paddingVertical: 15, width: width * 0.9}}>
          <Text style={[styles.text, {fontSize: 20}]}>
            Hello,{' '}
            {userData?.first_name == ''
              ? userData?.email
              : userData?.first_name}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Home')}
          style={{
            width: width * 0.9,
            backgroundColor: '#FFFFFF',
            height: height * 0.06,
            marginTop: 10,
            elevation: 5,
            paddingHorizontal: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={styles.text}>Dashboard</Text>
          <Icon size={12} color="#727272" name="chevron-right"></Icon>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('OrderHistory')}
          style={{
            width: width * 0.9,
            backgroundColor: '#FFFFFF',
            height: height * 0.06,
            marginTop: 10,
            elevation: 5,
            paddingHorizontal: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={styles.text}>Orders</Text>
          <Icon size={12} color="#727272" name="chevron-right"></Icon>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Addresses')}
          style={{
            width: width * 0.9,
            backgroundColor: '#FFFFFF',
            height: height * 0.06,
            marginTop: 10,
            elevation: 5,
            paddingHorizontal: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={styles.text}>Addresses</Text>
          <Icon size={12} color="#727272" name="chevron-right"></Icon>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('AccountDetails')}
          style={{
            width: width * 0.9,
            backgroundColor: '#FFFFFF',
            height: height * 0.06,
            marginTop: 10,
            elevation: 5,
            paddingHorizontal: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={styles.text}>Account Details</Text>
          <Icon size={12} color="#727272" name="chevron-right"></Icon>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Wishlist')}
          style={{
            width: width * 0.9,
            backgroundColor: '#FFFFFF',
            height: height * 0.06,
            marginTop: 10,
            elevation: 5,
            paddingHorizontal: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={styles.text}>Wishlist</Text>
          <Icon size={12} color="#727272" name="chevron-right"></Icon>
        </TouchableOpacity>
        <View
          style={{
            width: width * 0.9,
            backgroundColor: '#FFFFFF',
            height: height * 0.06,
            marginTop: 10,
            elevation: 5,
            paddingHorizontal: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            onPress={() => {
              logout().then(()=>props.navigation.goBack());
            }}
            style={styles.text}>
            Logout
          </Text>
          <Icon size={12} color="#727272" name="chevron-right"></Icon>
        </View>
      </View>
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
export default AccountHome;
