import React, {useState, useEffect} from 'react';
import {
  View,
  Dimensions,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Feather';
const {width, height} = Dimensions.get('window');
const Stack = createStackNavigator();
import {addNavigationOject} from '../../../redux/actions/navigation';
import { showError } from '../../utils/helperFunction';
import {useSelector, useDispatch} from 'react-redux';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  removeItemFromWishlist,
  addItemtoCart,
} from '../../../redux/actions/cart';
// create a component
const Wishlist = props => {
  const cartItem = [
    {name: 'Laser Safety Goggles', size: 'Size - M', price: '199'},
    {name: 'Laser Safety Goggles', size: 'Size - M', price: '199'},
  ];
  const wishlist = useSelector(state => state.cart.wishlist);
  const [refresh, setRefresh] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(addNavigationOject(props.navigation));
  }, [props.navigation]);

  return (
    <SafeAreaView style={styles.container}>
      {/* <StatusBar backgroundColor="#F5F5F5"></StatusBar> */}
      {wishlist.length > 0 ? (
        <ScrollView
          style={styles.innerView}
          // contentContainerStyle={{flex: 1, justifyContent: 'space-between'}}
        >
          <View>
            {wishlist?.map((item, index) => (
              <View
                key={index}
                style={{
                  minHeight: height * 0.12,
                  width: width * 0.9,
                  marginVertical: 10,
                  paddingVertical: 5,
                  alignSelf: 'center',
                  backgroundColor: 'rgba(220, 220, 220,0.5)',
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
                      <Text style={styles.ontxt}>{item?.name}</Text>
                      {/* <Icon name="trash" color={'#727272'} size={22}></Icon> */}
                    </View>
                    <Text
                      style={[
                        styles.subtxt,
                        {
                          // fontSize: 15,
                          // padding: 10,
                          color: !item?.in_stock ? '#00B233' : '#F34848',
                        },
                      ]}>
                      {!item?.in_stock ? 'IN STOCK' : 'OUT OF STOCK'}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text style={styles.ontxt}>
                        ₹{parseFloat(item?.price).toFixed(2)} +GST
                      </Text>
                    </View>
                  </View>
                  <View style={{justifyContent: 'space-between'}}>
                    <TouchableOpacity
                      onPress={() =>
                        removeItemFromWishlist(item, props).then(() => {
                          let payload = {
                            item_id: item?.id,
                            product_id: item?.id,
                            name: item?.name,
                            images: item?.images,
                            price: item?.price,
                            quantity: 1,
                          };
                          if (item?.variations?.length > 0) {
                            showError("Please Select a variation first");
                            props.navigation.navigate('Product', {
                              productId: item?.id,
                            });
                          }
                          else {
                            addItemtoCart(payload, props).then(() =>
                            setRefresh(!refresh),
                          );
                          }
                        })
                      }
                      style={{
                        alignItems: 'center',
                        alignSelf: 'center',
                        backgroundColor: '#5261F6',
                        paddingVertical: 3,
                        paddingHorizontal: 5,
                        width: 100,
                      }}>
                      <Text
                        style={[
                          styles.ontxt,
                          {color: '#FFFFFF', fontSize: 11},
                        ]}>
                        ADD TO CART
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() =>
                        props.navigation.navigate('Product', {
                          productId: item?.id,
                        })
                      }
                      style={{
                        alignItems: 'center',
                        alignSelf: 'center',
                        backgroundColor: '#000000',
                        paddingVertical: 3,
                        paddingHorizontal: 5,
                        marginTop: 5,
                        width: 100,
                      }}>
                      <Text
                        style={[
                          styles.ontxt,
                          {color: '#FFFFFF', fontSize: 11},
                        ]}>
                        VIEW
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() =>
                        removeItemFromWishlist(item, props).then(() =>
                          setRefresh(!refresh),
                        )
                      }
                      style={{
                        alignItems: 'center',
                        alignSelf: 'center',
                        paddingVertical: 3,
                        paddingHorizontal: 5,
                        // marginTop:5,
                      }}>
                      <Text
                        style={[
                          styles.ontxt,
                          {color: '#ED0808', fontSize: 11},
                        ]}>
                        REMOVE
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  ontxt: {
    color: '#000000',
    // textAlign:"center"
    // fontFamily: "Poppins",
    fontStyle: 'normal',
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 18,
  },
  subtxt: {
    color: '#239F05',
    // textAlign:"center"
    // fontFamily: "Poppins",
    fontStyle: 'normal',
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 18,
  },
});

//make this component available to the app
export default Wishlist;
