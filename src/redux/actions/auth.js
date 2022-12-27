import {
  SEARCH_PRODUCT,
  GET_ALL_CATEGORIES,
  GET_CUTOMER_DATA,
  GET_PRODUCTS,GET_ALL_ATTRIBUTETERMS
} from '../../config/urls';
import {apiPost, apiGet} from '../../Screens/utils/utils';
import {myStore} from '../store';
import {showError, showSuccess} from '../../Screens/utils/helperFunction';
const {dispatch, getState} = myStore;
import {WooCommerce_API} from '../../config/WooCommerceAPI';
import axios from 'axios';
const serverUrl = 'https://fiberlaserspares.com/?';
import {setItem, getItem, removeItem} from '../../Screens/utils/utils';

export const authUser = async data => {
  let url = '';
  const params = {
    rest_route: '/simple-jwt-login/v1/auth',
    email: data?.email,
    password: data?.password,
    //  email: 'john.doe1@example.com',
    // password: 'Newpassword',
  };
  // console.log("param",params)
  Object.entries(params).forEach(([key, value]) => (url += `${key}=${value}&`));
  return new Promise(async (resolve, reject) => {
    try {
      fetch(serverUrl + url, {
        method: 'POST',
      })
        .then(response => response.json())
        .then(res => {
          console.log(res);
          if (res?.success) {
            setItem('token', res.data.jwt).then(() => validateToken());
            showSuccess(`${data?.email} logged In Successful`);
            resolve(res);
          } else {
            resolve(res);
            showError(res?.data?.message);
          }
        })
        .catch(err => {
          // showError('Wrong Credentials');
          console.log(err, 'auth');
        });
    } catch (error) {
      console.log(error, 'errr');
      reject(error);
    }
  });
};
export const resetPassword = async email => {
  let url = '';
  const params = {
    rest_route: '/simple-jwt-login/v1/user/reset_password',
    email: email,
    //  email: 'john.doe1@example.com',
    // password: 'Newpassword',
  };
  Object.entries(params).forEach(([key, value]) => (url += `${key}=${value}&`));
  return new Promise(async (resolve, reject) => {
    fetch(serverUrl + url, {
      method: 'POST',
    })
      .then(response => response.json())
      .then(res => {
        if (res?.success) {
          showSuccess(res?.message);
          resolve(res);
        } else {
          showError(res?.data?.message);
          resolve(res);
        }
        console.log(res, 'reset password');
        // if (res.data.success) {
        //   setItem('token', res.data.jwt);
        //   showSuccess(`${data?.email} Registered Successful`);
        //   resolve(res);
        //   // loginUser(res.data.data.jwt);
        // }
      })
      .catch(err => {
        showError('Something Went Wrong');
        console.log(err, 'auth');
      });
  });
};

//change pass with put else reset pass
export const changePassword = async (param) => {
  let url = '';
  getItem('token')
  .then(JWT => {
    const params = {
      ...param,
      rest_route: '/simple-jwt-login/v1/user/reset_password'
    };
    console.log(params,"params");
    Object.entries(params).forEach(([key, value]) => (url += `${key}=${value}&`));
    return new Promise(async (resolve, reject) => {
      fetch(serverUrl + url, {
        method: 'POST',
      })
        .then(response => response.json())
        .then(res => {
          if (res?.success) {
            showSuccess(res?.message);
            resolve(res);
          } else {
            showError(res?.data?.message);
            resolve(res);
          }
          // if (res.data.success) {
          //   setItem('token', res.data.jwt);
          //   showSuccess(`${data?.email} Registered Successful`);
          //   resolve(res);
          //   // loginUser(res.data.data.jwt);
          // }
        })
        .catch(err => {
          showError('Something Went Wrong');
          console.log(err, 'auth');
        });
    })
  }).catch(err=>console.log(err))

};

