//import liraries
import React, {Component, useState, useEffect} from 'react';
import {
  View,
  Dimensions,
  Text,
  Platform,
  StatusBar,
  PermissionsAndroid,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
  TextInput,
  ImageBackground,
} from 'react-native';
const {width, height} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';
import {addNavigationOject} from '../../../redux/actions/navigation';
import {useSelector} from 'react-redux';
import {getAllCategories, getAllProducts} from '../../../redux/actions/auth';
import {FlatListSlider} from 'react-native-flatlist-slider';
import {DrawerActions} from '@react-navigation/native';
import {
  addItemtoCart,
  addItemToWishlist,
  removeItemFromWishlist,
} from '../../../redux/actions/cart';
import { showError } from '../../utils/helperFunction';

const images = [
  {
    banner: require('../../../assets/image/offerbanner.png'),
  },
  {
    banner: require('../../../assets/image/weldingnozzle1.jpg'),
  },
  {
    banner: require('../../../assets/image/protectionwindow1.jpg'),
  },
  {
    banner: require('../../../assets/image/offerbanner.png'),
  },
];

const CategoryHome = props => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const [featured, setFeatured] = useState([]);
  const [searchresults, setSearchResults] = useState([]);
  const [searchtext, setSearchtext] = useState('');
  const [searchBox, setSearchBox] = useState(false);
  const wishlist = useSelector(state => state.cart.wishlist);
  const cart = useSelector(state => state.cart.cart.items);
  const data = useSelector(state => state.auth);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(addNavigationOject(props.navigation));
    const options = {
      title: 'Product Details',
      headerShown: true,
      headerTitleAlign: 'left',
      headerStyle: {backgroundColor: '#FFFFFF'},
      headerTitle: props => (
        <Image
          source={require('../../../assets/image/FiberLaserSpares3.png')}
          style={{width: 180, alignSelf: 'center'}}
          resizeMode="contain"
        />
      ),
      headerLeft: () => (
        <View>
          <TouchableOpacity
            onPress={() =>
              props.navigation.dispatch(DrawerActions.openDrawer())
            }>
            <Image
              source={require('../../../assets/image/menu.png')}
              style={{height: 16}}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity onPress={() => setSearchBox(true)}>
            <Image
              source={require('../../../assets/image/search.png')}
              style={{height: 20, width: 20}}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Notifications')}>
            <Image
              source={require('../../../assets/image/bell.png')}
              style={{height: 20}}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      ),
    };
    const searchOptions = {
      headerShown: false,
      headerStyle: {backgroundColor: '#FFFFFF'},
      headerTitle: '',
    };
    props.navigation.setOptions(searchBox ? searchOptions : options);
  }, [props.navigation, searchBox]);

  useEffect(() => {
    data.popularProducts?.length > 0
      ? setProducts(data.popularProducts)
      : getAllProducts(dispatch).then(async res => {
          setProducts(res);
        });
    data.featured?.length > 0
      ? setFeatured(data.featured)
      : getAllProducts(dispatch, {featured: true}).then(async res => {
          setFeatured(res);
        });
    data.allCategories?.length > 0
      ? setCategories(data.allCategories)
      : getAllCategories().then(async res => {
          setCategories(res);
        });
  }, [refresh]);

  const renderProducts = item => {
    let fav = wishlist?.findIndex(x => x.id == item.id);
    return (
      <View key={item?.id} style={{paddingHorizontal: 10}}>
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate('Product', {
              productId: item?.id,
            })
          }
          style={{
            flex: 1,
            width: width * 0.4,
            backgroundColor: '#FFFFFF',
            borderRadius: 10,
            paddingVertical: height * 0.01,
            paddingHorizontal: width * 0.1,
            alignItems: 'center',
            borderColor: 'rgba(0,0,0,0.05)',
            borderWidth: 1,
            alignContent: 'space-around',
          }}>
          <View style={{flex: 1, paddingVertical: 5, justifyContent: 'center'}}>
            <ImageBackground
              // source={require('../../assets/image/product.png')}
              source={{uri: item?.images[0]?.src}}
              resizeMode={'cover'}
              style={{
                width: width * 0.35,
                height: width * 0.35,
              }}>
              <View style={{flex: 1, justifyContent: 'space-between'}}>
                <View>
                  {fav > -1 ? (
                    <TouchableOpacity
                      onPress={() =>
                        removeItemFromWishlist(item, props).then(() =>
                          setRefresh(!refresh),
                        )
                      }
                      style={{
                        height: 25,
                        width: 25,
                        borderRadius: 30,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#FFFFFF',
                        alignSelf: 'flex-end',
                        margin: 5,
                      }}>
                      <Icon name="heart" size={18} color="#F34848" />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() =>
                        addItemToWishlist(item, props).then(() =>
                          setRefresh(!refresh),
                        )
                      }
                      style={{
                        height: 25,
                        width: 25,
                        borderRadius: 30,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#FFFFFF',
                        alignSelf: 'flex-end',
                        margin: 5,
                      }}>
                      <Icon name="heart" size={18} color="#727272" />
                    </TouchableOpacity>
                  )}
                </View>
                {parseFloat(item?.regular_price) > item?.price ? (
                  <View
                    style={{
                      height: 20,
                      width: 32,
                      borderRadius: 5,
                      // justifyContent: 'center',
                      backgroundColor: '#F34848',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: 5,
                    }}>
                    <Text style={{color: '#FFFFFF', fontSize: 11}}>
                      {parseInt(
                        100 - (item?.price / item?.regular_price) * 100,
                      )}
                      %
                    </Text>
                  </View>
                ) : null}
              </View>
            </ImageBackground>
          </View>
          <View
            style={{
              width: width * 0.35,
              // height: 120,
              paddingVertical: 2.5,
              justifyContent: 'space-around',
            }}>
            {/* <Text
              style={{
                color: 'grey',
                fontWeight: '700',
                fontSize: 9,
                paddingVertical: 2.5,
              }}>
              {'item.brand_instance.name'}
            </Text> */}
            <Text
              style={{
                color: '#000000',
                fontWeight: '500',
                fontSize: 10,
              }}>
              {item?.name}
            </Text>

            {/* <View
              style={{
                flex: 1,
                width: width * 0.2,
                flexDirection: 'row',
                // backgroundColor:'pink',
                // justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: 'grey',
                  paddingVertical: 2.5,
                  // fontWeight: '800',
                  fontSize: 8,
                  textDecorationLine: 'line-through',
                }}>
                mrp
              </Text>
              <Text style={{color: 'green', fontWeight: '700', fontSize: 8}}>
                {'  '}% OFF
              </Text>
            </View> */}

            <View
              style={{
                paddingVertical: 2,
                alignItems: 'center',
                flexDirection: 'row',
                // justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  color: '#000000',
                  fontWeight: '800',
                  fontSize: 11,
                }}>
                ₹{parseFloat(item?.price).toFixed(2)} +GST
              </Text>
              {parseFloat(item?.regular_price) > item?.price ? (
                <Text
                  style={{
                    color: '#000000',
                    fontWeight: '400',
                    fontSize: 10,
                    textDecorationLine: 'line-through',
                    paddingLeft: 5,
                  }}>
                  ₹{parseFloat(item?.regular_price).toFixed(2)}
                </Text>
              ) : null}
              {/* <Text
                style={{
                  color: '#000000',
                  // fontWeight: '800',
                  fontSize: 10,
                  textDecorationLine:'line-through'
                }}>
                ₹{parseFloat(item?.price).toFixed(2)}
              </Text> */}
            </View>
            <View
              style={{
                paddingVertical: 2,
                justifyContent: 'flex-start',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View style={{flexDirection: 'row'}}>
                <Image
                  source={require('../../../assets/image/star.png')}
                  resizeMode={'contain'}
                  style={{
                    width: 15,
                    height: 15,
                  }}></Image>
                <Text
                  style={{
                    color: '#000000',
                    paddingLeft: 5,
                    // fontWeight: '800',
                    fontSize: 11,
                  }}>
                  {item?.rating_count} Rating
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  if (item?.variations?.length > 0) {
                    showError("Please Select a variation first");
                    props.navigation.navigate('Product', {
                      productId: item?.id,
                    });
                  }
                  else{
                    let payload = {
                      item_id: item?.id,
                      product_id: item?.id,
                      name: item?.name,
                      images: item?.images,
                      price: item?.price,
                      quantity: 1,
                    };
                    addItemtoCart(payload, props).then(() =>
                    console.log('cart item', cart?.length),
                  );
                  }
                }}>
                <Image
                  source={require('../../../assets/image/bag2.png')}
                  resizeMode="stretch"
                  style={{
                    width: 25,
                    height: 25,
                    flexDirection: 'row',
                    // marginBottom: 5,
                    // position: 'absolute',
                  }}></Image>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const renderCategories = item => {
    return (
      <TouchableOpacity
        style={{flex: 0.25}}
        onPress={() =>
          props.navigation.navigate('AllProductList', {
            category: item,
          })
        }>
        <View
          style={{
            height: 80,
            width: 80,
            resizeMode: 'contain',
            //backgroundColor: 'red',
            //borderRadius: 25,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            style={{
              height: 70,
              width: 70,
              resizeMode: 'contain',
              //backgroundColor: '#FAFAFA',
              borderRadius: 5,
            }}
            source={{uri: item?.image?.src}}
            //source={require('../../config/assets/categoryimage.png')}
          ></Image>
        </View>
        <Text
          style={{
            textAlign: 'center',
            color: '#000000',
            alignSelf: 'center',
            fontSize: 12,
          }}>
          {item?.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <StatusBar backgroundColor="#FFFFFF"></StatusBar> */}
      <ScrollView style={styles.innerView}>
        <View style={{alignSelf: 'center'}}></View>
        {searchBox && (
          <View>
            <View
              style={{
                flex: 1,
                padding: '2%',
                height: '10%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
              }}>
              <Icon
                onPress={() => {
                  setSearchBox(false);
                  setSearchResults([]);
                  setSearchtext('');
                }}
                style={{paddingRight: 5}}
                name="close"
                size={25}
                color={'#000000'}
              />
              <View
                style={[
                  styles.txt,
                  {
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  },
                ]}>
                <TextInput
                  style={[styles.txtip, {color: '#000000'}]}
                  placeholder="Search for shop, product and more"
                  value={searchtext}
                  placeholderTextColor="#C4C5C4"
                  onChangeText={searchtext => {
                    setSearchtext(searchtext);
                    searchtext.length > 1
                      ? getAllProducts(dispatch, {search: searchtext}).then(
                          res => {
                            setSearchResults(res);
                          },
                        )
                      : setTimeout(() => {
                          setSearchResults([]);
                        }, 3000);
                  }}></TextInput>
                <TouchableOpacity onPress={() => {}}>
                  <Image
                    source={require('../../../assets/image/search.png')}
                    style={{height: 20, width: 20}}
                    resizeMode="contain"
                  />
                </TouchableOpacity>

                {/* <Image
              source={require('../config/assets/search.png')}
              style={styles.search}></Image> */}
              </View>
            </View>
          </View>
        )}

        <ScrollView
          style={{
            position: 'absolute',
            backgroundColor: '#FFFFFF',
            width: '100%',
            // left: '2%',
            top: '5.6%',
            zIndex: 1,
          }}>
          {searchresults?.length > 0 &&
            searchresults.map((item, i) => {
              return (
                <View key={item.id}>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      width: '90%',
                      alignItems: 'center',
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                    }}
                    onPress={() => {
                      setSearchBox(false);
                      setSearchResults([]);
                      setSearchtext('');
                      props.navigation.navigate('Product', {
                        productId: item?.id,
                      });
                    }}>
                    <Image
                      source={{uri: item?.images[0]?.src}}
                      resizeMode={'contain'}
                      style={{
                        width: 25,
                        height: 25,
                        margin: 2,
                      }}></Image>
                    <Text style={styles.searchResult}>{item.name}</Text>
                  </TouchableOpacity>
                  <View
                    style={{
                      width: '100%',
                      borderBottomWidth: 0.2,
                      borderColor: 'grey',
                    }}></View>
                </View>
              );
            })}
        </ScrollView>
        <View
          style={{
            alignSelf: 'center',
            width: Dimensions.get('screen').width * 0.95,
          }}>
          <FlatListSlider
            data={images}
            imageKey={'banner'}
            local
            height={180}
            width={Dimensions.get('screen').width * 0.95}
            timer={5000}
            separatorWidth={10}
            onPress={item => alert(JSON.stringify(item))}
            // contentContainerStyle={{flex:1}}
            indicatorContainerStyle={{position: 'absolute', bottom: 20}}
            indicatorActiveColor={'#8e44ad'}
            indicatorInActiveColor={'#ffffff'}
            indicatorActiveWidth={30}
            animation
          />
        </View>
        <View style={{padding: '5%'}}>
          <FlatList
            numColumns={4}
            showsHorizontalScrollIndicator={false}
            data={categories}
            renderItem={item => renderCategories(item.item)}
            keyExtractor={(item, index) => index}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 20,
            paddingVertical: 10,
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              color: '#000000',
              fontSize: 16,
              fontWeight: '700',
              textAlign: 'center',
              fontFamily: 'poppins',
              lineHeight: 28,
              fontStyle: 'normal',
            }}>
            Most Popular
          </Text>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('AllProductList', {
                // productId: item?.id,
              })
            }
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}>
            <Text
              style={{
                color: '#0112B0',
                fontSize: 16,
                fontWeight: '600',
                textAlign: 'center',
                fontFamily: 'poppins',
                lineHeight: 28,
                fontStyle: 'normal',
              }}>
              See All
            </Text>
          </TouchableOpacity>
        </View>
        
        <View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={products}
            renderItem={item => renderProducts(item.item)}
            keyExtractor={(item, index) => index}
          />
        </View>
        <View>
          <Image style={{height:180,width:'100%',marginVertical:20,padding:5,resizeMode:'contain'}} source={require('../../../assets/image/offerbanner1.png')}></Image>
        </View>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 20,
            paddingVertical: 10,
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              color: '#000000',
              fontSize: 16,
              fontWeight: '700',
              textAlign: 'center',
              fontFamily: 'poppins',
              lineHeight: 28,
              fontStyle: 'normal',
            }}>
            Suggested
          </Text>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('AllProductList', {
                // productId: item?.id,
              })
            }
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}>
            <Text
              style={{
                color: '#0112B0',
                fontSize: 16,
                fontWeight: '600',
                textAlign: 'center',
                fontFamily: 'poppins',
                lineHeight: 28,
                fontStyle: 'normal',
              }}>
              See All
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={featured}
            renderItem={item => renderProducts(item.item)}
            keyExtractor={(item, index) => index}
          />
        </View>
      </ScrollView>
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
    flexDirection: 'column',
    // alignItems:'center'
    paddingHorizontal: '1%',
    // marginBottom:'10%'
  },
  searchResultView: {
    // backgroundColor:'red',
    // position:'absolute',
    // marginHorizontal: 20,
    // alignItems: "center",
    // justifyContent: "center",
    // height: 600,
    // top:60,
    // margin: 2,
    width: width * 0.95,
    // position:'absolute',
    // backgroundColor:'lightgrey',
  },
  searchResult: {
    marginHorizontal: 20,
    // alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignSelf: 'center',
    // justifyContent: "center",
    minHeight: 30,
    // margin: 0.4,
    width: '95%',
    color: 'black',
    backgroundColor: 'white',
  },
  allCollView: {
    width: width,
    // paddingVertical: 30,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    // backgroundColor: 'rgba(0,0,0,0.05)',
  },
  logoStyle: {
    // flex: 1,
    width: width * 0.55,
    alignSelf: 'center',
    justifyContent: 'flex-start',
  },
  titleStyle: {
    // paddingTop:height*0.05,
    color: '#565656',
    fontSize: 23,
    fontWeight: '900',
    textAlign: 'center',
    fontFamily: 'poppins',
    lineHeight: 34,
    fontStyle: 'normal',
    paddingHorizontal: 20,
  },
  textStyle: {
    paddingHorizontal: width * 0.02,
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'left',
    fontFamily: 'poppins',
    lineHeight: 22,
    fontStyle: 'normal',
  },
  buttonStyle: {
    height: 50,
    width: width * 0.7,
    backgroundColor: '#D02314',
    // borderColor:'green',
    // borderWidth:2,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    fontFamily: 'poppins',
    lineHeight: 36,
    fontStyle: 'normal',
  },
  txt: {
    paddingHorizontal: '2%',
    marginTop: 5,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#FFFFFF',
    backgroundColor: '#FAFAFA',
    width: '70%',
    height: 40,
  },
  txtip: {
    textAlign: 'left',
    fontSize: 13,
    color: '#C4C5C4',
    width: '70%',
    paddingLeft: '2%',
  },

  search: {
    position: 'absolute',
    marginLeft: 340,
    marginTop: 16,
  },
});

export default CategoryHome;
