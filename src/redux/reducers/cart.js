import {showSuccess} from '../../Screens/utils/helperFunction';

export const cartReducer = (
  state = {
    cart: {
      items: [],
      total: 0,
      subtotal: 0,
      cgst: 0,
      sgst: 0,
      cgstPer: 0.09,
      sgstPer: 0.09,
      totalItems:0
    },
    wishlist: [],
    allorders: [],
  },
  action,
) => {
  const getSubTotal = () => {
    let Subtotal = 0;
    state.cart.items.map(
      (item, index) => (Subtotal += item?.price * item?.quantity),
    );
    let params = {
      cgst: state.cart.cgstPer * Subtotal,
      sgst: state.cart.sgstPer * Subtotal,
      subtotal: Subtotal,
      total:
        state.cart.cgstPer * Subtotal +
        state.cart.sgstPer * Subtotal +
        Subtotal,
    };
    return params;
  };
  const getTotalItems = () => {
    let totalItems = 0;
    state.cart.items.map(
      (item, index) => (totalItems += item?.quantity),
    );
    return totalItems;
  };
  switch (action.type) {
    case 'ADD_TO_CART':
      const index = state.cart.items.findIndex(x => x.item_id == action.payload.item_id);
      if (index > -1) {
        state.cart.items[index].quantity = state.cart.items[index].quantity + action.payload.quantity;
      } else {
        action.payload['quantity'] = action.payload.quantity;
        state.cart.items.push(action.payload);
      }
      return {...state};

    case 'MINUS_QUANTITY':
      const k = state.cart.items.findIndex(x => x.item_id == action.payload.item_id);
      state.cart.items[k].quantity = state.cart.items[k].quantity - 1;
      return {...state};

    case 'PLUS_QUANTITY':
      const j = state.cart.items.findIndex(x => x.item_id == action.payload.item_id);
      state.cart.items[j].quantity = state.cart.items[j].quantity + 1;
      return {...state};

    case 'REMOVE_FROM_CART':
      const i = state.cart.items.findIndex(x => x.item_id == action.payload.item_id);
      var filtered = state.cart.items.filter(function (el) {
        return el.item_id != action.payload.item_id;
      });
      state.cart.items = filtered;
      return {...state};

    case 'CLEAR_CART':
      state.cart = {
        items: [],
        total: 0,
        subtotal: 0,
        cgst: 0,
        sgst: 0,
        cgstPer: 0.09,
        sgstPer: 0.09,
        totalItems:0
      };
      return {...state};

    case 'ADD_TO_WISHLIST':
      // const l = state.wishlist?.findIndex(x => x.id == action.payload.id);
      // if (l > -1) {
      //   showSuccess('Product Already added to wishlist');
      // } else {
        showSuccess(`${action.payload.name} added to wishlist`);
        state.wishlist?.push(action.payload);
      //}
      return {...state};
    case 'REMOVE_FROM_WISHLIST':
      const m = state.wishlist.findIndex(x => x.id == action.payload.id);
      var filtered = state.wishlist.filter(function (el) {
        return el.id != action.payload.id;
      });
      state.wishlist = filtered;
      showSuccess(`${action.payload.name} removed from wishlist`);
      return {...state};

    case 'UPDATE_CHECKOUT_DATA':
      state.cart.subtotal = getSubTotal().subtotal;
      state.cart.cgst = getSubTotal().cgst;
      state.cart.sgst = getSubTotal().sgst;
      state.cart.total = getSubTotal().total;
      return {...state};

    case 'GET_TOTAL_ITEMS':
        state.cart.totalItems = getTotalItems();
        return {...state};
    default:
      return state;
  }
};