export const registerUser = async data => {
  let url = '';
  const params = {
    rest_route: '/simple-jwt-login/v1/users',
    display_name: data?.display_name,
    email: data?.email,
    password: data?.password,
    // email: 'john.doe1@example.com',
    // password: 'Newpassword',
    AUTH_KEY: 'AuthFoRfiBERLaaSERsPAres',
  };
  Object.entries(params).forEach(([key, value]) => (url += `${key}=${value}&`));
  return new Promise(async (resolve, reject) => {
    try {
      fetch(serverUrl + url, {
        method: 'POST',
      })
        .then(response => response.json())
        .then(res => {
          if (res?.success) {
            setItem('token', res.jwt).then(() => validateToken());
            showSuccess(`${data?.email} Registered Successful`);
            resolve(res);
          } else {
            resolve(res);
            showError(res?.data?.message);
          }
          console.log(res?.data?.message, 'register');
          // if (res.data.success) {
          //   setItem('token', res.data.jwt);
          //   showSuccess(`${data?.email} Registered Successful`);
          //   resolve(res);
          //   // loginUser(res.data.data.jwt);
          // }
        })
        .catch(err => {
          showError('Something Went Wrong');
          console.log(err, 'auth');
        });
    } catch (error) {
      console.log(error, 'errr');
      reject(error);
    }
  });
};
export const validateToken = async JWT => {
  var url = '';
  return new Promise(async (resolve, reject) => {
    getItem('token')
      .then(JWT => {
        if (JWT != null) {
          const params = {
            rest_route: '/simple-jwt-login/v1/auth/validate',
            JWT: JWT,
          };
          Object.entries(params).forEach(
            ([key, value]) => (url += `${key}=${value}&`),
          );
          try {
            axios
              .post(serverUrl + url)
              .then(res => {
                if (res.data.success) {
                  console.log(res.data.data.user.ID, 'valid token Customer Id');
                  setItem('customerId', res.data.data.user.ID).then(() =>
                    getCustomerData().then(() => resolve(res)),
                  );
                  //
                  // loginUser(res.data.data.jwt);
                }
              })
              .catch(err => {
                refreshToken(JWT);
                console.log(err, 'Invalid token/expired');
              });
          } catch (error) {
            console.log(error, 'errr');
            // dispatch({
            //   type: 'SET_USER_DATA',
            //   payload: {},
            // });
            reject(error);
          }
        } else {
          console.log('errr');
          // dispatch({
          //   type: 'SET_USER_DATA',
          //   payload: null,
          // });
          reject(null);
        }
      })
      .catch(err => {
        // dispatch({
        //   type: 'SET_USER_DATA',
        //   payload: {},
        // });
        reject(err);
      });
  });
};
export const refreshToken = async JWT => {
  var url = '';
  const params = {
    rest_route: '/simple-jwt-login/v1/auth/refresh',
    JWT: JWT,
  };
  Object.entries(params).forEach(([key, value]) => (url += `${key}=${value}&`));
  return new Promise(async (resolve, reject) => {
    try {
      axios
        .post(serverUrl + url)
        .then(res => {
          if (res.data.success) {
            setItem('token', res.data.data.jwt).then(() => validateToken());
            // resolve(res);
            // loginUser(res.data.data.jwt);
          }
        })
        .catch(err => {
          console.log(err, 'refreshToken failed');
          revokeToken(JWT);
        });
    } catch (error) {
      console.log(error, 'errr');
      reject(error);
    }
  });
};
export const revokeToken = async JWT => {
  var url = '';
  const params = {
    rest_route: '/simple-jwt-login/v1/auth/revoke',
    JWT: JWT,
  };
  Object.entries(params).forEach(([key, value]) => (url += `${key}=${value}&`));
  return new Promise(async (resolve, reject) => {
    try {
      axios
        .post(serverUrl + url)
        .then(res => {
          if (res.data.success) {
            console.log('revoke success');
            removeItem('token');
            removeItem('customerId');
            resolve(res);
          }
        })
        .catch(err => {
          console.log('revoke err');
          removeItem('customerId');
          removeItem('token');
          resolve(err);
        });
    } catch (error) {
      console.log(error, 'errr');
      reject(error);
    }
  });
};
export const logout = () => {
  return new Promise(async (resolve, reject) => {
    try {
      getItem('token').then(res => {
        revokeToken(res).then(() => {
          showSuccess('You have successfully logged Out');
          removeItem('token').then(() => {
            removeItem('customerId');
            dispatch({
              type: 'LOGOUT',
            });
            resolve();
          });
        });
      });
    } catch (error) {
      reject(error);
    }
  });
};
export const setInitial = value => {
  dispatch({
    type: 'SET_INITIAL',
    payload: {setInitial: value},
  });
};
export const getCustomerData = async () => {
  return new Promise(async (resolve, reject) => {
    getItem('customerId')
      .then(customerId => {
        if (customerId != null) {
          console.log('param', customerId);
          //WooCommerce_API.get(GET_ALL_ORDERS, {customer: 359})
          WooCommerce_API.get(GET_CUTOMER_DATA + customerId)
            .then(data => {
              resolve(data);
              // console.log(data,"======getCustomerData")
              dispatch({
                type: 'SET_USER_DATA',
                payload: data,
              });
              //
            })
            .catch(error => {
              console.log(error);
              // dispatch({
              //   type: 'SET_USER_DATA',
              //   payload: {},
              // });
              reject(null);
            });
        } else {
          // dispatch({
          //   type: 'SET_USER_DATA',
          //   payload: {},
          // });
          // reject(null);
        }
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const updateCustomerAddress = async (data,shipping) => {
  return new Promise(async (resolve, reject) => {
    getItem('customerId')
      .then(customerId => {
        if (customerId != null) {
          let params;
          shipping
            ? (params = {
                ...getState().auth.userData,
                shipping: data,
              })
            : (params = {
                ...getState().auth.userData,
                billing: data,
              });
          console.log('param', customerId);
          WooCommerce_API.post(GET_CUTOMER_DATA + customerId, 
            params
           )
             .then(data => {
               console.log(data, '======update');
               resolve(data);
               dispatch({
                 type: 'SET_USER_DATA',
                 payload: data,
               });
             })
            .catch(error => {
              console.log(error,"PPPP");
              reject(null);
            });
        } else {
        }
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const updateCustomerData = async (data) => {
  return new Promise(async (resolve, reject) => {
    getItem('customerId')
      .then(customerId => {
        if (customerId != null) {
          let params = 
          {
            ...data,
            "billing": {
              "email": data?.email
            }
          }
          WooCommerce_API.post(GET_CUTOMER_DATA + customerId, 
           params
          )
            .then(data => {
              console.log(data, '======update');
              resolve(data);
              dispatch({
                type: 'SET_USER_DATA',
                payload: data,
              });
            })
            .catch(error => {
              console.log(error,"PPPP");
              reject(null);
            });
        } else {
        }
      })
      .catch(err => {
        reject(err);
      });
  });
};


export const getAllCategories = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      WooCommerce_API.get(GET_ALL_CATEGORIES, {
        hide_empty: true,
        exclude: [69, 351, 25],
      })
        .then(data => {
          console.log(data[0].name, 'GET_ALL_CATEGORIES');
          dispatch({
            type: 'GET_CATEGORIES',
            payload: data,
          });
          resolve(data);
        })
        .catch(error => {
          console.log(error);
        });
    } catch (error) {
      reject(error);
    }
  });
};
export const getAllAttributeTerms = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      WooCommerce_API.get(GET_ALL_ATTRIBUTETERMS,{per_page:100,hide_empty:true})
        .then(data => {
          console.log(data?.length, 'GET_ALL_ATTRIBUTETERMS');
          dispatch({
            type: 'GET_ALL_ATTRIBUTETERMS',
            payload: data,
          });
          resolve(data);
        })
        .catch(error => {
          console.log(error);
        });
    } catch (error) {
      reject(error);
    }
  });
};
export const getAllProducts = async (dispatch, params) => {
  return new Promise(async (resolve, reject) => {
    let url = '';
    try {
      console.log('params ...', params);
      // url += '?'+ params?.map((item)=> url + item?.key+'='+item?.value + '&')
      WooCommerce_API.get(GET_PRODUCTS, {...params, exclude: 5021,status:'publish'})
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          console.log(error);
        });
    } catch (error) {
      reject(error);
    }
  });
};
export const getSingleProduct = async (dispatch, productId) => {
  return new Promise(async (resolve, reject) => {
    let url = '';
    try {
      WooCommerce_API.get(GET_PRODUCTS+"/"+productId, { exclude: 5021})
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          console.log(error);
        });
    } catch (error) {
      reject(error);
    }
  });
};

