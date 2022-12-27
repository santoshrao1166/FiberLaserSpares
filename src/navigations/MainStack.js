import React, {Component, useState, useEffect} from 'react';
// import {Home} from '../Screens';
import Home from '../Screens/TabScreens/Home';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import UserSettings from '../Screens/TabScreens/UserSettings';
import Icon from 'react-native-vector-icons/Feather';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import CartHome from '../Screens/TabScreens/Cart';
import { useSelector,useDispatch } from 'react-redux';
import WishlistHome from '../Screens/TabScreens/Wishlist';
import { myStore } from '../redux/store';
const Tab = createBottomTabNavigator();
import { addNavigationOject } from '../redux/actions/navigation';
export function BottomTab(props) {

  const [cartItem, setCart] = useState([]);
  const cart = useSelector((state) => state.cart.cart.items);
  const dispatch = useDispatch();

  useEffect(() => {
    setCart(cart?.items);
    console.log("cart========",cartItem?.length);
    // getCustomerData().then(()=>{
    //   console.log("getCustomerData")
    // })
  }, [cartItem]);

  useEffect(() => {
    dispatch(addNavigationOject(props.navigation));
    console.log("cart========",cartItem?.length);
  }, [props.navigation]);


  return (
    <Tab.Navigator tabBar={(props) => <MyTabBar {...props} />}>
      <Tab.Screen
        name="Home"
        options={{
          headerShown: false,
          unmountOnBlur: true,
        }}
        component={Home}
      />
      <Tab.Screen
        name="Cart"
        options={{
          headerLeft: () => (
            <Icon
              name="chevron-left"
              style={{paddingHorizontal: 20}}
              size={22}
              color={'#565656'}
            />
          ),
          headerShown: false,
          unmountOnBlur: true,
        }}
        component={CartHome}
      />
      <Tab.Screen
        name="Wishlist"
        options={{
          headerLeft: () => (
            <Icon
              name="chevron-left"
              style={{paddingHorizontal: 20}}
              size={22}
              color={'#565656'}
            />
          ),
          headerShown: false,
          unmountOnBlur: true,
        }}
        component={WishlistHome}
      />
      <Tab.Screen
        name="UserSettings"
        options={{
          title:'Profile',
          headerShown: false,
          unmountOnBlur: true,
        }}
        component={UserSettings}
      />
    </Tab.Navigator>
  );
}

export default function (Drawer,props) {
  return (
    <>
      <Drawer.Screen
        name="HomeScreen"
        options={{
          headerShown: false,
        }}
        component={BottomTab}
      />
    </>
  );
}

function MyTabBar(props) {
  const {state, descriptors, navigation} = props;
  const [cartItem, setCartItem] = useState([]);
  const Cart = useSelector(state => state.cart.cart);
  
  useEffect(() => {
    setCartItem(Cart);
  },[cartItem]);
  
  return (
    <View
      style={{
        position: 'relative',
        bottom: 0,
        height: 75,
        width: '100%',
        alignSelf: 'center',
        backgroundColor: '#ffffff',
      }}>
      <ImageBackground
        source={require('../assets/image/RectangleBar.png')}
        resizeMode="stretch"
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
          // backgroundColor:'red',
          alignItems: 'center',
          flexDirection: 'row',
          // position: 'absolute',
        }}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigation.navigate({name: route.name, merge: true});
            }
          };
          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{
                flex: 1,
                width: '90%',
                alignItems: 'center',
              }}>
              {label == 'Home' ? (
                isFocused ? (
                  <Image
                    source={require('../assets/image/homeb.png')}
                    resizeMode="stretch"
                    style={{
                      width: 25,
                      height: 25,
                      flexDirection: 'row',
                      // marginBottom: 5,
                      // position: 'absolute',
                    }}></Image>
                ) : (
                  <Image
                    source={require('../assets/image/home.png')}
                    resizeMode="stretch"
                    style={{
                      width: 25,
                      height: 25,
                      flexDirection: 'row',
                      // marginBottom: 5,
                      // position: 'absolute',
                    }}></Image>
                )
              ) : null}
              {label == 'Cart' ? (
                isFocused ? (
                  <ImageBackground
                    source={require('../assets/image/bagb.png')}
                    resizeMode="stretch"
                    style={{
                      width: 25,
                      height: 25,
                      flexDirection: 'row',
                      // marginBottom: 5,
                      // position: 'absolute',
                    }}>
                    {cartItem?.items?.length > 0 ? (
                      <View
                        style={{
                          width: 20,
                          height: 20,
                          backgroundColor: 'red',
                          borderRadius: 30,
                          alignItems: 'center',
                          justifyContent:'center',
                          position: 'absolute',
                          top: -5,
                          right: -8,
                        }}>
                        <Text
                          style={{
                            textAlign: 'center',
                            color: '#FFFFFF',
                            fontSize: 12,
                          }}>
                          {cartItem?.items?.length}
                        </Text>
                      </View>
                    ) : null}
                  </ImageBackground>
                ) : (
                  <ImageBackground
                    source={require('../assets/image/bag.png')}
                    resizeMode="stretch"
                    style={{
                      width: 25,
                      height: 25,
                      flexDirection: 'row',
                      // marginBottom: 5,
                      // position: 'absolute',
                    }}>
                      {cartItem?.items?.length > 0 ? (
                      <View
                        style={{
                          width: 20,
                          height: 20,
                          backgroundColor: 'red',
                          borderRadius: 30,
                          alignItems: 'center',
                          justifyContent:'center',
                          position: 'absolute',
                          top: -5,
                          right: -8,
                        }}>
                        <Text
                          style={{
                            textAlign: 'center',
                            color: '#FFFFFF',
                            fontSize: 12,
                          }}>
                          {cartItem?.items?.length}
                        </Text>
                      </View>
                    ) : null}
                    </ImageBackground>
                )
              ) : null}
              {label == 'Wishlist' ? (
                isFocused ? (
                  <Image
                    source={require('../assets/image/heartb.png')}
                    resizeMode="stretch"
                    style={{
                      width: 25,
                      height: 25,
                      flexDirection: 'row',
                      // marginBottom: 2,
                      // position: 'absolute',
                    }}></Image>
                ) : (
                  <Image
                    source={require('../assets/image/heart.png')}
                    resizeMode="stretch"
                    style={{
                      width: 25,
                      height: 25,
                      flexDirection: 'row',
                      // marginBottom: 5,
                      // position: 'absolute',
                    }}></Image>
                )
              ) : null}
              {label == 'Profile' ? (
                isFocused ? (
                  <Image
                    source={require('../assets/image/profileb.png')}
                    resizeMode="stretch"
                    style={{
                      width: 25,
                      height: 25,
                      flexDirection: 'row',
                      // marginBottom: 5,
                      // position: 'absolute',
                    }}></Image>
                ) : (
                  <Image
                    source={require('../assets/image/profile.png')}
                    resizeMode="stretch"
                    style={{
                      width: 25,
                      height: 25,
                      flexDirection: 'row',
                      // marginBottom: 5,
                      // position: 'absolute',
                    }}></Image>
                )
              ) : null}
              {isFocused ? (
                <Text
                  style={{color: isFocused ? '#0112B0' : '#222', fontSize: 12}}>
                  {label}
                </Text>
              ) : null}
            </TouchableOpacity>
          );
        })}
      </ImageBackground>
    </View>
  );
}
