
import { combineReducers } from "redux";
import types from "../types";
import auth from './auth';
import {NavReducer, navObjectReducer} from './navigation';
import { cartReducer } from "./cart";

const appReducer = combineReducers({
    auth:auth,
    nav: NavReducer,
    navObj: navObjectReducer,
    cart:cartReducer
})
const rootReducer = (state, action) => {
    // if (action.type == types.CLEAR_REDUX_STATE) {
    //     state = undefined
    // }
    return appReducer(state, action)
}
export default rootReducer