export const getProductVariations = async (dispatch, productId) => {
  return new Promise(async (resolve, reject) => {
    try {
      WooCommerce_API.get(GET_PRODUCTS+"/"+productId+"/variations")
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          console.log(error);
        });
    } catch (error) {
      reject(error);
    }
  });
};

export const getFeaturedProducts = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      WooCommerce_API.get(GET_PRODUCTS, {featured: true, exclude: 5021})
        .then(data => {
          dispatch({
            type: 'GET_FEATURED_PRODUCTS',
            payload: data,
          });
          resolve(data);
        })
        .catch(error => {
          console.log(error);
        });
    } catch (error) {
      reject(error);
    }
  });
};
export const getPopularProducts = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      WooCommerce_API.get(GET_PRODUCTS, {exclude: 5021})
        .then(data => {
          dispatch({
            type: 'GET_POPULAR_PRODUCTS',
            payload: data,
          });
          resolve(data);
        })
        .catch(error => {
          console.log(error);
        });
    } catch (error) {
      reject(error);
    }
  });
};
export const addAddress = async (data, shipping) => {
  return new Promise(async (resolve, reject) => {
    try {
      shipping
        ? dispatch({
            type: 'CHANGE_SHIPPING_ADDRESS',
            payload: data,
          })
        : dispatch({
            type: 'CHANGE_BILLING_ADDRESS',
            payload: data,
          });
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};
