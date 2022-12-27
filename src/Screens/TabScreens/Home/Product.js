//import liraries
import React, {useRef, useEffect, useState} from 'react';
import {
  View,
  Dimensions,
  Text,
  Share,
  StatusBar,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
const {width, height} = Dimensions.get('window');
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

import {useDispatch, useSelector} from 'react-redux';
import {addNavigationOject} from '../../../redux/actions/navigation';
import {getAllProducts,getProductVariations, getSingleProduct} from '../../../redux/actions/auth';
import {FlatListSlider} from 'react-native-flatlist-slider';
import RenderHtml from 'react-native-render-html';
import {
  addItemtoCart,
  updateItemInCart,
  addItemToWishlist,
  removeItemFromWishlist,
} from '../../../redux/actions/cart';
import {showError} from '../../utils/helperFunction';

const Product = props => {
  const [loading, setLoading] = useState(true);
  const [productId, setProductId] = useState(props.route.params.productId);
  const [refresh, setRefresh] = useState(false);
  const [productDetails, setProductDetails] = useState([]);
  const [productImages, setProductImages] = useState([]);
  const [productList, setproductList] = useState([]);
  const [count, setCount] = useState(1);
  const [variationId, setVariationId] = useState('');
  const [showAttributes, setShowAttributes] = useState(-1);
  const [variations, setVariations] = useState([]);

  
  const wishlist = useSelector(state => state.cart.wishlist);

  const ref = useRef();

  const userData = useSelector(state => state.auth.userData);

  const WebDisplay = React.memo(function WebDisplay({html}) {
    return (
      <RenderHtml
        contentWidth={Dimensions.get('window').width}
        source={{html}}
        tagsStyles={{
          td: {color: '#000000', width: '90%', fontSize: 13.5},
          tr: {color: '#000000', width: '80%', fontSize: 13.5},
          a: {color: '#000000', width: '90%', fontSize: 13.5},
          li: {color: '#000000', width: '90%', fontSize: 13.5},
          ol: {color: '#000000', width: '90%', fontSize: 13.5},
          ul: {color: '#000000', width: '90%', fontSize: 13.5},
          p: {
            color: '#000000',
            width: '90%',
            marginVertical: 2,
            fontSize: 13.5,
          },
          strong: {color: '#000000', width: '90%', fontSize: 13.5},
        }}
      />
    );
  });
  const onShare = async link => {
    console.log(link, 'link');
    try {
      const result = await Share.share({
        message: link,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addNavigationOject(props.navigation));
    setProductId(productId);
    props.navigation.setOptions({
      headerRight: () => (
        <Feather
          name="share"
          style={{paddingHorizontal: 20}}
          onPress={() => {
            onShare(productDetails?.permalink);
          }}
          size={22}
          color={'#565656'}
        />
      ),
    });
  }, [props.navigation, productDetails]);

  useEffect(() => {
    let ProductImages = [];
    setProductImages([]);
    setLoading(true);
    getSingleProduct(dispatch, productId).then(res => {
      setLoading(false);
      setProductDetails(res);
      setShowAttributes(res?.variations?.length > 0?res?.variations?.length:-1);
      res?.images?.map((item, i) => {
        ProductImages.push({image: item.src});
      });
      setProductImages(ProductImages);
      getAllProducts(dispatch, {include: res?.related_ids}).then(async res => {
        setproductList(res);
        setLoading(false);
      });
      console.log(productId,res?.variations?.length,res?.variations?.length > 0,"variations");
      (res?.variations?.length > 0 )? getProductVariations(dispatch,productId).then((res)=>{
          setVariations(res);
      }):null;
    });
  }, [productId]);

  const renderProducts = item => {
    let fav = wishlist?.findIndex(x => x.id == item.id);
    return (
      <View key={item?.id} style={{paddingHorizontal: 10}}>
        <TouchableOpacity
          onPress={() => {
            setProductId(item?.id);
            ref.current?.scrollTo({
              y: 0,
              animated: true,
            });
          }}
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
                {item?.regular_price > item?.price ? (
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
              {item?.regular_price > item?.price ? (
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
              <TouchableOpacity onPress={() => {
                  if (item?.variations?.length > 0) {
                    showError("Please Select a variation first");
                    props.navigation.navigate('Product', {
                      productId: item?.id,
                    });
                  }
                  else{
                    addItemtoCart(item, props).then(() =>
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
  let fav = wishlist?.findIndex(x => x.id == productDetails.id);

  return (
    <SafeAreaView style={styles.container}>
      {/* <StatusBar backgroundColor="#FFFFFF"></StatusBar> */}
      {/* {console.log('images', productImages[0])} */}
      {!loading ? (
        <ScrollView ref={ref} style={styles.innerView}>
          <View
            style={{
              flex: 1,
            }}>
            <TouchableOpacity
              onPress={() =>
                fav > -1
                  ? removeItemFromWishlist(productDetails, props).then(() =>
                      setRefresh(!refresh),
                    )
                  : addItemToWishlist(productDetails, props).then(() =>
                      setRefresh(!refresh),
                    )
              }
              style={{
                height: 40,
                borderRadius: 30,
                width: 40,
                backgroundColor: '#FFFFFF',
                position: 'absolute',
                zIndex: 1,
                right: 0,
                margin: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {fav > -1 ? (
                <Icon name="heart" size={26} color="#F34848" />
              ) : (
                <Icon name="heart" size={26} color="#727272" />
              )}
            </TouchableOpacity>
            {productImages?.length > 0 && (
              <FlatListSlider
                // extraData={productImages}
                data={productImages}
                height={Dimensions.get('screen').width}
                width={Dimensions.get('screen').width}
                timer={5000}
                // onPress={item => alert(JSON.stringify(item))}
                // contentContainerStyle={{paddingHorizontal:10}}
                indicatorContainerStyle={{position: 'absolute', bottom: 20}}
                indicatorActiveColor={'black'}
                indicatorInActiveColor={'grey'}
              />
            )}

            <View style={{width: width * 0.95, alignSelf: 'center'}}>
              <Text
                style={{
                  color: '#000000',
                  fontSize: 20,
                  fontWeight: '700',
                  textAlign: 'left',
                  fontFamily: 'poppins',
                  fontStyle: 'normal',
                  padding: 10,
                }}>
                {productDetails.name}
              </Text>
              {/* <View style={{flexDirection:'row',alignItems:'center'}}>
              <Image
                source={require('../../../assets/image/rating.png')}
                resizeMode={'contain'}
                style={{
                  width: 15,
                  height: 15,
                  margin: 10,
                }}></Image>
              <Text
                    style={{
                      color: '#727272',
                      fontSize: 16,
                      fontWeight: '500',
                      textAlign: 'left',
                      fontFamily: 'poppins',
                      fontStyle: 'normal',
                      // padding: 10,
                    }}>
                  {parseFloat(productDetails?.rating_count).toFixed(1)}
                  </Text>
              </View> */}
              <Text
                style={{
                  color: '#000000',
                  fontSize: 20,
                  fontWeight: '700',
                  textAlign: 'left',
                  fontFamily: 'poppins',
                  fontStyle: 'normal',
                  padding: 10,
                }}>
                ₹{parseFloat(productDetails?.price).toFixed(2)} +GST
              </Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                {parseFloat(productDetails?.regular_price) >
                productDetails?.price ? (
                  <Text
                    style={{
                      color: '#727272',
                      fontSize: 16,
                      fontWeight: '500',
                      textAlign: 'left',
                      fontFamily: 'poppins',
                      fontStyle: 'normal',
                      padding: 10,
                      textDecorationLine: 'line-through',
                    }}>
                    {/* {productDetails?.regular_price > productDetails?.price} */}
                    ₹{parseFloat(productDetails?.regular_price).toFixed(2)}
                  </Text>
                ) : null}
                <Text
                  style={{
                    fontSize: 15,
                    padding: 10,
                    color: !productDetails?.in_stock ? '#00B233' : '#F34848',
                  }}>
                  {!productDetails?.in_stock ? 'IN STOCK' : 'OUT OF STOCK'}
                </Text>
              </View>
              {showAttributes > -1 && (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: 10,
                  }}>
                  {productDetails?.attributes?.map((item, index) => (
                    <View>
                      <Text
                        style={[
                          styles.ontxt,
                          {paddingHorizontal: 10, fontSize: 16},
                        ]}>
                        {item?.name} :
                      </Text>
                      <View
                        style={{
                          // borderWidth: 1,
                          borderRadius: 2,
                          height: 35,
                          marginVertical: 10,
                          width: width * 0.45,
                          backgroundColor: '#F8F8F8',
                          alignSelf: 'center',
                          justifyContent: 'center',
                        }}>
                        <Picker
                          selectedValue={variationId}
                          style={{
                            height: 40,
                            color: '#000000',
                          }}
                          dropdownIconColor="#000000"
                          value={variationId}
                          onValueChange={(itemValue, itemIndex) => {
                            setProductDetails({...itemValue,name:productDetails?.name,id:productId,variation_id:itemValue?.id})
                            setVariationId(itemValue);
                          }}>
                          <Picker.Item
                            key={'1'}
                            style={{fontSize: 13}}
                            label={'Choose an option'}
                            value={''}
                          />
                          {variations?.map((item, index) => (
                            <Picker.Item
                              key={index}
                              label={item?.attributes[0]?.option}
                              value={item}
                            />
                          ))}
                        </Picker>
                      </View>
                    </View>
                  ))}
                </View>
              )}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 10,
                }}>
                <Text
                  style={[styles.ontxt, {paddingHorizontal: 10, fontSize: 16}]}>
                  Quantity :
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    // width: 150,
                    backgroundColor: '#F8F8F8',
                    padding: 5,
                  }}>
                  <Feather
                    onPress={() => (count > 1 ? setCount(count - 1) : null)}
                    name="minus"
                    color={'#727272'}
                    size={18}></Feather>
                  <Text style={[styles.ontxt, {paddingHorizontal: 15}]}>
                    {count}
                  </Text>
                  <Feather
                    onPress={
                      () => setCount(count + 1)
                      // updateItemInCart(productDetails, props, false).then(() => {
                      //   updateCheckoutData().then(() =>
                      //     setRefresh(!refresh),
                      //   );
                      // })
                    }
                    name="plus"
                    color={'#727272'}
                    size={18}></Feather>
                </View>
              </View>

              <TouchableOpacity
                onPress={() =>
                  //addItem(productDetails)
                  {
                    let payload = (productDetails?.variation_id)?{
                      item_id:productDetails?.id + productDetails?.variation_id,
                      product_id : productDetails?.id,
                      variation_id : productDetails?.variation_id,
                      name:productDetails?.name + " - " +  variationId.attributes[0]?.option,
                      images:[productDetails?.image],
                      price : productDetails?.price,
                      quantity: count
                    }:
                    {
                      item_id:productDetails?.id ,
                      product_id : productDetails?.id,
                      name:productDetails?.name,
                      images:productDetails?.images,
                      price : productDetails?.price,
                      quantity: count
                    }
                    ;
                    console.log(showAttributes, variationId, 'kkk');
                    showAttributes == -1
                      ? addItemtoCart(payload)
                      : showAttributes > -1 && variationId != ''
                      ? addItemtoCart(payload)
                      : showError('Please select a variation');
                  }
                }
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#0112B0',
                  height: height * 0.06,
                  width: width * 0.9,
                  alignSelf: 'center',
                  marginTop: 10,
                }}>
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontSize: 20,
                    fontWeight: '500',
                    textAlign: 'center',
                    fontFamily: 'poppins',
                    //   lineHeight: 28,
                    fontStyle: 'normal',
                  }}>
                  Add To Cart
                </Text>
              </TouchableOpacity>
              {productDetails.description && (
                <Text
                  style={{
                    color: '#565656',
                    fontSize: 20,
                    fontWeight: '800',
                    // textAlign: "left",
                    fontFamily: 'poppins',
                    fontStyle: 'normal',
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    alignSelf: 'center',
                    // textDecorationLine: "underline",
                    textDecorationColor: 'red',
                  }}>
                  Description
                </Text>
              )}
              <View style={{paddingHorizontal: '3%'}}>
                <WebDisplay html={`<p>${productDetails.description}</p>`} />
              </View>
            </View>
          </View>
          <View style={{flex: 1}}>
            <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: 20,
                paddingVertical: 10,
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  color: '#565656',
                  fontSize: 20,
                  fontWeight: '700',
                  textAlign: 'center',
                  fontFamily: 'poppins',
                  lineHeight: 28,
                  fontStyle: 'normal',
                }}>
                Related Products
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                }}></View>
            </View>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={productList}
              renderItem={item => renderProducts(item.item)}
              keyExtractor={(item, index) => index}
            />
          </View>
        </ScrollView>
      ) : (
        <ScrollView ref={ref} style={styles.innerView}>
          <View
            style={{
              flex: 1,
            }}>
            <View
              style={{
                height: height * 0.35,
                width: width,
                marginBottom: 10,
                backgroundColor: '#F5F5F5',
              }}
            />
            <View style={{width: width * 0.95, alignSelf: 'center'}}>
              <View
                style={{
                  backgroundColor: '#F5F5F5',
                  padding: 10,
                  height: 40,
                }}></View>
              <View
                style={{
                  backgroundColor: '#F5F5F5',
                  marginVertical: 10,
                  padding: 10,
                  height: 40,
                  width: width * 0.5,
                }}></View>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#F5F5F5',
                  height: height * 0.06,
                  width: width * 0.9,
                  alignSelf: 'center',
                  marginTop: 10,
                }}></TouchableOpacity>
              <View
                style={{
                  backgroundColor: '#F5F5F5',
                  padding: 10,
                  width: width * 0.9,
                  alignSelf: 'center',
                  height: 40,
                  marginVertical: 10,
                }}></View>
            </View>
          </View>
          <View style={{flex: 1}}>
            <View
              style={{
                backgroundColor: '#F5F5F5',
                padding: 10,
                width: width * 0.9,
                alignSelf: 'center',
                height: 40,
                marginVertical: 10,
              }}></View>
            <View style={{flexDirection: 'row', paddingHorizontal: 20}}>
              <View
                style={{
                  width: width * 0.4,
                  backgroundColor: '#F5F5F5',
                  paddingVertical: height * 0.01,
                  marginRight: width * 0.035,
                  elevation: 10,
                  height: 100,
                }}></View>
              <View
                style={{
                  width: width * 0.4,
                  backgroundColor: '#F5F5F5',
                  paddingVertical: height * 0.01,
                  marginRight: width * 0.035,
                  elevation: 10,
                  height: 100,
                }}></View>
            </View>
          </View>
        </ScrollView>
      )}
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

    // justifyContent: 'space-between',
    // alignItems:'center'
    // marginBottom:'20%'
  },
  ontxt: {
    color: '#000000',
    // textAlign:"center"
    // fontFamily: "Poppins",
    fontStyle: 'normal',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 18,
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
    resizeMode: 'stretch',
    width: width,
    height: height * 0.2,
    backgroundColor: '#ededed',
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
});

export default Product;
