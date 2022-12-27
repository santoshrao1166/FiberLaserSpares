//import liraries
import React, {useState, useRef, useCallback, useEffect} from 'react';
import {
  View,
  Dimensions,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  ImageBackground,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
const {width, height} = Dimensions.get('window');
import {
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';
import {addNavigationOject} from '../../../redux/actions/navigation';
import {getAllProducts} from '../../../redux/actions/auth';
import {Dropdown} from 'react-native-element-dropdown';
import RenderHtml from 'react-native-render-html';
import {
  addItemtoCart,
  addItemToWishlist,
  removeItemFromWishlist,
} from '../../../redux/actions/cart';
import RBSheet from 'react-native-raw-bottom-sheet';
import {Slider} from '@miblanchard/react-native-slider';
import {SliderContainer} from '../../../components/SliderComponent';
import {showError} from '../../utils/helperFunction';
import {FlatListSlider} from 'react-native-flatlist-slider';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// create a component
const AllProductList = props => {
  const refRBSheet = useRef();
  const scrollRef = useRef();
  const refRBSheetFilter = useRef();
  const [filterList, setFilterList] = useState(
    props?.route?.params?.category?.id
      ? [
          {id: 'Price', visible: true},
          {id: 'Size', visible: false},
        ]
      : [
          {id: 'Category', visible: true},
          {id: 'Price', visible: false},
          {id: 'Size', visible: false},
        ],
  );
  const [price, setPrice] = useState([0, 50000]);
  const [selectedFilter, setSelectedFilter] = useState(
    props?.route?.params?.category?.id ? 'Price' : 'Category',
  );

  // const [slug, setSlug] = useState(
  //   props?.route?.params?.category?.id
  //     ? props?.route?.params?.category?.id
  //     : '',
  // );
  const [products, setProducts] = useState([]);
  const [value, setValue] = useState('date');
  const [order, setOrder] = useState('asc');
  const [filter, setFilter] = useState({
    min_price: 0,
    max_price: 1000,
    category: props?.route?.params?.category?.id
      ? props?.route?.params?.category?.id
      : '',
    attribute_term: '',
  });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const wishlist = useSelector(state => state.cart.wishlist);
  const allCategories = useSelector(state => state.auth.allCategories);
  const allSizeAttributes = useSelector(state => state.auth.allSizeAttributes);

  const [selectedSizeAttribute, setSelectedSizeAttribute] =
    useState(allSizeAttributes);
  const [selectedCategories, setSelectedCategories] = useState(allCategories);

  const [slider, setSlider] = useState(false);
  const [images, setImages] = useState([]);

  const dispatch = useDispatch();

  const handleChange = (list, id) => {
    let temp = list.map(product => {
      if (id == product?.id) {
        return {...product, isChecked: !product?.isChecked};
      } else return {...product, isChecked: product?.isChecked};
    });
    return temp;
  };

  const getSelectedParams = list => {
    let selected = [];
    list.forEach(element => {
      if (element?.isChecked) selected.push(element?.id);
    });
    return selected?.length > 0 ? selected.join(',') : '';
  };

  const getSelectedParamsSize = list => {
    let selected = [];
    list.forEach(element => {
      if (element?.isChecked) selected.push(element?.name);
    });
    return selected;
  };

  const resetFilters = () => {
    setFilter({
      min_price: 0,
      max_price: 1000,
      category: props?.route?.params?.category?.id
        ? props?.route?.params?.category?.id
        : '',
      attribute_term: '',
    });
    getProducts(value, order, {
      min_price: 0,
      max_price: 1000,
      category: props?.route?.params?.category?.id
        ? props?.route?.params?.category?.id
        : '',
      attribute_term: '',
    });
    let temp = selectedCategories.map(product => {
      return {...product, isChecked: false};
    });
    setSelectedCategories(temp);
    let temp1 = selectedSizeAttribute.map(product => {
      return {...product, isChecked: false};
    });
    setSelectedSizeAttribute(temp1);
    setPrice([0, 50000]);
  };
  const renderFlatList = (renderData, filterType) => {
    return (
      <FlatList
        style={{width: '100%'}}
        scrollEnabled={true}
        data={renderData}
        renderItem={({item}) => (
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              paddingHorizontal: 20,
              paddingVertical: 8,
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                filterType == 'Category'
                  ? setSelectedCategories(
                      handleChange(selectedCategories, item?.id),
                    )
                  : setSelectedSizeAttribute(
                      handleChange(selectedSizeAttribute, item?.id),
                    );
              }}>
              <MaterialCommunityIcons
                name={
                  item?.isChecked ? 'checkbox-marked' : 'checkbox-blank-outline'
                }
                size={20}
                color={item?.isChecked ? '#5261F6' : '#727272'}
              />
            </TouchableOpacity>
            <Text
              style={{
                paddingLeft: 10,
                color: item?.isChecked ? '#002060' : '#727272',
              }}>
              {item?.name} ({item?.count})
            </Text>
          </View>
        )}
      />
    );
  };
  const sliderdata = [
    {
      name: 'Fiber Laser Ceramic',
      images: [
        {
          banner: require('../../../assets/image/ceramic.png'),
        },
        {
          banner: require('../../../assets/image/ceramic1.png'),
        }
      ],
    },
    {
      name: 'Laser Welding Spares',
      images: [
        {
          banner: require('../../../assets/image/weldingnozzle1.jpg'),
        },
        {
          banner: require('../../../assets/image/weldingnozzle2.jpg'),
        }
      ],
    },
    {
      name: 'Protection Windows',
      images: [
        {
          banner: require('../../../assets/image/protectionwindow1.jpg'),
        },
        {
          banner: require('../../../assets/image/protectionwindow2.jpg'),
        },
        {
          banner: require('../../../assets/image/protectionwindow3.jpg'),
        },
      ],
    },
    {
      name: 'Protection Windows',
      images: [
        {
          banner: require('../../../assets/image/protectionwindow1.jpg'),
        },
        {
          banner: require('../../../assets/image/protectionwindow2.jpg'),
        },
        {
          banner: require('../../../assets/image/protectionwindow3.jpg'),
        },
      ],
    },
    {
      name: 'Focussing and Collimating lens',
      images: [
        {
          banner: require('../../../assets/image/lens1.jpg'),
        },
        {
          banner: require('../../../assets/image/lens2.jpg'),
        }
      ],
    },
    {
      name: 'Fiber Laser Nozzle',
      images: [
        {
          banner: require('../../../assets/image/flsnozzle1.jpg'),
        },
        {
          banner: require('../../../assets/image/flsnozzle2.jpg'),
        }
      ],
    },
    {
      name: 'Cleaning Supplies',
      images: [
        {
          banner: require('../../../assets/image/cleaning1.png'),
        },
        {
          banner: require('../../../assets/image/cleaning2.png'),
        },
        {
          banner: require('../../../assets/image/cleaning3.jpg'),
        }
      ],
    },
    {
      name: 'Safety goggles',
      images: [
        {
          banner: require('../../../assets/image/safetygoggles.jpg'),
        },
        {
          banner: require('../../../assets/image/offerbanner.png'),
        }
      ],
    },
    // {
    //   name: 'Sensor Cable',
    //   images: [
      
    //   ],
    // },
  ];
  useEffect(() => {
    dispatch(addNavigationOject(props.navigation));
    props.navigation.setOptions({
      headerTitle: () => (
        <Text style={{fontSize: 18, color: '#000000'}}>
          {props?.route?.params?.category?.id
            ? props?.route?.params?.category?.name
            : 'All Categories'}
        </Text>
      ),
    });
    if (props?.route?.params?.category?.id) {
      let index = sliderdata?.findIndex(
        (item, index) => item.name == props?.route?.params?.category?.name,
      );
      if (index > -1) {
        setSlider(true);
        setImages(sliderdata[index]?.images);
      }
    }
  }, [props.navigation]);
  useEffect(() => {
    setLoading(true);
    getAllProducts(dispatch, {
      ...filter,
      page: page,
      per_page: 10,
      // category: slug,
      order: order,
    })
      .then(async res => {
        setLoading(false);
        setProducts(res);
      })
      .catch(err => setLoading(false));
  }, []);
  const WebDisplay = React.memo(function WebDisplay({html}) {
    return (
      <RenderHtml
        contentWidth={Dimensions.get('window').width}
        source={{html}}
        baseStyle={{color: '#000000'}}
        tagsStyles={{
          p: {
            color: '#000000',
            width: '100%',
            marginVertical: 2,
            fontSize: 13.5,
          },
          td: {color: '#000000', width: '100%', fontSize: 13.5},
          tr: {color: '#000000', width: '80%', fontSize: 13.5},
          a: {color: '#000000', width: '100%', fontSize: 13.5},
          li: {color: '#000000', width: '100%', fontSize: 13.5},
          ol: {color: '#000000', width: '100%', fontSize: 13.5},
          ul: {color: '#000000', width: '100%', fontSize: 13.5},
          h1: {color: '#000000', width: '100%', fontSize: 13.5},
          h2: {color: '#000000', width: '100%', fontSize: 13.5},
          h3: {color: '#000000', width: '100%', fontSize: 13.5},
          h4: {color: '#000000', width: '100%', fontSize: 13.5},
          h5: {color: '#000000', width: '100%', fontSize: 13.5},
          h6: {color: '#000000', width: '100%', fontSize: 13.5},
          span: {color: '#000000', width: '100%', fontSize: 13.5},
          strong: {color: '#000000', width: '100%', fontSize: 13.5},
        }}
      />
    );
  });
  const renderProducts = item => {
    let fav = wishlist?.findIndex(x => x.id == item.id);
    let att = item?.attributes[0]?.options.some(el => getSelectedParamsSize(selectedSizeAttribute).includes(el))
    // console.log(att,"selected");
    if((att && getSelectedParamsSize(selectedSizeAttribute)?.length>0) || getSelectedParamsSize(selectedSizeAttribute)?.length==0)
    return (
      // <View
      //   key={item?.id}
      //   style={{flex: 0.5, justifyContent: 'center', padding: 10}}>
      //   <TouchableOpacity
      //     onPress={() =>
      //       props.navigation.navigate('Product', {
      //         productId: item?.id,
      //       })
      //     }
      //     style={{
      //       flex: 1,
      //       width: width * 0.4,
      //       backgroundColor: '#FFFFFF',
      //       borderRadius: 10,
      //       paddingVertical: height * 0.01,
      //       paddingHorizontal: width * 0.1,
      //       alignItems: 'center',
      //       borderColor: 'rgba(0,0,0,0.05)',
      //       borderWidth: 1,
      //       alignContent: 'space-around',
      //     }}>
      //     <View style={{flex: 1, paddingVertical: 5, justifyContent: 'center'}}>
      //       <Image
      //         // source={require('../../assets/image/product.png')}
      //         source={{uri: item?.images[0]?.src}}
      //         resizeMode={'contain'}
      //         style={{
      //           width: width * 0.3,
      //           height: width * 0.3,
      //         }}></Image>
      //     </View>
      //     <View
      //       style={{
      //         width: width * 0.3,
      //         // height: 120,
      //         paddingVertical: 2.5,
      //         justifyContent: 'space-around',
      //       }}>
      //       {/* <Text
      //         style={{
      //           color: 'grey',
      //           fontWeight: '700',
      //           fontSize: 9,
      //           paddingVertical: 2.5,
      //         }}>
      //         {'item.brand_instance.name'}
      //       </Text> */}
      //       <Text
      //         style={{
      //           color: '#000000',
      //           fontWeight: '500',
      //           fontSize: 10,
      //         }}>
      //         {item.name}
      //       </Text>

      //       {/* <View
      //         style={{
      //           flex: 1,
      //           width: width * 0.2,
      //           flexDirection: 'row',
      //           // backgroundColor:'pink',
      //           // justifyContent: 'space-between',
      //           alignItems: 'center',
      //         }}>
      //         <Text
      //           style={{
      //             color: 'grey',
      //             paddingVertical: 2.5,
      //             // fontWeight: '800',
      //             fontSize: 8,
      //             textDecorationLine: 'line-through',
      //           }}>
      //           mrp
      //         </Text>
      //         <Text style={{color: 'green', fontWeight: '700', fontSize: 8}}>
      //           {'  '}% OFF
      //         </Text>
      //       </View> */}

      //       <View
      //         style={{
      //           paddingVertical: 2,
      //           alignItems: 'center',
      //           flexDirection: 'row',
      //           justifyContent: 'space-between',
      //         }}>
      //         <Text
      //           style={{
      //             color: '#000000',
      //             fontWeight: '800',
      //             fontSize: 11,
      //           }}>
      //           ₹{parseFloat(item?.price).toFixed(2)} +GST
      //         </Text>
      //         {/* <Text
      //           style={{
      //             color: '#000000',
      //             // fontWeight: '800',
      //             fontSize: 10,
      //             textDecorationLine:'line-through'
      //           }}>
      //           ₹{parseFloat(item?.price).toFixed(2)}
      //         </Text> */}
      //       </View>
      //       <View
      //         style={{
      //           paddingVertical: 2,
      //           justifyContent: 'flex-start',
      //           flexDirection: 'row',
      //           alignItems: 'center',
      //         }}>
      //         <Image
      //           source={require('../../../assets/image/star.png')}
      //           resizeMode={'contain'}
      //           style={{
      //             width: width * 0.03,
      //             height: width * 0.03,
      //           }}></Image>
      //         <Text
      //           style={{
      //             color: '#000000',
      //             paddingLeft: 5,
      //             // fontWeight: '800',
      //             fontSize: 11,
      //           }}>
      //           {item?.rating_count} Rating
      //         </Text>
      //       </View>
      //     </View>
      //   </TouchableOpacity>
      // </View>
      <View
        key={item?.id}
        style={{flex: 0.5, justifyContent: 'center', padding: 10}}>
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
                    showError('Please Select a variation first');
                    props.navigation.navigate('Product', {
                      productId: item?.id,
                    });
                  } else {
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
    else
    return null;
  };
  const getProducts = (value, order, filterValues) => {
    let filter = filterValues ? filterValues : filter;
    setProducts([]);
    setPage(1);
    setLoading(true);
    setOrder(order);
    refRBSheet.current.close();
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
    setValue(value);
    getAllProducts(dispatch, {
      ...filter,
      orderby: value,
      order: order,
      page: 1,
      per_page: 10,
      // category: slug,
    })
      .then(async res => {
        setLoading(false);
        setProducts(res);
        setPage(1);
        getSelectedParamsSize(selectedSizeAttribute);
      })
      .catch(err => setLoading(false));
  };
  return (
    <View style={styles.container}>
      <ScrollView style={styles.bg} ref={scrollRef}>
        <View>
          {slider && (
            <View
              style={{
                alignSelf: 'center',
                width: Dimensions.get('screen').width * 0.95,
                marginVertical: 20,
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
          )}
          {/* {loading && (
            <View style={styles.loading}>
              <ActivityIndicator size={'small'} color="#5261F6" />
            </View>
          )} */}
          {/* <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              paddingTop: '2%',
            }}>
            <Text
              style={{
                color: '#000000',
                alignSelf: 'center',
                paddingRight: '5%',
                fontSize: 10,
              }}>
              Sort By
            </Text>
            <Dropdown
              placeholderStyle={{color: '#000000', fontSize: 10}}
              placeholder={'Select'}
              data={[
                {label: 'Populaity', value: 'popularity'},
                {label: 'Rating', value: 'rating'},
                {label: 'Alphatically', value: 'title'},
                {label: 'Price', value: 'price'},
                {label: 'Latest', value: 'date'},
              ]}
              maxHeight={300}
              labelField="label"
              valueField="value"
              selectedTextStyle={{color: '#000000', fontSize: 10}}
              style={{
                width: '40%',
                color: '#000000',
                alignSelf: 'flex-end',
                marginRight: '5%',
                height: 30,
                backgroundColor: 'white',
                borderRadius: 8,
                paddingHorizontal: 10,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.2,
                shadowRadius: 1.41,
                elevation: 2,
              }}
              onChange={item => {
                setPage(1);
                setLoading(true);
                console.log('value', item.label);
                setValue(item.value);
                item.label != 'Select'
                  ? getAllProducts(dispatch, {
                      orderby: item.value,
                      order: 'asc',
                      page: 1,
                      per_page: 10,
                      category: slug,
                    })
                      .then(async res => {
                        setLoading(false);
                        setProducts(res);
                      })
                      .catch(err => setLoading(false))
                  : null;
              }}
              renderItem={item => (
                <View style={{padding: 5}}>
                  <Text style={{color: '#000000', fontSize: 10}}>
                    {item?.label}
                  </Text>
                </View>
              )}
              value={value}
            />
          </View>
          <View>
            <Text
              style={{
                color: '#000000',
                paddingHorizontal: 20,
                fontSize: 10,
                paddingBottom: 5,
              }}>
              {products?.length} Product Found.
            </Text>
          </View> */}
        </View>
        {/* {props?.route?.params?.category?.description && 
        <View style={{padding: '3%'}}>
          {
            console.log(`<p>${props?.route?.params?.category?.description}</p>`,"#333")

          }
        <WebDisplay html={`<p>${props?.route?.params?.category?.description}</p>`} />
      </View>
          } */}
        {products?.length > 0 ? (
          // products?.map((item,index)=>{
          //   renderProducts(item.item)
          // })
          <View>
            <FlatList
              showsHorizontalScrollIndicator={false}
              data={products}
              numColumns={2}
              style={{marginHorizontal: 20}}
              renderItem={item => renderProducts(item.item)}
              keyExtractor={(item, index) => index}
            />
            <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: '10%',
                marginBottom: '10%',
                alignSelf: 'center',
              }}>
              <TouchableOpacity
                onPress={() => {
                  setLoading(true);
                  getAllProducts(dispatch, {
                    ...filter,
                    page: page + 1,
                    per_page: 10,
                    orderby: value,
                    order: order,
                    // category: slug,
                  })
                    .then(async res => {
                      let addproducts = [...products, ...res];
                      console.log(products?.length);
                      setLoading(false);
                      setPage(page + 1);
                      setProducts(addproducts);
                    })
                    .catch(err => console.log('err'));
                }}
                style={{marginBottom: height * 0.05}}>
                {loading ? (
                  <ActivityIndicator size={'small'} color="#5261F6" />
                ) : (
                  <Text
                    style={{
                      color: '#5261F6',
                      textDecorationLine: 'underline',
                      fontSize: 15,
                      paddingHorizontal: 10,
                    }}>
                    View More..
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              paddingTop: 100,
              alignSelf: 'center',
              justifyContent: 'center',
            }}>
            {loading ? (
              <ActivityIndicator size={'small'} color="#5261F6" />
            ) : (
              <Text style={{color: '#000000'}}>No Products Found</Text>
            )}
          </View>
        )}
      </ScrollView>

      <View
        style={{
          position: 'absolute',
          bottom: 0,
          height: height * 0.06,
          paddingVertical: height * 0.01,
          width: width,
          backgroundColor: '#FFFFFF',
          elevation: 10,
        }}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => refRBSheet.current.open()}
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={require('../../../assets/image/sort.png')}
                resizeMode={'contain'}
                style={{
                  width: width * 0.04,
                  height: width * 0.04,
                }}></Image>
              <Text style={styles.textStyle}>Sort By</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => refRBSheetFilter.current.open()}
            style={{
              flex: 1,
              borderLeftWidth: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={require('../../../assets/image/Filter.png')}
                resizeMode={'contain'}
                style={{
                  width: width * 0.045,
                  height: width * 0.045,
                }}></Image>
              <Text style={styles.textStyle}>Filters</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* <Button title="OPEN BOTTOM SHEET" onPress={() => refRBSheet.current.open()} /> */}
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        closeOnPressBack={true}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}>
        <View style={{flex: 1}}>
          <Text style={{fontSize: 18, color: '#000000', paddingHorizontal: 20}}>
            Sort By
          </Text>
          <View
            style={{height: 0.7, marginVertical: 15, backgroundColor: 'grey'}}
          />
          <Text
            onPress={() => {
              getProducts('popularity', 'asc');
            }}
            style={{
              fontSize: 16,
              color: '#000000',
              paddingHorizontal: 40,
              paddingTop: 10,
            }}>
            Popularity
          </Text>
          <Text
            onPress={() => {
              getProducts('rating', 'asc');
            }}
            style={{
              fontSize: 16,
              color: '#000000',
              paddingHorizontal: 40,
              paddingTop: 10,
            }}>
            Average rating
          </Text>
          <Text
            onPress={() => {
              getProducts('rating', 'asc');
            }}
            style={{
              fontSize: 16,
              color: '#000000',
              paddingHorizontal: 40,
              paddingTop: 10,
            }}>
            Latest
          </Text>
          <Text
            onPress={() => {
              getProducts('price', 'asc');
            }}
            style={{
              fontSize: 16,
              color: '#000000',
              paddingHorizontal: 40,
              paddingTop: 10,
            }}>
            Price - Low to high
          </Text>
          <Text
            onPress={() => {
              getProducts('price', 'desc');
            }}
            style={{
              fontSize: 16,
              color: '#000000',
              paddingHorizontal: 40,
              paddingTop: 10,
            }}>
            Price - high to Low
          </Text>
        </View>
      </RBSheet>
      <RBSheet
        ref={refRBSheetFilter}
        closeOnDragDown={true}
        closeOnPressMask={true}
        closeOnPressBack={true}
        height={400}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}>
        <View style={{flex: 1, justifyContent: 'space-between'}}>
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 20,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontSize: 18, color: '#000000'}}>Filter</Text>
            <TouchableOpacity
              onPress={() => {
                resetFilters();
              }}>
              <Text style={{fontSize: 12, color: '#000000'}}>Clear All</Text>
            </TouchableOpacity>
          </View>
          <View style={{height: 0.7, marginTop: 15, backgroundColor: 'grey'}} />
          <View style={{flex: 1, flexDirection: 'row'}}>
            <ScrollView style={{flex: 1, backgroundColor: '#F8F8F8'}}>
              {filterList?.map((item, index) => (
                <TouchableOpacity
                  onPress={() => {
                    let newlist = [];
                    filterList?.forEach(element => {
                      if (element.id == item.id) {
                        setSelectedFilter(element.id);
                        newlist.push({...element, visible: true});
                      } else newlist.push({...element, visible: false});
                    });
                    setFilterList(newlist);
                  }}
                  style={{
                    backgroundColor: item.visible ? '#FFFFFF' : null,
                    borderColor: '#F8F8F8',
                    borderEndWidth: 1,
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: '#000000',
                      padding: 10,
                    }}>
                    {item.id}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <View style={{flex: 3, paddingVertical: 10}}>
              {selectedFilter == 'Category' && (
                <View style={{flex: 1}}>
                  {renderFlatList(selectedCategories, 'Category')}
                </View>
              )}
              {selectedFilter == 'Size' && (
                <View style={{flex: 1}}>
                  {renderFlatList(selectedSizeAttribute, 'Size')}
                </View>
              )}
              {selectedFilter == 'Price' && (
                <View style={{paddingHorizontal: 10}}>
                  <Text style={{color: '#A4A4A4'}}>Select Price Range</Text>
                  <Text
                    style={{
                      color: '#000000',
                      fontSize: 16,
                      paddingVertical: 10,
                    }}>
                    ₹ {Array.isArray(price) ? price.join(' -  ₹ ') : price}
                    {/* ₹ 1548 - ₹ 5999 */}
                  </Text>

                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <SliderContainer
                      caption="<Slider/> 2 thumbs, min, max, and custom tint"
                      sliderValue={price}
                      value={price}
                      setValue={value => setPrice(value)}>
                      <Slider
                        // animateTransitions
                        maximumTrackTintColor="#EAEAEA"
                        maximumValue={50000}
                        minimumTrackTintColor="#002060"
                        minimumValue={0}
                        step={1}
                        thumbStyle={styles.thumb}
                        thumbTouchSize={{
                          width: 60,
                          height: 60,
                        }}
                        thumbTintColor="#002060"
                        trackStyle={styles.track}
                        onValueChange={value => console.log(value)}
                      />
                    </SliderContainer>
                    {/* <Text>Value: {this.state.value}</Text> */}
                  </View>
                </View>
              )}
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 20,
              paddingVertical: 15,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              onPress={() => refRBSheetFilter.current.close()}
              style={{flex: 1, alignItems: 'center'}}>
              <Text style={{fontSize: 18, color: '#000000'}}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                refRBSheetFilter.current.close(0);
                setFilter({
                  ...filter,
                  min_price: price[0],
                  max_price: price[1],
                  category: (props?.route?.params?.category?.id)?props?.route?.params?.category?.id:getSelectedParams(selectedCategories),
                  attribute_term: getSelectedParams(selectedSizeAttribute),
                });
                getProducts(value, order, {
                  min_price: price[0],
                  max_price: price[1],
                  category: (props?.route?.params?.category?.id)?props?.route?.params?.category?.id:getSelectedParams(selectedCategories),
                  attribute_term: getSelectedParams(selectedSizeAttribute),
                })
              }}
              style={{flex: 1, alignItems: 'center', borderLeftWidth: 1}}>
              <Text style={{fontSize: 18, color: '#000000'}}>Apply</Text>
            </TouchableOpacity>
          </View>
          <View></View>
        </View>
      </RBSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slider: {
    flex: 1,
    paddingVertical: 5,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  thumb: {
    // backgroundColor: '#31a4db',
    borderRadius: 12 / 2,
    height: 12,
    shadowColor: '#31a4db',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 2,
    width: 12,
  },
  track: {
    height: 3,
  },
  centeredView: {
    height: height * 0.4,
    backgroundColor: 'red',
    // position:'absolute',
    // bottom:0,
    justifyContent: 'flex-end',
  },
  bg: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  textStyle: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '400',
    paddingLeft: 8,
  },
  loading: {
    // position: 'absolute',
    // left: 0,
    // right: 0,
    // top: '100%',
    // bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AllProductList;
