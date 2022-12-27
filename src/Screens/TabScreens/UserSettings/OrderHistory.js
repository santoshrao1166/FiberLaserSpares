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
import {getAllOrders} from '../../../redux/actions/cart';

const Stack = createStackNavigator();

function OrderHistory(props) {
  const [order, setOrder] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const {width, height} = Dimensions.get('window');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addNavigationOject(props.navigation));
  }, [props.navigation]);

  useEffect(() => {
    getAllOrders(dispatch, {per_page: 10, page: page}).then(res => {
      setOrder(res);
      // console.log(res,"orders");
    });
  }, [props.navigation]);

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        justifyContent: 'space-between',
      }}>
      {order?.length > 0 ? (
        <View>
          {order.map((item, index) => {
            const date = new Date(item?.date_created).toDateString();
            return (
              <View
                key={index}
                style={{
                  minHeight: height * 0.12,
                  backgroundColor: '#F8F8F8',
                  width: width * 0.9,
                  marginVertical: 10,
                }}>
                <View style={{flex: 1, margin: 10, flexDirection: 'row'}}>
                  <View style={{flex: 1, justifyContent: 'space-between'}}>
                    <Text style={styles.ontxt}>Order Id :</Text>
                    <Text style={styles.ontxt}>Date :</Text>
                    <Text style={styles.ontxt}>Total :</Text>
                  </View>
                  <View style={{flex: 2, justifyContent: 'space-between'}}>
                    <Text style={styles.text}>#{item.id}</Text>
                    <Text style={styles.text}>{date}</Text>
                    <Text style={styles.text}>
                      ₹ {item.total} For {item.line_items.length} Item{' '}
                    </Text>
                  </View>
                  <View style={{flex: 1, justifyContent: 'space-between'}}>
                    <Text
                      style={[
                        styles.ontxt,
                        {color: '#ED0808', alignSelf: 'center', fontSize: 13},
                      ]}>
                      {item.status.toUpperCase()}
                    </Text>
                    <TouchableOpacity
                      onPress={() =>
                        props.navigation.navigate('Order', {order: item})
                      }
                      style={{
                        alignItems: 'center',
                        alignSelf: 'center',
                        backgroundColor: '#000000',
                        paddingVertical: 5,
                        paddingHorizontal: 5,
                        width: 100,
                      }}>
                      <Text
                        style={[
                          styles.ontxt,
                          {color: '#FFFFFF', fontSize: 12},
                        ]}>
                        VIEW
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          })}
          <TouchableOpacity
            onPress={() => {
              setLoading(true);
              getAllOrders(dispatch, {
                page: page + 1,
                per_page: 10,
                // orderby: value,
                // category: slug,
              })
                .then(async res => {
                  let addorders = [...order, ...res];
                  setLoading(false);
                  setPage(page + 1);
                  setOrder(addorders);
                })
                .catch(err => console.log('err'));
            }}>
            {loading ? (
              <ActivityIndicator size={'small'} color="#5261F6" />
            ) : (
              <Text
                style={{
                  color: '#5261F6',
                  textDecorationLine: 'underline',
                  fontSize: 15,
                  textAlign: 'center',
                  padding: 10,
                }}>
                View More..
              </Text>
            )}
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text style={styles.ontxt}>No Orders yet.</Text>
        </View>
      )}
      <TouchableOpacity
        onPress={() => props.navigation.navigate('Home')}
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
            fontSize: 16,
            fontWeight: '500',
            textAlign: 'center',
            fontFamily: 'poppins',
            //   lineHeight: 28,
            fontStyle: 'normal',
          }}>
          CONTINUE SHOPPING
        </Text>
      </TouchableOpacity>
    </ScrollView>
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
export default OrderHistory;
