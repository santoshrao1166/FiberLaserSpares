import types from '../types';

const initial_state = {
  userData: null,
  allCategories: [],
  AddressList: [],
  savedPincode: false,
  initial: 0,
  allSizeAttributes:[],
  // userData:null,
  // userData: {
  //   id: 25,
  //   date_created: '2017-03-21T16:09:28',
  //   date_created_gmt: '2017-03-21T19:09:28',
  //   date_modified: '2017-03-21T16:09:30',
  //   date_modified_gmt: '2017-03-21T19:09:30',
  //   email: 'john.doe@example.com',
  //   first_name: 'John',
  //   last_name: 'Doe',
  //   role: 'customer',
  //   username: 'john.doe',
  //   billing: {
  //     // first_name: 'John',
  //     // last_name: 'Doe',
  //     // company: '',
  //     // address_1: '969 Market',
  //     // address_2: '',
  //     // city: 'San Francisco',
  //     // state: 'CA',
  //     // postcode: '94103',
  //     // country: 'US',
  //     // email: 'john.doe@example.com',
  //     // phone: '(555) 555-5555',
  //   },
  //   shipping: {
  //     // first_name: 'John',
  //     // last_name: 'Doe',
  //     // company: '',
  //     // address_1: '969 Market',
  //     // address_2: '',
  //     // city: 'San Francisco',
  //     // state: 'Delhi',
  //     // postcode: '94103',
  //     // country: 'India',
  //     // email: 'john.doe@example.com',
  //     // phone: '(555) 555-5555',
  //   },
  //   is_paying_customer: false,
  //   avatar_url:
  //     'https://secure.gravatar.com/avatar/8eb1b522f60d11fa897de1dc6351b7e8?s=96',
  //   meta_data: [],
  //   _links: {
  //     self: [
  //       {
  //         href: 'https://example.com/wp-json/wc/v3/customers/25',
  //       },
  //     ],
  //     collection: [
  //       {
  //         href: 'https://example.com/wp-json/wc/v3/customers',
  //       },
  //     ],
  //   },
  // },
  featuredProducts:[],
  popularProducts:[]
};

export default function (state = initial_state, action) {
  switch (action.type) {
    case 'SET_USER_DATA':
      console.log('SET_USER_DATA')
      const d = action.payload;
      return {...state, userData: d};
    case 'SET_INITIAL':
      return {...state, initial: action.payload.setInitial};
    case 'LOGOUT':
      return {...state, userData: null};
    case 'GET_CATEGORIES':
      const c = action.payload;
      let temp = [];
      c?.forEach((item)=>temp.push({...item,isChecked:false}))
      return {...state, allCategories: temp};
      case 'GET_ALL_ATTRIBUTETERMS':
        const e = action.payload;
        let temp1 = [];
        e?.forEach((item)=>temp1.push({...item,isChecked:false}))
        return {...state, allSizeAttributes: temp1};
    case 'GET_FEATURED_PRODUCTS':
      return {...state, featuredProducts: action.payload};
    case 'GET_POPULAR_PRODUCTS':
      return {...state, popularProducts: action.payload};
    case 'CHANGE_BILLING_ADDRESS':
      console.log(action.payload, 'action.payload');
      return {
        ...state,
        userData: {
          ...state.userData,
          billing: action.payload,
        },
      };
    case 'CHANGE_SHIPPING_ADDRESS':
      console.log(action.payload, 'action.payload');
      return {
        ...state,
        userData: {
          ...state.userData,
          shipping: action.payload,
        },
      };
    default:
      return state;
  }
}
