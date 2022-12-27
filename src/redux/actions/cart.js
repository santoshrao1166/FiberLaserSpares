import store from '../store';
import {
  CART,
  CHANGE_CART_QUANTITY,
  GET_RAZOR_PAY,
  CREATE_ORDER,
  GET_ALL_ORDERS,
  GUEST_CART,
  GET_INDIVIDUAL_ORDER,
  GET_GUEST_CART,
  GET_CUTOMER_DATA,
} from '../../config/urls';
import {myStore} from '../store';
const {dispatch, getState} = myStore;
import {showError, showSuccess} from '../../Screens/utils/helperFunction';
import {apiDelete} from '../../Screens/utils/utils';
import {WooCommerce_API} from '../../config/WooCommerceAPI';
import {setItem, getItem, removeItem} from '../../Screens/utils/utils';
const serverUrl = 'https://fiberlaserspares.com/wp-json/wc/v3/';
import base64 from 'react-native-base64';

export const getAllOrders = async (dispatch, param) => {
  return new Promise(async (resolve, reject) => {
    getItem('customerId')
      .then(customerId => {
        if (customerId != null) {
          console.log('param', param);
          //WooCommerce_API.get(GET_ALL_ORDERS, {customer: 359})
          WooCommerce_API.get(GET_ALL_ORDERS, {...param, customer: customerId})
            .then(data => {
              console.log('all orders');
              resolve(data);
            })
            .catch(error => {
              console.log(error);
              reject(null);
            });
        } else {
          reject(null);
        }
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const assignOrderToCustomer = async id => {
  return new Promise(async (resolve, reject) => {
    getItem('customerId')
      .then(customerId => {
        if (customerId != null) {
          WooCommerce_API.post(GET_ALL_ORDERS + '/' + id, {
            customer_id: customerId,
          })
            .then(data => {
              console.log(data?.customer_id, '======Order assigned');
              resolve(data);
            })
            .catch(error => {
              console.log(error);
              reject(null);
            });

          // let username = 'ck_ef02ab61fc91dd6c36e3e0daac0041b29aee2b19';
          // let password = 'cs_46ea3d9021e81e1c66e46140f003ea408ffbc24a';
          // let headers ={
          //   Authorization: 'Basic ' +  base64.encode(username + ':' + password),
          //   'Content-Type':'application/json'
          // }
          // console.log(headers);
          // const options = {
          //   method: 'POST',
          //   body: JSON.stringify(param),
          //   headers: headers,
          // };
          // fetch(serverUrl + GET_ALL_ORDERS + '/' + id, options)
          //   .then(response => response.json())
          //   .then(data => {
          //     console.log(
          //       id,
          //       customerId,
          //       data?.customer_id,
          //       data?.status,serverUrl + GET_ALL_ORDERS + '/' + id,param,
          //       '======assignOrderToCustomer=====',
          //     );
          //     resolve(data);
          //   })
          //   .catch(error => {
          //     console.log(error);
          //     reject(null);
          //   });
        } else {
          reject(null);
        }
      })
      .catch(err => {
        reject(err);
      });
  });
};
export const createOrder = params => {
  console.log(getState().cart?.cart?.items, '=====');
  return new Promise(async (resolve, reject) => {
    getItem('customerId')
      .then(customerId => {
        if (customerId != null) {
          let param = {
            ...params,
            set_paid: true,
            billing: getState().auth.userData?.billing,
            shipping: getState().auth.userData?.shipping,
            line_items: getState().cart?.cart?.items,
            shipping_lines: [
              {
                method_id: 'flat_rate',
                method_title: 'Flat Rate',
                // total: '10.00',
              },
            ],
          };
          WooCommerce_API.post(GET_ALL_ORDERS, param)
            .then(data => {
              console.log(data?.id, '======Order Created');
              assignOrderToCustomer(data?.id);
              resolve(data);
            })
            .catch(error => {
              console.log(error);
              reject(null);
            });
        } else {
          reject(null);
        }
      })
      .catch(err => {
        reject(err);
      });
  });
};
export const generateRazorPayOrderKey = async dispatch => {
  return new Promise(async (resolve, reject) => {
    let username = 'rzp_live_1YR3ePoXGph8MC';
    let password = 'HaQCaxgbIspZWtcjl0E6wKG7';
    let headers = {
      Authorization: 'Basic ' + base64.encode(username + ':' + password),
      'Content-Type': 'application/json',
    };
    let param = {
      amount: 100,
      currency: 'INR',
      notes: {
        delivery_date: new Date().toLocaleDateString(),
        delivery_hour: new Date().getHours(),
      },
    };
    const options = {
      method: 'POST',
      body: JSON.stringify(param),
      headers: headers,
    };
    console.log(options, '======options');

    fetch('https://api.razorpay.com/v1/orders', options)
      .then(response => response.json())
      .then(response => {
        console.log(response, '======generateRazorPayOrderKey');
        resolve(response?.id);
      })
      .catch(error => {
        console.log(error);
        reject(null);
      });
  });
};

export const addItemtoCart = (data, props) => {
  // console.log(props,"props")
  return new Promise(async (resolve, reject) => {
    try {
      showSuccess(`${data.name} added to cart`);
      dispatch({
        type: 'ADD_TO_CART',
        payload: {
          ...data,
          quantity: data?.quantity ? data?.quantity : 1,
        },
      });
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};
export const addItemToWishlist = (data, props) => {
  return new Promise(async (resolve, reject) => {
    try {
      dispatch({
        type: 'ADD_TO_WISHLIST',
        payload: data,
      });
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};
export const removeItemFromWishlist = (data, props) => {
  return new Promise(async (resolve, reject) => {
    try {
      dispatch({
        type: 'REMOVE_FROM_WISHLIST',
        payload: data,
      });
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};
export const updateItemInCart = (data, props, minus, remove) => {
  return new Promise(async (resolve, reject) => {
    showSuccess('Cart Updated');
    try {
      minus
        ? data?.quantity == 1 || remove
          ? dispatch({
              type: 'REMOVE_FROM_CART',
              payload: {
                ...data,
              },
            })
          : dispatch({
              type: 'MINUS_QUANTITY',
              payload: {
                ...data,
              },
            })
        : dispatch({
            type: 'PLUS_QUANTITY',
            payload: {
              ...data,
            },
          });
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};
export const updateCheckoutData = (data, props, minus, remove) => {
  return new Promise(async (resolve, reject) => {
    try {
      dispatch({
        type: 'UPDATE_CHECKOUT_DATA',
      });
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};
// export const clearCart = () => {
//   // return {
//   //   type: "CLEAR_CART",
//   // };
//   let headers = {
//     Authorization: getState().auth.userData.token,
//   };
//   if (getState().auth.userData.phone == 'Guest') {
//     return new Promise(async (resolve, reject) => {
//       try {
//         const res = await apiDelete(
//           GET_GUEST_CART + getState().auth.userData._id,
//           {},
//           headers,
//         );
//         if (res.status_code == 1) {
//           dispatch({
//             type: 'GET_CART',
//             payload: res.data,
//           });
//           resolve(res);
//         } else showError(res.message);
//       } catch (error) {
//         reject(error);
//       }
//     });
//   } else {
//     return new Promise(async (resolve, reject) => {
//       try {
//         const res = await apiDelete(CART, {}, headers);
//         if (res.status_code == 1) {
//           dispatch({
//             type: 'GET_CART',
//             payload: res.data,
//           });
//           resolve(res);
//         } else showError(res.message);
//       } catch (error) {
//         reject(error);
//       }
//     });
//   }
// };
export const emptyCart = () => {
  dispatch({
    type: 'CLEAR_CART',
    payload: [],
  });
};
